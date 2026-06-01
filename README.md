# Roast My Resume — React · Next.js · MongoDB (Oct 2025)

Live demo: https://roastmyresume-xi.vercel.app/

Roast My Resume is a simple, practical platform for improving resumes by crowdsourcing honest feedback and applying AI analysis.

What it does 

- Users upload a PDF resume, get a shareable link, and collect fully anonymous peer feedback.
- The app combines those reviews with the resume content (PDF-extracted text) and calls the Gemini API to compute an overall score and produce clear, actionable suggestions.
- Built flows include authentication, PDF extraction, anonymous review collection, and AI scoring.

Core features

- Upload PDF resumes and generate shareable resume links.
- Collect anonymous, crowd-sourced reviews from peers.
- Analyze PDF content + reviews via Gemini API to produce a unified score and improvement suggestions.
- User dashboard to view saved resumes, scores, and reviews.


Technology & deployment

- Next.js (App Router) + React
- Node.js backend route handlers (serverless-friendly)
- MongoDB for user/resume/review persistence
- NextAuth for authentication flows
- Gemini API for AI-driven scoring and suggestions
- Hosted on Vercel (serverless routes + static assets)


Try it

Open the live demo: https://roastmyresume-xi.vercel.app/ and upload a resume to see anonymous reviews and AI-driven feedback in action.

---
