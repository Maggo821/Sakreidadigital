import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { formatArticleDate, getArticle, getArticles } from "@/lib/ratgeber";

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/ratgeber/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `/ratgeber/${article.slug}`,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const html = await marked.parse(article.body);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Person", name: "Marco Sakreida" },
    publisher: { "@type": "Organization", name: "Sakeida Digital" },
    mainEntityOfPage: `https://sakreida.digital/ratgeber/${article.slug}`,
  };

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
        <a className="back-link" href="/ratgeber">
          ← Zum Ratgeber
        </a>
      </nav>

      <article className="legal-page shell">
        <p className="eyebrow">Ratgeber · {formatArticleDate(article.date)}</p>
        <h1>{article.title}</h1>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="article-cta">
          <p className="eyebrow">Dein Vorhaben</p>
          <h2>Lass uns darüber sprechen.</h2>
          <a className="contact-link" href="/kontakt">
            Kontakt aufnehmen <span>↗</span>
          </a>
          <p className="contact-note">Unverbindlich. Klar. Auf Augenhöhe.</p>
        </div>
      </article>

      <footer className="footer shell">
        <span>© 2026 Sakeida Digital</span>
        <div>
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}
