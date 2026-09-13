import type { Metadata } from "next";
import { generateSlots, type Slot } from "@/lib/booking";
import { getBookedKeys } from "@/lib/termine";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Termin vereinbaren",
  description:
    "Buche direkt einen Termin für ein kostenloses Erstgespräch – 30 Minuten, unverbindlich, per Videokonferenz oder Telefon.",
  alternates: { canonical: "/termin" },
};

export default async function TerminPage() {
  let slots: Slot[] = [];
  let error = "";

  try {
    slots = generateSlots(await getBookedKeys());
  } catch {
    error = "Die Termine konnten gerade nicht geladen werden.";
  }

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
          Kostenloses Erstgespräch, 30 Minuten, unverbindlich – per Videokonferenz oder Telefon. Wähle unten
          einen freien Slot.
        </p>
      </section>

      <section className="form-section shell">
        <BookingForm slots={slots} error={error} />
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
