import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digitale Lösungen für Unternehmen",
  description:
    "Ausgewählte digitale Lösungen von Sakeida Digital: Immobilienverwaltung, Familienorganisation, Bestellungen und QR-Code-Kommunikation.",
  alternates: { canonical: "/loesungen" },
};

const solutions = [
  {
    number: "01",
    name: "Hausboard",
    category: "Immobilienverwaltung",
    title: "Verwaltung, die den Alltag übersichtlich macht.",
    text: "Hausboard bündelt Immobilien, Bewohner, Aufgaben, Termine, Dokumente und Dienstleister an einem zentralen Ort. So werden Vorgänge nachvollziehbar und Zuständigkeiten klar.",
    benefit: "Für Immobilienverwalter und Teams, die weniger suchen und besser zusammenarbeiten wollen.",
    tags: ["Objekte", "Tickets", "Dokumente"],
    tone: "light",
  },
  {
    number: "02",
    name: "BeachOrder",
    category: "Bestellung & Lieferung",
    title: "Bestellen, wo der Tag stattfindet.",
    text: "BeachOrder verbindet Anbieter und Gäste in Ferienregionen. Gäste bestellen direkt vom Strand, Stellplatz oder Ferienapartment, Anbieter verwalten Produkte, Bestellungen und Lieferungen digital.",
    benefit: "Für Ferienregionen, Campingplätze, Gastronomie und mobile Anbieter.",
    tags: ["Bestellungen", "Lieferung", "Marktplatz"],
    tone: "lime",
  },
  {
    number: "03",
    name: "Familienboard",
    category: "Organisation im Alltag",
    title: "Alles, was eine Familie koordinieren muss.",
    text: "Familienboard bringt Termine, Aufgaben, Schule, Ferien, Einkäufe und Erinnerungen in eine gemeinsame Übersicht. Jedes Familienmitglied sieht, was für es wichtig ist.",
    benefit: "Eine einfache digitale Organisation für Familien, statt vieler einzelner Listen und Kalender.",
    tags: ["Kalender", "Aufgaben", "Familie"],
    tone: "dark",
  },
  {
    number: "04",
    name: "QR-Code-Seiten",
    category: "Kommunikation & Information",
    title: "Eine Information, ein Scan, der richtige nächste Schritt.",
    text: "Individuelle QR-Codes führen zu eigenen Landingpages mit Informationen, Kontaktmöglichkeit oder Nachrichtenfunktion. Inhalte lassen sich zentral verwalten und an verschiedene Organisationen anpassen.",
    benefit: "Für Unternehmen, Vereine, Veranstaltungen und Orte, die Informationen einfach zugänglich machen wollen.",
    tags: ["QR-Codes", "Landingpages", "Nachrichten"],
    tone: "light",
  },
];

export default function LoesungenPage() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="/" aria-label="Sakeida Digital Startseite"><span className="brand-mark">S</span><span>SAKEIDA<br /><i>DIGITAL</i></span></a>
        <div className="nav-links"><a href="/">Startseite</a><a className="nav-cta" href="/kontakt">Kontakt <span>↗</span></a></div>
      </nav>

      <section className="solutions-hero shell">
        <p className="eyebrow">Ausgewählte Lösungen</p>
        <h1>Digitales, das<br /><em>etwas einfacher macht.</em></h1>
        <p className="page-intro">Diese Lösungen sind aus echten Anforderungen entstanden. Sie zeigen, wie digitale Werkzeuge Abläufe ordnen, Menschen verbinden und neue Möglichkeiten schaffen können.</p>
      </section>

      <section className="portfolio-list shell">
        {solutions.map((solution) => <article className={`portfolio-card ${solution.tone}`} key={solution.number}>
          <div className="portfolio-card-top"><span>{solution.number}</span><span>{solution.category}</span></div>
          <div className="portfolio-card-content"><div><h2>{solution.name}</h2><h3>{solution.title}</h3></div><div><p>{solution.text}</p><p className="portfolio-benefit"><strong>Für wen:</strong> {solution.benefit}</p><div className="tags">{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div>
        </article>)}
      </section>

      <section className="solutions-cta"><div className="shell"><p className="eyebrow">Dein Vorhaben</p><h2>Vielleicht fehlt<br /><em>deine Lösung</em> noch.</h2><p>Wenn dein Prozess nicht in ein Standardprogramm passt, entwickeln wir gemeinsam ein digitales Werkzeug, das zu deinem Unternehmen und deinem Alltag passt.</p><a className="contact-link" href="/kontakt">Vorhaben besprechen <span>↗</span></a></div></section>

      <footer className="footer shell"><span>© 2026 Sakeida Digital</span><div><a href="/kontakt">Kontakt</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></div></footer>
    </main>
  );
}
