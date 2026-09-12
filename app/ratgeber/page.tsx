import type { Metadata } from "next";
import { formatArticleDate, getArticles } from "@/lib/ratgeber";

export const metadata: Metadata = {
  title: "Ratgeber: Digitalisierung für den Mittelstand",
  description:
    "Praxisnahe Ratgeber zu Digitalisierung, Prozessen, Automatisierung und KI für kleine und mittlere Unternehmen – verständlich erklärt, ohne Fachchinesisch.",
  alternates: { canonical: "/ratgeber" },
};

export default function RatgeberPage() {
  const articles = getArticles();

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
        <div className="nav-links">
          <a href="/loesungen">Lösungen</a>
          <a href="/kontakt">Kontakt</a>
          <a className="nav-cta" href="/termin">
            Termin <span>↗</span>
          </a>
        </div>
      </nav>

      <section className="legal-hero shell">
        <p className="eyebrow">Ratgeber</p>
        <h1>
          Wissen, das
          <br />
          <em>weiterhilft.</em>
        </h1>
        <p className="page-intro">
          Digitalisierung, Prozesse, Automatisierung und KI – verständlich erklärt für kleine und mittlere
          Unternehmen. Ohne Fachchinesisch, mit klaren Schritten.
        </p>
      </section>

      <section className="shell ratgeber-list">
        {articles.map((article) => (
          <a className="ratgeber-card" href={`/ratgeber/${article.slug}`} key={article.slug}>
            <p className="eyebrow">Ratgeber</p>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <div className="ratgeber-meta">
              <span>{formatArticleDate(article.date)}</span>
              <span>Weiterlesen ↗</span>
            </div>
          </a>
        ))}
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
