# FinGuard AI

**FinGuard AI** is a Gemini API powered financial phishing and e-commerce fraud detection prototype developed for **BTK Hackathon 2026**.
## Product Preview

![FinGuard AI Dashboard](./finguard-ai-dashboard-screenshot.png)

It analyzes suspicious financial messages, payment texts, fake campaign messages and e-commerce fraud attempts, then generates a structured security report.

---

## Problem

Digital users are frequently exposed to:

- fake payment links
- phishing messages
- fraudulent e-commerce campaigns
- fake cargo / delivery notifications
- social engineering attempts

Most users cannot quickly identify whether a message is safe or risky.

---

## Solution

FinGuard AI helps users analyze suspicious content before they click.

The system takes a suspicious message as input and returns:

- risk score
- threat category
- suspicious indicators
- explanation
- recommended security action

---

## Core Features

- AI-powered phishing analysis
- Financial fraud detection
- E-commerce scam detection
- Risk scoring system
- Threat category classification
- Security recommendation output
- Gemini API integration

---

## How It Works

1. User enters a suspicious financial or e-commerce message.
2. Backend receives the input.
3. Gemini API analyzes the content.
4. System generates structured risk output.
5. Frontend displays the result to the user.

---

## Example Output

```json
{
  "riskScore": 92,
  "threatType": "Financial Phishing",
  "riskLevel": "High",
  "indicators": [
    "Urgent payment pressure",
    "Suspicious shortened link",
    "Fake delivery notification",
    "Financial action request"
  ],
---

## Real Scam Scenarios Tested

FinGuard AI was tested against realistic Turkish phishing and financial fraud scenarios including:

- Fake cargo delivery notifications
- Marketplace payment scams
- Fraudulent IBAN transfer requests
- Fake banking verification messages
- Social engineering payment pressure attacks
- E-commerce refund scams
- Papara / bank account suspension messages

The system analyzes linguistic manipulation patterns, urgency indicators, suspicious financial requests and phishing intent signals.

---

## Live Demo

GitHub Repository:
https://github.com/busrabuseucar/finguard-ai

Video Demo:
https://youtu.be/V3h4kIcDiKU

---

## Tech Stack

Frontend:
- React
- HTML
- CSS

Backend:
- Node.js
- Express.js

AI Layer:
- Gemini API

---

## Project Architecture

User Input → Backend API → Gemini Analysis Engine → Structured Risk Output → Frontend Dashboard

---

## Future Improvements

- Turkish NLP fraud dataset integration
- Real-time scam intelligence feeds
- Browser extension support
- Mobile application
- Advanced fraud analytics dashboard
- Threat intelligence scoring engine
  "recommendation": "Do not click the link. Verify the message through the official service."
}
