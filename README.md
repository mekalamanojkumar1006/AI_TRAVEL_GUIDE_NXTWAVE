# AI Travel Guide

A travel companion web app that lets users explore destinations, choose a travel style, and generate an AI-powered audio guide in multiple languages.

## Features

- Destination cards with travel preview
- Search for tourist places and explore matching destination cards
- Audio guide generation with summary or detailed narration
- Multiple language options
- Male/female narrator selection with adjustable narration pace
- AI-generated travel description and audio playback
- Expandable text transcript
- AI-generated multi-day itineraries tailored to traveler interests

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Python, Flask
- AI: Google GenAI
- Audio: Murf AI Speech API
- CORS support enabled for frontend-backend communication

## Project Structure

```text
AI_TRAVEL_GUIDE NXT/
├── Backend/
│   └── app.py
├── Frontend/
│   ├── index.html
│   └── index.js
├── README.md
└── .gitignore
```

## Prerequisites

- Python 3.9+
- pip
- A valid Google Gemini API key
- A valid Murf AI API key
- A strong Flask secret key for session security

## Setup

1. Open a terminal in the project root.
2. Create and activate a virtual environment (optional but recommended):

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install flask flask-cors google-genai requests python-dotenv
```

4. Copy the sample environment file and update the values:

```bash
copy .env.example .env
```

On macOS/Linux use:

```bash
cp .env.example .env
```

Then edit `.env` and fill in your actual values:

```env
GEMINI_API_KEY=your_gemini_api_key_here
MURF_API_KEY=your_murf_api_key_here
SECRET_KEY=your_strong_secret_key_here
FLASK_DEBUG=False
```

Do not commit your real `.env` file. It is already ignored by Git.

## Run the App

Start the backend:

```bash
cd Backend
python app.py
```

Then open this URL in your browser:

```text
http://127.0.0.1:5000/
```

## Notes

- The app serves the frontend from the Flask backend at the root URL.
- The app exposes `POST /api/search-places`, `POST /api/generate-itinerary`, and `POST /api/generate-audio-guide` endpoints. Non-prefixed aliases are also available for local Flask use.
- Place discovery uses Wikipedia summaries and thumbnails. Historical guides, itineraries, and speech require the configured Gemini and Murf API keys.
- If API keys are missing, the server will return a clear error instead of crashing.

## License

This project is for educational/demo purposes.
