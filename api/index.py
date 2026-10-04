from Backend.app import app

# Vercel looks for an `app` object or a WSGI-compatible entrypoint.
# The Flask app defined in Backend/app.py is reused here so the same
# routes and logic work in the serverless deployment environment.
