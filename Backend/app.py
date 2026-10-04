from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from google import genai
import requests
import tempfile
import base64
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)
MURF_API_KEY = os.getenv("MURF_API_KEY") or ""
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or ""
FRONTEND_DIR = Path(__file__).resolve().parent.parent / "Frontend"

client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

PROMPTS = {
    "Summary": """
You are a professional tourist guide.
Provide a high-level overview of "{place}" in {language}.

Focus on:
- The historical significance
- Why the place is famous
- Key architectural or cultural highlights

Keep the explanation concise, engaging, and easy to follow.
Avoid excessive details and dates.
Limit the response to around 200 words.
s
Respond ONLY in {language}.
""",

    "Detailed": """
You are a professional tourist guide.
Provide a detailed and immersive explanation of "{place}" in {language}.

Cover:
- Historical background and timeline
- Architectural design and unique features
- Cultural importance and notable events
- Interesting facts and visitor insights

Explain concepts clearly and in a storytelling manner.
Include relevant details and examples to create a rich experience.
Limit the response to around 400 words.

Respond ONLY in {language}.
"""
}

def generate_speech(text, voice_id, locale):
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
    if not client:
        raise RuntimeError("GEMINI_API_KEY is missing. Add it to your environment variables.")

    prompt = PROMPTS[answer_type].format(place=place, language=language)
    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt
    )
    return response.text
    
@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/index.js")
def index_js():
    return send_from_directory(FRONTEND_DIR, "index.js")


@app.route("/generate-audio-guide", methods=["GET", "POST"])
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

        text_description = generate_description(place, answer_type, language)
        audio_path = generate_speech(text_description, voice_id, locale)
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