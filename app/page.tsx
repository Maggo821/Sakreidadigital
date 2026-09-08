const solutions = [
  {
    number: "01",
    type: "Digitale Büroorganisation",
    title: "Weniger Verwaltung. Mehr Überblick.",
    text: "Dokumente, Aufgaben, Kunden und Vorgänge an einem Ort organisieren, damit nichts liegen bleibt und Informationen nicht doppelt gepflegt werden.",
    tags: ["Ordnung", "Automatisierung"],
  },
  {
    number: "02",
    type: "Vertriebsunterstützung",
    title: "Besser vorbereitet in jedes Gespräch.",
    text: "Kundendaten, Angebote und Unternehmenswissen so verbinden, dass dein Team schneller antwortet und sicherer entscheidet.",
    tags: ["Vertrieb", "Wissen"],
  },
  {
    number: "03",
    type: "Maklerspion",
    title: "Immobilien entdecken, bevor sie sichtbar werden.",
    text: "Maklerspion bringt Hinweise auf Grundstücke, Leerstände und interessante Objekte mit den richtigen Immobilienprofis zusammen.",
    tags: ["Immobilien", "Potenziale"],
  },
  {
    number: "04",
    type: "BeachOrder",
    title: "Bestellen, wo der Tag stattfindet.",
    text: "Gäste bestellen unkompliziert vom Strand, Stellplatz oder Ferienapartment. Anbieter erhalten einen einfachen digitalen Bestellkanal.",
    tags: ["Bestellungen", "Lieferung"],
  },
];

const steps = [
  ["01", "Verstehen", "Wir schauen genau hin: Wo stehen deine Teams, Daten und Prozesse heute?"],
  ["02", "Fokussieren", "Wir finden den Hebel mit dem größten Effekt und machen daraus einen klaren Plan."],
  ["03", "Umsetzen", "Wir bauen, testen und integrieren eine Lösung, die im Alltag wirklich funktioniert."],
];

const fundingSteps = [
  ["01", "Standort bestimmen", "Wir schauen gemeinsam, wo dein Unternehmen digital steht und wo im Alltag Zeit, Geld oder Chancen verloren gehen."],
  ["02", "Vorhaben entwickeln", "Aus dem konkreten Bedarf wird ein klares Digitalisierungsprojekt mit Ziel, Umfang und realistischem Budget."],
  ["03", "Förderung prüfen", "Wir ordnen das Vorhaben passenden Fördermöglichkeiten zu und bereiten die nächsten Schritte verständlich vor."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Sakeida Digital Startseite">
          <span className="brand-mark">S</span>
          <span>SAKEIDA<br /><i>DIGITAL</i></span>
        </a>
        <div className="nav-links">
          <a href="#loesungen">Lösungen</a>
          <a href="#prozess">Prozess</a>
          <a className="nav-cta" href="/kontakt">Kontakt <span>↗</span></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-kicker"><span className="pulse" /> Digitalisierung für kleine und mittelständische Unternehmen</div>
        <h1>Arbeit<br /><em>einfacher machen.</em></h1>
        <div className="hero-bottom">
          <p className="hero-intro">Sakeida Digital hilft kleinen und mittelständischen Unternehmen, <strong>digital besser zu arbeiten</strong>, Abläufe zu vereinfachen und passende Lösungen zu entwickeln. KI ist dabei ein Baustein von vielen.</p>
          <a className="circle-link" href="#loesungen" aria-label="Zu den Lösungen scrollen"><span>↓</span></a>
        </div>
        <div className="hero-grid-art" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </section>

      <section className="signal-band"><div className="shell signal-inner"><span>Digitalisierung</span><b>✳</b><span>Prozessoptimierung</span><b>✳</b><span>Automatisierung</span><b>✳</b><span>Individuelle Lösungen</span><b>✳</b><span>KI als Baustein</span></div></section>

      <section className="section shell" id="loesungen">
        <div className="section-heading"><p className="eyebrow">Lösungen aus der Praxis</p><h2>Was könnte in deinem Unternehmen<br /><span>einfacher werden?</span></h2><p className="section-lead">Diese Lösungen sind aus echten Anforderungen entstanden. Sie zeigen, wie aus einem konkreten Problem ein verständliches digitales Werkzeug wird.</p></div>
        <div className="solution-list">
          {solutions.map((solution) => <article className="solution-card" key={solution.number}><div className="solution-top"><span className="solution-number">{solution.number}</span><span className="solution-type">{solution.type}</span></div><h3>{solution.title}</h3><p>{solution.text}</p><div className="tags">{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="card-arrow">↗</span></article>)}
        </div>
      </section>

      <section className="manifesto"><div className="shell manifesto-grid"><p className="eyebrow">Unsere Haltung</p><blockquote>Digitalisierung ist mehr<br /><span>als nur KI.</span></blockquote><p className="manifesto-copy">Gerade im Mittelstand müssen Lösungen verständlich, bezahlbar und wartbar sein. Wir verstehen zuerst den Prozess, prüfen die Wirkung und kombinieren passende Werkzeuge: klare Abläufe, gute Daten, Automatisierung und dort, wo es sinnvoll ist, KI.</p></div></section>

      <section className="funding-section"><div className="shell"><div className="funding-intro"><p className="eyebrow">Digitalisierung möglich machen</p><h2>Gute Ideen sollen<br /><span>nicht am Budget scheitern.</span></h2><p>Viele kleine und mittelständische Unternehmen wissen, dass sie digitaler werden müssen, aber nicht, wo sie anfangen oder welche Unterstützung infrage kommt. Wir übersetzen deinen Bedarf in ein klares Vorhaben und prüfen gemeinsam mögliche Förderwege.</p></div><div className="funding-steps">{fundingSteps.map(([number, title, text]) => <div className="funding-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div><div className="funding-note"><strong>Aktueller Anhaltspunkt:</strong> Der KfW-ERP-Förderkredit Digitalisierung (511/512) unterscheidet unter anderem Basis-, LevelUp- und HighEnd-Digitalisierung. Für bestimmte Vorhaben der höheren Stufen kann ein Zuschuss vorgesehen sein. <a href="https://www.kfw.de/511" target="_blank" rel="noreferrer">Mehr bei der KfW ↗</a><small>Keine Fördermittel- oder Rechtsberatung. Eine Förderung ist abhängig von den jeweiligen Richtlinien, der Antragstellung und der Zusage des Finanzierungspartners.</small></div></div></section>

      <section className="section shell process" id="prozess">
        <div className="section-heading process-heading"><p className="eyebrow">So arbeiten wir</p><h2>Vom Problem<br /><span>zum Fortschritt.</span></h2><p className="section-lead">Ohne Fachsprache und ohne überdimensionierte Standardpakete. Wir starten dort, wo in deinem Unternehmen Zeit und Energie verloren gehen.</p></div>
        <div className="steps">{steps.map(([number, title, text]) => <div className="step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </section>

      <section className="contact shell"><div className="contact-orb" aria-hidden="true" /><p className="eyebrow">Bereit für den nächsten Schritt?</p><h2>Mach es<br /><em>einfacher.</em></h2><a className="contact-link" href="/kontakt">Lass uns sprechen <span>↗</span></a><p className="contact-note">Unverbindlich. Klar. Auf Augenhöhe.</p></section>

      <footer className="footer shell"><span>© 2026 Sakeida Digital</span><span>Individuelle digitale Lösungen</span><div><a href="/kontakt">Kontakt</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><a href="#top">Nach oben ↑</a></div></footer>
    </main>
  );
}
