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
  "recommendation": "Do not click the link. Verify the message through the official service."
}
