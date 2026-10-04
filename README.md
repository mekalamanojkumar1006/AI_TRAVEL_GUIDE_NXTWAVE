# AI Travel Guide

A travel companion web app that lets users explore destinations, choose a travel style, and generate an AI-powered audio guide in multiple languages.

## Features

- Destination cards with travel preview
- Search and explore destination selection
- Audio guide generation with summary or detailed narration
- Multiple language options
- Male/female voice selection
- AI-generated travel description and audio playback

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
pip install flask flask-cors google-genai requests
```

4. Set environment variables:

```bash
set GEMINI_API_KEY=your_gemini_api_key
set MURF_API_KEY=your_murf_api_key
```

On macOS/Linux use:

```bash
export GEMINI_API_KEY=your_gemini_api_key
export MURF_API_KEY=your_murf_api_key
```

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
- The audio generation endpoint is `POST /generate-audio-guide`.
- If API keys are missing, the server will return a clear error instead of crashing.

## License

This project is for educational/demo purposes.
