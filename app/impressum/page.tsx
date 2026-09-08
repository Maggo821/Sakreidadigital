import type { Metadata } from "next";

export const metadata: Metadata = { title: "Impressum | Sakeida Digital" };

export default function ImpressumPage() {
  return <LegalLayout title="Impressum"><h2>Angaben gemäß § 5 TMG</h2><p><strong>Marco Sakreida</strong><br />Schießgartenstraße 8<br />63303 Dreieich<br />Deutschland</p><p>Einzelunternehmen</p><h2>Kontakt</h2><p>E-Mail: <a href="mailto:marcosakreida@outlook.de">marcosakreida@outlook.de</a><br />Telefon: <a href="tel:+4915110100607">0151 10100607</a></p><h2>Verantwortlich für den Inhalt</h2><p>Marco Sakreida<br />Schießgartenstraße 8<br />63303 Dreieich</p><div className="placeholder-note">Noch offen: Umsatzsteuer-Identifikationsnummer, falls vorhanden, sowie weitere Pflichtangaben, falls ein Registereintrag oder eine berufsrechtliche Zulassung besteht.</div></LegalLayout>;
}

function LegalLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return <main><nav className="nav shell"><a className="brand" href="/" aria-label="Sakeida Digital Startseite"><span className="brand-mark">S</span><span>SAKEIDA<br /><i>DIGITAL</i></span></a><a className="back-link" href="/">← Zur Startseite</a></nav><article className="legal-page shell"><p className="eyebrow">Sakeida Digital</p><h1>{title}</h1>{children}</article><footer className="footer shell"><span>© 2026 Sakeida Digital</span><div><a href="/kontakt">Kontakt</a><a href="/datenschutz">Datenschutz</a></div></footer></main>;
}
