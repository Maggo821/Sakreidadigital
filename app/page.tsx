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
    url: "https://maklerspion.de",
  },
  {
    number: "04",
    type: "OrderPoint",
    title: "Bestellen, wo der Kunde gerade ist.",
    text: "OrderPoint ermöglicht digitale Bestellungen vor Ort, bei Märkten, Veranstaltungen und mobilen Händlern. Anbieter erhalten einen einfachen Bestellkanal für Ausgabe oder Lieferung.",
    tags: ["Vor Ort", "Mobile Händler"],
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

const faqs = [
  {
    question: "Was macht Sakeida Digital genau?",
    answer:
      "Sakeida Digital begleitet kleine und mittelständische Unternehmen bei der Digitalisierung. Wir analysieren Arbeitsabläufe, finden Zeitfresser und entwickeln daraus digitale Lösungen: von besser organisierten Prozessen über Automatisierung bis zu individuellen Web-Anwendungen.",
  },
  {
    question: "Für wen ist das Angebot gedacht?",
    answer:
      "Für kleine und mittelständische Unternehmen, Selbstständige, Handwerks- und Dienstleistungsbetriebe, die viel Zeit in Verwaltung, Papier, doppelter Dateneingabe oder unklaren Abläufen verlieren.",
  },
  {
    question: "Muss ich dafür künstliche Intelligenz einsetzen?",
    answer:
      "Nein. KI ist nur ein möglicher Baustein. Oft bringen klare Abläufe, saubere Daten und einfache Automatisierung mehr Wirkung. KI setzen wir nur ein, wenn sie einen echten Vorteil bringt.",
  },
  {
    question: "Kann die Digitalisierung meines Unternehmens gefördert werden?",
    answer:
      "Für Digitalisierungsvorhaben gibt es Förderprogramme, zum Beispiel den ERP-Förderkredit Digitalisierung der KfW mit den Stufen Basis-, LevelUp- und HighEnd-Digitalisierung. Wir helfen dabei, dein Vorhaben so zu beschreiben, dass es sich einordnen lässt. Ob eine Förderung möglich ist, entscheidet immer das jeweilige Programm zusammen mit deinem Finanzierungspartner. Wir leisten keine Fördermittel- oder Rechtsberatung.",
  },
  {
    question: "In welcher Region arbeitet Sakeida Digital?",
    answer:
      "Der Sitz ist in Dreieich bei Frankfurt am Main. Wir arbeiten vor allem mit Unternehmen im Rhein-Main-Gebiet, unter anderem in Frankfurt, Offenbach, Langen, Neu-Isenburg und Darmstadt. Digitale Projekte begleiten wir auch überregional.",
  },
  {
    question: "Wie läuft die Zusammenarbeit ab?",
    answer:
      "In drei Schritten: verstehen, fokussieren, umsetzen. Zuerst schauen wir uns die tatsächlichen Abläufe an, dann bestimmen wir den Hebel mit der größten Wirkung, danach wird die Lösung gebaut, getestet und in den Alltag integriert.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="Sakeida Digital Startseite">
          <span className="brand-mark">S</span>
          <span>SAKEIDA<br /><i>DIGITAL</i></span>
        </a>
        <div className="nav-links">
          <a href="/loesungen">Lösungen</a>
          <a href="/ratgeber">Ratgeber</a>
          <a href="#prozess">Prozess</a>
          <a className="nav-cta" href="/kontakt">Kontakt <span>↗</span></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-kicker"><span className="pulse" /> Digitalisierung für kleine und mittelständische Unternehmen</div>
        <h1>Arbeit<br /><em>einfacher machen.</em></h1>
        <div className="hero-bottom">
          <p className="hero-intro">Sakeida Digital hilft kleinen und mittelständischen Unternehmen, <strong>digital besser zu arbeiten</strong>, Abläufe zu vereinfachen und passende Lösungen zu entwickeln. KI ist dabei ein Baustein von vielen. Aus <strong>Dreieich</strong> für Unternehmen im Rhein-Main-Gebiet und überregional.</p>
          <a className="circle-link" href="#loesungen" aria-label="Zu den Lösungen scrollen"><span>↓</span></a>
        </div>
        <div className="hero-grid-art" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </section>

      <section className="signal-band"><div className="shell signal-inner"><span>Digitalisierung</span><b>✳</b><span>Prozessoptimierung</span><b>✳</b><span>Automatisierung</span><b>✳</b><span>Individuelle Lösungen</span><b>✳</b><span>KI als Baustein</span></div></section>

      <section className="section shell" id="loesungen">
        <div className="section-heading"><p className="eyebrow">Lösungen aus der Praxis</p><h2>Was könnte in deinem Unternehmen<br /><span>einfacher werden?</span></h2><p className="section-lead">Diese Lösungen sind aus echten Anforderungen entstanden. Sie zeigen, wie aus einem konkreten Problem ein verständliches digitales Werkzeug wird.</p></div>
        <div className="solution-list">
          {solutions.map((solution) => <article className="solution-card" key={solution.number}><div className="solution-top"><span className="solution-number">{solution.number}</span><span className="solution-type">{solution.type}</span></div><h3>{solution.title}</h3><p>{solution.text}</p><div className="tags">{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{solution.url ? <a className="solution-link" href={solution.url} target="_blank" rel="noreferrer">Lösung ansehen <span>↗</span></a> : <span className="solution-link solution-link-disabled">Arbeitsname · Domain folgt</span>}<span className="card-arrow">↗</span></article>)}
        </div>
        <a className="section-more" href="/loesungen">Alle Lösungen ansehen <span>↗</span></a>
      </section>

      <section className="manifesto"><div className="shell manifesto-grid"><p className="eyebrow">Unsere Haltung</p><blockquote>Digitalisierung ist mehr<br /><span>als nur KI.</span></blockquote><p className="manifesto-copy">Gerade im Mittelstand müssen Lösungen verständlich, bezahlbar und wartbar sein. Wir verstehen zuerst den Prozess, prüfen die Wirkung und kombinieren passende Werkzeuge: klare Abläufe, gute Daten, Automatisierung und dort, wo es sinnvoll ist, KI.</p></div></section>

      <section className="funding-section"><div className="shell"><div className="funding-intro"><p className="eyebrow">Digitalisierung möglich machen</p><h2>Gute Ideen sollen<br /><span>nicht am Budget scheitern.</span></h2><p>Viele kleine und mittelständische Unternehmen wissen, dass sie digitaler werden müssen, aber nicht, wo sie anfangen oder welche Unterstützung infrage kommt. Wir übersetzen deinen Bedarf in ein klares Vorhaben und prüfen gemeinsam mögliche Förderwege.</p></div><div className="funding-steps">{fundingSteps.map(([number, title, text]) => <div className="funding-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div><div className="funding-note"><strong>Aktueller Anhaltspunkt:</strong> Der KfW-ERP-Förderkredit Digitalisierung (511/512) unterscheidet unter anderem Basis-, LevelUp- und HighEnd-Digitalisierung. Für bestimmte Vorhaben der höheren Stufen kann ein Zuschuss vorgesehen sein. <a href="https://www.kfw.de/511" target="_blank" rel="noreferrer">Mehr bei der KfW ↗</a><small>Keine Fördermittel- oder Rechtsberatung. Eine Förderung ist abhängig von den jeweiligen Richtlinien, der Antragstellung und der Zusage des Finanzierungspartners.</small></div></div></section>

      <section className="section shell process" id="prozess">
        <div className="section-heading process-heading"><p className="eyebrow">So arbeiten wir</p><h2>Vom Problem<br /><span>zum Fortschritt.</span></h2><p className="section-lead">Ohne Fachsprache und ohne überdimensionierte Standardpakete. Wir starten dort, wo in deinem Unternehmen Zeit und Energie verloren gehen.</p></div>
        <div className="steps">{steps.map(([number, title, text]) => <div className="step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </section>

      <section className="section shell faq-section" id="fragen">
        <div className="section-heading process-heading"><p className="eyebrow">Häufige Fragen</p><h2>Kurz erklärt,<br /><span>ohne Fachsprache.</span></h2></div>
        <div className="faq-list">{faqs.map((faq) => <div className="faq-item" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></div>)}</div>
      </section>

      <section className="contact shell"><div className="contact-orb" aria-hidden="true" /><p className="eyebrow">Bereit für den nächsten Schritt?</p><h2>Mach es<br /><em>einfacher.</em></h2><a className="contact-link" href="/kontakt">Lass uns sprechen <span>↗</span></a><p className="contact-note">Unverbindlich. Klar. Auf Augenhöhe.</p></section>

      <footer className="footer shell"><span>© 2026 Sakeida Digital · Dreieich</span><span>Digitalisierung für den Mittelstand</span><div><a href="/loesungen">Lösungen</a><a href="/kontakt">Kontakt</a><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a></div></footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main>
  );
}
