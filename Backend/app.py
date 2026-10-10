from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from google import genai
from dotenv import load_dotenv
import requests
import tempfile
import base64
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "change-this-secret-key")
CORS(app)
MURF_API_KEY = os.getenv("MURF_API_KEY") or ""
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or ""
FRONTEND_DIR = BASE_DIR / "Frontend"

client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

WIKIPEDIA_LANGUAGES = {
    "English": "en",
    "Hindi": "hi",
    "Tamil": "ta",
    "Telugu": "te",
}

def generate_speech(text, voice_id, locale, rate=0):
    if not MURF_API_KEY:
        raise RuntimeError("MURF_API_KEY is missing. Add it to your environment variables.")

    temp_audio = tempfile.NamedTemporaryFile(
        suffix=".mp3",
        delete=False
    )

    url = "https://global.api.murf.ai/v1/speech/stream"
    headers = {
        "api-key": MURF_API_KEY,
        "Content-Type": "application/json"
    }
    data = {
        "voice_id": voice_id,
        "text": text,
        "locale": locale,
        "rate": max(-50, min(50, int(rate))),
        "model": "FALCON",
        "format": "MP3",
        "sampleRate": 24000,
        "channelType": "MONO"
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        with open(temp_audio.name, "wb") as f:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:
                    f.write(chunk)
        print("Audio streaming completed")
    else:
        raise RuntimeError(f"Murf API error: {response.status_code} - {response.text[:200]}")

    return temp_audio


def generate_description(place, answer_type, language):
    wiki_language = WIKIPEDIA_LANGUAGES.get(language)
    if not wiki_language:
        raise ValueError("Choose English, Hindi, Tamil, or Telugu for the audio guide.")

    headers = {"User-Agent": "AITravelGuide/1.0 (tourism audio guide)"}
    response = requests.get(
        "https://en.wikipedia.org/w/api.php",
        params={
            "action": "query",
            "generator": "search",
            "gsrsearch": place,
            "gsrnamespace": 0,
            "gsrlimit": 1,
            "prop": "extracts|langlinks",
            "lllang": wiki_language,
            "exintro": 1,
            "explaintext": 1,
            "format": "json",
        },
        headers=headers,
        timeout=12,
    )
    response.raise_for_status()
    pages = response.json().get("query", {}).get("pages", {})
    if not pages:
        raise ValueError(f"No history article was found for {place}.")

    page = min(pages.values(), key=lambda item: item.get("index", 0))
    if language == "English":
        description = page.get("extract", "").strip()
    else:
        language_links = page.get("langlinks", [])
        if not language_links:
            raise ValueError(f"No {language} article is available for {place}.")

        localized_response = requests.get(
            f"https://{wiki_language}.wikipedia.org/w/api.php",
            params={
                "action": "query",
                "prop": "extracts",
                "titles": language_links[0]["*"],
                "exintro": 1,
                "explaintext": 1,
                "format": "json",
            },
            headers=headers,
            timeout=12,
        )
        localized_response.raise_for_status()
        localized_pages = localized_response.json().get("query", {}).get("pages", {})
        description = next(iter(localized_pages.values()), {}).get("extract", "").strip()

    if not description:
        raise ValueError(f"No article text was found for {place} in {language}.")

    max_characters = 1800 if answer_type == "Summary" else 5000
    return description[:max_characters]
    
@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/index.js")
def index_js():
    return send_from_directory(FRONTEND_DIR, "index.js")


@app.route("/search-places", methods=["POST"])
@app.route("/api/search-places", methods=["POST"])
def search_places():
    data = request.get_json(silent=True) or {}
    query = str(data.get("query", "")).strip()
    if not query:
        return jsonify({"error": "Enter a destination or place to search."}), 400
    if len(query) > 160:
        return jsonify({"error": "Search queries must be 160 characters or fewer."}), 400

    try:
        api_url = "https://en.wikipedia.org/w/api.php"
        headers = {"User-Agent": "AITravelGuide/1.0 (tourism discovery app)"}
        suggestion_response = requests.get(
            api_url,
            params={
                "action": "query",
                "list": "search",
                "srsearch": query,
                "srinfo": "suggestion",
                "format": "json",
            },
            headers=headers,
            timeout=12,
        )
        suggestion_response.raise_for_status()
        corrected_query = suggestion_response.json().get("query", {}).get("searchinfo", {}).get("suggestion")
        search_query = corrected_query or query

        response = requests.get(
            api_url,
            params={
                "action": "query",
                "generator": "search",
                "gsrsearch": search_query,
                "gsrnamespace": 0,
                "gsrlimit": 8,
                "prop": "pageimages|extracts",
                "piprop": "thumbnail",
                "pithumbsize": 640,
                "exintro": 1,
                "explaintext": 1,
                "format": "json",
            },
            headers=headers,
            timeout=12,
        )
        response.raise_for_status()
        pages = response.json().get("query", {}).get("pages", {})
        places = [
            {
                "name": page.get("title", ""),
                "description": page.get("extract", "").strip(),
                "image": page.get("thumbnail", {}).get("source", ""),
            }
            for page in sorted(pages.values(), key=lambda item: item.get("index", 0))
            if page.get("title")
        ]
        return jsonify({"places": places, "correctedQuery": corrected_query or ""})
    except Exception as exc:
        return jsonify({"error": f"Place search is unavailable: {exc}"}), 502


@app.route("/generate-itinerary", methods=["POST"])
@app.route("/api/generate-itinerary", methods=["POST"])
def generate_itinerary():
    data = request.get_json(silent=True) or {}
    place = str(data.get("place", "")).strip()
    language = str(data.get("language", "English")).strip()
    interests = str(data.get("interests", "")).strip()
    try:
        days = int(data.get("days", 1))
    except (TypeError, ValueError):
        return jsonify({"error": "Trip duration must be a whole number of days."}), 400

    if not place:
        return jsonify({"error": "Choose a destination before planning a trip."}), 400
    if not 1 <= days <= 14:
        return jsonify({"error": "Trip duration must be between 1 and 14 days."}), 400
    if len(interests) > 600:
        return jsonify({"error": "Interests must be 600 characters or fewer."}), 400
    if not client:
        return jsonify({"error": "GEMINI_API_KEY is missing. Add it to your environment variables."}), 503

    prompt = f"""
Create a practical {days}-day tourist itinerary for {place} in {language}.
Traveler interests: {interests or "major landmarks, local food, and a relaxed pace"}.
For each day, give a morning, afternoon, and evening plan, grouping nearby sights
where possible. Include brief historical or cultural context and practical pacing.
Avoid inventing opening hours, prices, or current conditions. Respond only in {language}.
"""
    try:
        response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=prompt,
        )
        return jsonify({"itinerary": response.text})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 502


@app.route("/generate-audio-guide", methods=["GET", "POST"])
@app.route("/api/generate-audio-guide", methods=["GET", "POST"])
def generate_audio_guide():
    if request.method == "GET":
        return jsonify({
            "message": "This endpoint expects a POST request with JSON data."
        })

    data = request.get_json(silent=True) or {}
    if not data:
        return jsonify({"error": "Request body must be valid JSON."}), 400

    required_fields = ["place", "answerType", "language", "voiceId", "locale"]
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {missing_fields}"}), 400

    try:
        place = data["place"]
        answer_type = data["answerType"]
        language = data["language"]
        voice_id = data["voiceId"]
        locale = data["locale"]
        rate = data.get("rate", 0)

        if answer_type not in {"Summary", "Detailed"}:
            return jsonify({"error": "Choose Summary or Detailed for the audio guide."}), 400
        if language not in WIKIPEDIA_LANGUAGES:
            return jsonify({"error": "Choose English, Hindi, Tamil, or Telugu for the audio guide."}), 400

        text_description = generate_description(place, answer_type, language)
        audio_path = generate_speech(text_description, voice_id, locale, rate)
        audio_bytes = open(audio_path.name, "rb").read()
        encoded_audio = base64.b64encode(audio_bytes).decode("utf-8")

        return jsonify({
            "description": text_description,
            "audioBase64": encoded_audio
        })
    except Exception as exc:
        return jsonify({
            "error": str(exc)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)