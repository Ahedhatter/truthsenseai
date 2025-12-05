TruthSense AI — Fake News Headline Verifier

An AI-powered tool for quickly analyzing whether a news headline may be misleading, exaggerated, or trustworthy.

Live Demo: https://truthsense.online

(Replace with your real domain or Vercel URL if different)

Overview

TruthSense AI is a lightweight web-based application designed to help users quickly evaluate the credibility of news headlines.
Users paste any headline (or short text), and the system generates:

A Likely Fake or Likely Trustworthy classification

A confidence score

A short explanation

This prototype is built for academic demonstration and does not perform factual verification. It analyzes linguistic patterns and provides a heuristic assessment.

Project Structure
truthsense-ai/
│
├── backend/
│   └── fakeNewsDetector.ts      # Simple backend logic (local AI engine)
│
├── src/
│   ├── pages/
│   │   └── Index.tsx            # Main UI page calling the backend function
│   ├── components/              # UI components (ShadCN)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/
│   └── assets, icons, metadata
│
├── package.json                 # Project dependencies
├── vite.config.ts               # Vite configuration
├── tailwind.config.ts           # Tailwind settings
└── README.md                    # This file

Backend Logic (Local Engine)

The backend is a small TypeScript module located at:

backend/fakeNewsDetector.ts


It currently uses randomized but pattern-based logic for demonstration.
In a real-world implementation, this file would be replaced by:

A trained ML model

A FastAPI or Node.js API

External fact-checking intelligence

This structure makes upgrading simple.

Tech Stack

React + TypeScript (UI)

Vite (build system)

TailwindCSS + ShadCN UI (styling & components)

Local TS backend file (prototype detection engine)

Vercel (deployment)

Setup & Development
1. Install dependencies

Make sure you have Node 20+ installed, then run:

npm install

2. Run the development server
npm run dev


This starts the project locally at:

http://localhost:5173

Deployment

The project is deployed on Vercel.

To redeploy:

Push new commits to GitHub:

git add .
git commit -m "Update"
git push


Vercel automatically rebuilds and deploys the site.

Limitations

TruthSense AI is a prototype and:

Does not check real facts or confirm truthfulness.

Does not query external sources.

Uses simplified logic for academic demonstration.

Its purpose is to showcase:

UI/UX design

AI concept workflow

Integration between frontend and backend logic

Future Enhancements

Replace rule-based engine with real ML model (Python/Node).

Add API with real-time classification.

Integrate dataset training for accuracy.

Provide probability distributions and visual explanations.

Add browser extension version of the detector.

Team

TruthSense AI was created as a university software project by:

Ahed Hattar

[Add team members here]

License

This project is for educational and non-commercial use.
