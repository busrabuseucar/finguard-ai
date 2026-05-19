import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ShieldAlert, ScanSearch, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import "./style.css";

const API_URL = "http://localhost:5000/api/analyze";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sampleText =
    "Sayın müşterimiz, kartınız güvenlik nedeniyle askıya alınmıştır. Hemen aşağıdaki linke tıklayarak bilgilerinizi güncelleyin: http://bank-guvenlik-onay.com";

  async function analyze() {
    setError("");
    setResult(null);

    if (!text.trim()) {
      setError("Analiz için mesaj veya link girmelisin.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analiz yapılamadı.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const riskScore = Number(result?.riskScore ?? 0);
  const scoreClass =
    riskScore >= 80 ? "critical" : riskScore >= 60 ? "high" : riskScore >= 35 ? "medium" : "low";

  return (
    <main className="page">
      <section className="hero">
        <div className="badge">
          <ShieldAlert size={18} />
          Finans & E-Ticaret Güvenliği
        </div>

        <h1>FinGuard AI</h1>
        <p>
          Şüpheli ödeme mesajlarını, sahte kampanya metinlerini ve dolandırıcılık sinyali taşıyan linkleri
          Gemini destekli analiz motoru ile değerlendirir.
        </p>
      </section>

      <section className="grid">
        <div className="card input-card">
          <div className="card-title">
            <ScanSearch size={22} />
            <h2>Mesaj / Link Analizi</h2>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Şüpheli mesajı veya linki buraya yapıştır..."
          />

          <div className="actions">
            <button className="secondary" onClick={() => setText(sampleText)}>
              Örnek Mesajı Doldur
            </button>

            <button className="primary" onClick={analyze} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="spin" size={18} />
                  Analiz ediliyor
                </>
              ) : (
                "Analiz Et"
              )}
            </button>
          </div>

          {error && <div className="error">{error}</div>}
        </div>

        <div className="card result-card">
          {!result ? (
            <div className="empty">
              <AlertTriangle size={42} />
              <h2>Sonuç burada görünecek</h2>
              <p>Analiz sonrası risk skoru, tehdit türü ve önerilen aksiyon listelenecek.</p>
            </div>
          ) : (
            <div className="result">
              <div className={`score ${scoreClass}`}>
                <span>{riskScore}</span>
                <small>/100 Risk Skoru</small>
              </div>

              <div className="result-header">
                <h2>{result.riskLevel} Risk</h2>
                <p>{result.threatType}</p>
              </div>

              <div className="summary">{result.summary}</div>

              <div className="section">
                <h3>Risk Nedenleri</h3>
                <ul>
                  {(result.reasons || []).map((item, index) => (
                    <li key={`reason-${index}`}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="section">
                <h3>Kırmızı Bayraklar</h3>
                <ul>
                  {(result.redFlags || []).length ? (
                    result.redFlags.map((item, index) => <li key={`flag-${index}`}>{item}</li>)
                  ) : (
                    <li>Belirgin kırmızı bayrak bulunamadı.</li>
                  )}
                </ul>
              </div>

              <div className="recommendation">
                <CheckCircle2 size={20} />
                <span>{result.recommendedAction}</span>
              </div>

              <div className="confidence">Model güveni: %{result.confidence}</div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
