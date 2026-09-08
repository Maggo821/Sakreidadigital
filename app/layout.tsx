import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sakeida-digital.de"),
  title: {
    default: "Sakeida Digital | Digitalisierung für den Mittelstand",
    template: "%s | Sakeida Digital",
  },
  description:
    "Sakeida Digital unterstützt kleine und mittelständische Unternehmen bei Digitalisierung, Prozessoptimierung, Automatisierung und individuellen digitalen Lösungen. KI ist dabei nur ein möglicher Baustein.",
  keywords: [
    "Digitalisierung KMU",
    "Digitalisierung Mittelstand",
    "Prozessoptimierung",
    "Automatisierung KMU",
    "KI Beratung KMU",
    "Digitalisierung KMU",
    "individuelle digitale Lösungen",
  ],
  authors: [{ name: "Marco Sakreida" }],
  creator: "Marco Sakreida",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://sakeida-digital.de",
    siteName: "Sakeida Digital",
    title: "Sakeida Digital | Digitalisierung für den Mittelstand",
    description:
      "Digitalisierung, Prozessoptimierung, Automatisierung und individuelle digitale Lösungen für kleine und mittelständische Unternehmen. KI ist dabei nur ein möglicher Baustein.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Sakeida Digital",
            description: "Digitalisierung, Prozessoptimierung, Automatisierung und individuelle digitale Lösungen für kleine und mittelständische Unternehmen. KI ist dabei nur ein möglicher Baustein.",
            url: "https://sakeida-digital.de",
            email: "marcosakreida@outlook.de",
            telephone: "+4915110100607",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Schießgartenstraße 8",
              postalCode: "63303",
              addressLocality: "Dreieich",
              addressCountry: "DE",
            },
            areaServed: "DE",
          }),
        }}
      />
    </html>
  );
}
