import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    project: "FinGuard AI",
    message: "Backend is running"
  });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== "string" || text.trim().length < 5) {
      return res.status(400).json({
        error: "Analiz için en az 5 karakterlik mesaj/link girilmelidir."
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY .env dosyasında tanımlı değil."
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Sen FinGuard AI adlı finans ve e-ticaret güvenliği analiz motorusun.

Görevin:
Kullanıcının girdiği mesajı, linki veya metni finans/e-ticaret dolandırıcılığı açısından değerlendir.

SADECE geçerli JSON döndür. Markdown kullanma. Açıklama metni ekleme.

JSON formatı kesinlikle şu olmalı:
{
  "riskScore": number,
  "riskLevel": "Düşük" | "Orta" | "Yüksek" | "Kritik",
  "threatType": string,
  "summary": string,
  "reasons": string[],
  "redFlags": string[],
  "recommendedAction": string,
  "confidence": number
}

Kurallar:
- riskScore 0 ile 100 arasında olmalı.
- confidence 0 ile 100 arasında olmalı.
- Finansal bilgi isteme, kart/şifre/IBAN talebi, sahte link, aciliyet baskısı, ödül vaadi, hesap kapatma tehdidi, ödeme iadesi bahanesi, kargo/alışveriş tuzağı gibi sinyalleri yakala.
- Kullanıcıya net ve güvenli aksiyon öner.
- Emin değilsen bile risk seviyesini gerekçelendir.
- Cevap Türkçe olsun.

Analiz edilecek metin:
"""${text.trim()}"""
`;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const cleaned = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(cleaned);
    } catch (jsonError) {
      parsed = {
        riskScore: 50,
        riskLevel: "Orta",
        threatType: "Belirsiz / Manuel inceleme gerekli",
        summary: "Model cevabı tam JSON formatında dönmediği için güvenli varsayılan analiz üretildi.",
        reasons: ["Model çıktısı yapılandırılmış formata tam uymadı.", "Girilen içerik manuel kontrol gerektiriyor."],
        redFlags: [],
        recommendedAction: "Linke tıklamayın, kişisel veya finansal bilgi paylaşmayın ve kaynağı resmi kanaldan doğrulayın.",
        confidence: 45,
        rawModelOutput: rawText
      };
    }

    return res.json(parsed);
  } catch (error) {
    console.error("Analyze error:", error);
    return res.status(500).json({
      error: "Analiz sırasında hata oluştu.",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`FinGuard AI backend running on http://localhost:${PORT}`);
});
