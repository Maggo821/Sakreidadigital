const solutions = [
  {
    number: "01",
    type: "Workflow System",
    title: "Weniger Suchen. Mehr Entscheiden.",
    text: "Individuelle Wissenssysteme, die Informationen dort verfügbar machen, wo sie gebraucht werden.",
    tags: ["KI-Wissensbasis", "Automatisierung"],
  },
  {
    number: "02",
    type: "Operations",
    title: "Prozesse, die mitdenken.",
    text: "Von der ersten Analyse bis zum automatisierten Ablauf: Wir machen aus manuellen Routinen digitale Systeme.",
    tags: ["Prozessanalyse", "Schnittstellen"],
  },
  {
    number: "03",
    type: "Digital Product",
    title: "Ideen werden zu Lösungen.",
    text: "Web-Apps und digitale Werkzeuge, die genau zu deinem Unternehmen passen. Klar, skalierbar, ohne Ballast.",
    tags: ["Web-Apps", "Individuelle Tools"],
  },
];

const steps = [
  ["01", "Verstehen", "Wir schauen genau hin: Wo stehen deine Teams, Daten und Prozesse heute?"],
  ["02", "Fokussieren", "Wir finden den Hebel mit dem größten Effekt und machen daraus einen klaren Plan."],
  ["03", "Umsetzen", "Wir bauen, testen und integrieren eine Lösung, die im Alltag wirklich funktioniert."],
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
          <a className="nav-cta" href="mailto:hallo@sakeida-digital.de">Kontakt <span>↗</span></a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-kicker"><span className="pulse" /> Digitale Beratung für morgen</div>
        <h1>Komplexität<br /><em>simplifizieren.</em></h1>
        <div className="hero-bottom">
          <p className="hero-intro">Sakeida Digital verbindet <strong>KI, Prozesse und Menschen</strong> zu Lösungen, die dein Unternehmen klarer, schneller und zukunftsfähig machen.</p>
          <a className="circle-link" href="#loesungen" aria-label="Zu den Lösungen scrollen"><span>↓</span></a>
        </div>
        <div className="hero-grid-art" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      </section>

      <section className="signal-band"><div className="shell signal-inner"><span>KI-Beratung</span><b>✳</b><span>Prozessoptimierung</span><b>✳</b><span>Individuelle Lösungen</span><b>✳</b><span>KI-Beratung</span></div></section>

      <section className="section shell" id="loesungen">
        <div className="section-heading"><p className="eyebrow">Was wir bauen</p><h2>Keine Lösungen<br /><span>von der Stange.</span></h2><p className="section-lead">Jedes Unternehmen arbeitet anders. Deshalb entstehen bei uns keine Standardpakete, sondern digitale Systeme, die zu deiner Realität passen.</p></div>
        <div className="solution-list">
          {solutions.map((solution) => <article className="solution-card" key={solution.number}><div className="solution-top"><span className="solution-number">{solution.number}</span><span className="solution-type">{solution.type}</span></div><h3>{solution.title}</h3><p>{solution.text}</p><div className="tags">{solution.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="card-arrow">↗</span></article>)}
        </div>
      </section>

      <section className="manifesto"><div className="shell manifesto-grid"><p className="eyebrow">Unsere Haltung</p><blockquote>Technologie ist kein Selbstzweck.<br /><span>Sie soll Raum schaffen.</span></blockquote><p className="manifesto-copy">Für bessere Entscheidungen. Für weniger Reibung. Für Arbeit, die sich wieder nach Fortschritt anfühlt.</p></div></section>

      <section className="section shell process" id="prozess">
        <div className="section-heading process-heading"><p className="eyebrow">So arbeiten wir</p><h2>Vom Problem<br /><span>zum Fortschritt.</span></h2></div>
        <div className="steps">{steps.map(([number, title, text]) => <div className="step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
      </section>

      <section className="contact shell"><div className="contact-orb" aria-hidden="true" /><p className="eyebrow">Bereit für den nächsten Schritt?</p><h2>Mach es<br /><em>einfacher.</em></h2><a className="contact-link" href="mailto:hallo@sakeida-digital.de">Lass uns sprechen <span>↗</span></a><p className="contact-note">Unverbindlich. Klar. Auf Augenhöhe.</p></section>

      <footer className="footer shell"><span>© 2025 Sakeida Digital</span><span>Individuelle digitale Lösungen</span><div><a href="mailto:hallo@sakeida-digital.de">hallo@sakeida-digital.de</a><a href="#top">Nach oben ↑</a></div></footer>
    </main>
  );
}
