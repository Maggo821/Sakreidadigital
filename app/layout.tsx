import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://sakeida-digital.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sakeida Digital | Digitalisierung für den Mittelstand in Dreieich",
    template: "%s | Sakeida Digital",
  },
  description:
    "Sakeida Digital aus Dreieich unterstützt kleine und mittelständische Unternehmen im Rhein-Main-Gebiet bei Digitalisierung, Prozessoptimierung, Automatisierung und individuellen digitalen Lösungen. KI ist dabei nur ein möglicher Baustein.",
  keywords: [
    "Digitalisierung KMU",
    "Digitalisierung Mittelstand",
    "Digitalisierungsberatung Dreieich",
    "Digitalisierung Rhein-Main",
    "Prozessoptimierung",
    "Automatisierung KMU",
    "KI Beratung KMU",
    "Fördermittel Digitalisierung",
    "individuelle digitale Lösungen",
    "digitale Bestellungen vor Ort",
  ],
  authors: [{ name: "Marco Sakreida" }],
  creator: "Marco Sakreida",
  publisher: "Sakeida Digital",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteUrl,
    siteName: "Sakeida Digital",
    title: "Sakeida Digital | Digitalisierung für den Mittelstand",
    description:
      "Digitalisierung, Prozessoptimierung, Automatisierung und individuelle digitale Lösungen für kleine und mittelständische Unternehmen im Rhein-Main-Gebiet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakeida Digital | Digitalisierung für den Mittelstand",
    description:
      "Digitalisierung, Prozessoptimierung und individuelle digitale Lösungen für kleine und mittelständische Unternehmen.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}#organisation`,
  name: "Sakeida Digital",
  description:
    "Digitalisierung, Prozessoptimierung, Automatisierung und individuelle digitale Lösungen für kleine und mittelständische Unternehmen. KI ist dabei nur ein möglicher Baustein.",
  url: siteUrl,
  email: "marcosakreida@outlook.de",
  telephone: "+4915110100607",
  founder: { "@type": "Person", name: "Marco Sakreida" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Schießgartenstraße 8",
    postalCode: "63303",
    addressLocality: "Dreieich",
    addressRegion: "Hessen",
    addressCountry: "DE",
  },
  areaServed: [
    { "@type": "City", name: "Dreieich" },
    { "@type": "City", name: "Frankfurt am Main" },
    { "@type": "City", name: "Offenbach am Main" },
    { "@type": "City", name: "Darmstadt" },
    { "@type": "AdministrativeArea", name: "Rhein-Main-Gebiet" },
    { "@type": "Country", name: "Deutschland" },
  ],
  knowsLanguage: ["de"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Leistungen",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digitalisierungsberatung für kleine und mittelständische Unternehmen" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Prozessoptimierung und Automatisierung von Abläufen" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Entwicklung individueller digitaler Lösungen und Web-Anwendungen" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Einordnung von Digitalisierungsvorhaben und Prüfung möglicher Förderwege" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sinnvoller Einsatz von KI in bestehenden Prozessen" } },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
