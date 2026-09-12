import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termin vereinbaren",
  description:
    "Buche direkt einen Termin für ein kostenloses Erstgespräch – 15 Minuten, unverbindlich, per Videokonferenz oder Telefon.",
  alternates: { canonical: "/termin" },
  robots: { index: true, follow: true },
};

const BOOKING_URL = process.env.BOOKING_URL ?? "";

export default function TerminPage() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="/" aria-label="Sakeida Digital Startseite">
          <span className="brand-mark">S</span>
          <span>
            SAKEIDA
            <br />
            <i>DIGITAL</i>
          </span>
        </a>
        <a className="back-link" href="/">
          ← Zur Startseite
        </a>
      </nav>

      <section className="legal-hero shell contact-page-hero">
        <p className="eyebrow">Termin vereinbaren</p>
        <h1>
          Direkt einen
          <br />
          <em>Termin buchen.</em>
        </h1>
        <p className="page-intro">
          Wähle einen Slot für ein kostenloses Erstgespräch – 15 Minuten, unverbindlich. Wir klären, worum es
          geht und ob wir zusammenpassen.
        </p>
      </section>

      <section className="form-section shell">
        {BOOKING_URL ? (
          <iframe
            className="booking-frame"
            src={BOOKING_URL}
            title="Terminbuchung"
            loading="lazy"
          />
        ) : (
          <div className="form-success">
            <h2>Buchung wird gerade eingerichtet.</h2>
            <p>
              Schreib uns solange direkt über das Kontaktformular – wir melden uns persönlich und finden einen
              Termin.
            </p>
            <a className="back-link" href="/kontakt">
              → Zum Kontaktformular
            </a>
          </div>
        )}
      </section>

      <footer className="footer shell">
        <span>© 2026 Sakeida Digital</span>
        <div>
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </div>
      </footer>
    </main>
  );
}
