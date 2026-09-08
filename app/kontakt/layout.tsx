import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt für Digitalisierung im Mittelstand",
  description:
    "Kontakt zu Sakeida Digital aus Dreieich: Digitalisierung, Prozessoptimierung und individuelle digitale Lösungen für kleine und mittelständische Unternehmen im Rhein-Main-Gebiet.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
