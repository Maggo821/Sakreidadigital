"use client";

import { FormEvent, useState } from "react";

export default function KontaktPage() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setState("error");
        setError(json.error ?? "Senden fehlgeschlagen.");
        return;
      }
      setState("success");
    } catch {
      setState("error");
      setError("Senden fehlgeschlagen. Bitte versuche es erneut.");
    }
  }

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="/" aria-label="Sakeida Digital Startseite"><span className="brand-mark">S</span><span>SAKEIDA<br /><i>DIGITAL</i></span></a>
        <a className="back-link" href="/">← Zur Startseite</a>
      </nav>
      <section className="legal-hero shell contact-page-hero">
        <p className="eyebrow">Kontakt aufnehmen</p>
        <h1>Erzähl uns von<br /><em>deinem Vorhaben.</em></h1>
        <p className="page-intro">Du hast einen Prozess, der einfacher werden soll, oder eine Idee, die noch Struktur braucht? Schreib uns. Wir melden uns persönlich.</p>
      </section>
      <section className="form-section shell">
        {state === "success" ? (
          <div className="form-success" role="status">
            <h2>Nachricht unterwegs.</h2>
            <p>Danke für deine Anfrage. Wir melden uns persönlich bei dir – in der Regel innerhalb von ein bis zwei Werktagen.</p>
            <a className="back-link" href="/">← Zur Startseite</a>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <label><span>Name *</span><input name="name" required placeholder="Wie dürfen wir dich nennen?" /></label>
            <label><span>E-Mail *</span><input name="email" type="email" required placeholder="du@unternehmen.de" /></label>
            <label><span>Unternehmen</span><input name="company" placeholder="Optional" /></label>
            <label><span>Worum geht es? *</span><textarea name="message" required rows={5} placeholder="Erzähl uns kurz von deiner Herausforderung ..." /></label>
            <div className="form-bottom"><p>Deine Angaben werden nur zur Bearbeitung deiner Anfrage genutzt. Details in der <a href="/datenschutz">Datenschutzerklärung</a>.</p><button type="submit" disabled={state === "sending"}>{state === "sending" ? "Wird gesendet …" : "Anfrage senden"} <span>↗</span></button></div>
            {state === "error" && <p className="form-status form-status-error" role="alert">{error}</p>}
          </form>
        )}
      </section>
      <footer className="footer shell"><span>© 2026 Sakeida Digital</span><div><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></div></footer>
    </main>
  );
}
