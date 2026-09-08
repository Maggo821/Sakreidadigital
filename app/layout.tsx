import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sakeida Digital | KI, die Arbeit leichter macht",
  description:
    "Sakeida Digital entwickelt individuelle KI-Lösungen und optimiert Prozesse für Unternehmen.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
