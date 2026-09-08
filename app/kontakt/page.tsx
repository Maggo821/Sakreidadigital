"use client";

import { FormEvent, useState } from "react";

export default function KontaktPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Anfrage von ${form.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nE-Mail: ${form.get("email")}\nUnternehmen: ${form.get("company") || "-"}\n\n${form.get("message")}`,
    );
    window.location.href = `mailto:marcosakreida@outlook.de?subject=${subject}&body=${body}`;
    setSent(true);
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
        <form className="contact-form" onSubmit={handleSubmit}>
          <label><span>Name *</span><input name="name" required placeholder="Wie dürfen wir dich nennen?" /></label>
          <label><span>E-Mail *</span><input name="email" type="email" required placeholder="du@unternehmen.de" /></label>
          <label><span>Unternehmen</span><input name="company" placeholder="Optional" /></label>
          <label><span>Worum geht es? *</span><textarea name="message" required rows={5} placeholder="Erzähl uns kurz von deiner Herausforderung ..." /></label>
          <div className="form-bottom"><p>Mit dem Absenden öffnet sich dein E-Mail-Programm. Es werden keine Formulardaten auf dieser Website gespeichert.</p><button type="submit">Anfrage vorbereiten <span>↗</span></button></div>
          {sent && <p className="form-status" role="status">Dein E-Mail-Programm sollte sich jetzt öffnen.</p>}
        </form>
      </section>
      <footer className="footer shell"><span>© 2026 Sakeida Digital</span><div><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></div></footer>
    </main>
  );
}
