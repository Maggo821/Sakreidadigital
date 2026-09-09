# Sakeida Digital Website

## Überblick

Website für Sakeida Digital – Digitalisierung, Prozessoptimierung, Automatisierung und individuelle digitale Lösungen für kleine und mittelständische Unternehmen. Standort Dreieich / Rhein-Main. KI ist ausdrücklich nur ein Baustein, nicht das Kernangebot.

- Domain: `https://sakeida-digital.de` (Vercel, verknüpft mit GitHub)
- Repo: `Maggo821/Sakreidadigital`
- Stack: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript, statische Seiten
- Kontakt: `marcosakreida@outlook.de` · Tel. 0151 10100607

## Befehle

```bash
npm run dev      # Entwicklung
npm run build    # Produktions-Build (Statisch)
npm run start    # Produktions-Server
```

## Struktur

```
app/
  page.tsx             # Startseite (Hero, Lösungen, Förderung, Prozess, FAQ, Kontakt)
  loesungen/page.tsx   # Lösungsportfolio (Hausboard, BeachOrder, OrderPoint, Familienboard, QR)
  kontakt/page.tsx     # Kontaktformular (POST /api/kontakt)
  impressum/           # Impressum
  datenschutz/         # Datenschutz
  api/kontakt/route.ts # Formular-Backend (Resend)
  sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx
```

## Wichtige Regeln

- Kein Wort „SaaS“ in Kundentexten (Entscheidung Marco)
- Kundentexte laienverständlich, keine Technikbegriffe (kein OpenImmo, SFTP, Paperless …)
- Keine internen Projektnamen in Kundenansicht (kein „Haas Sales OS“, „Chaos-Zentrale“)
- Produktnamen nur: BeachOrder, OrderPoint (Arbeitsname), Hausboard, Familienboard, Maklerspion, QR-Code-Seiten
- BeachOrder = Regionen Meer/Seen · OrderPoint = Märkte/Veranstaltungen/mobile Händler (gleiche Plattform, getrennte Marken)
- Sprachregel: Deutsch für UI-Texte, Englisch für Code
- JSON-LD immer im `<body>`, nie als `html`-Kind
- Keine Passwörter/Keys im Repo; Env-Vars in Vercel (siehe `.env.example`)

## Env-Vars (Vercel)

- `RESEND_API_KEY` – für Kontaktformular
- `CONTACT_TO` – Zieladresse (default `marcosakreida@outlook.de`)
- `CONTACT_FROM` – Absender (verifizierte Domain nötig, z. B. `kontakt@sakeida-digital.de`)

## Offene Punkte (Stand 2026-09-08)

- USt-ID im Impressum, rechtliche Endprüfung
- Foto + persönlicher Vorstellungstext von Marco
- Google Search Console + Sitemap einreichen
- OrderPoint: endgültiger Name + Domain
- BeachOrder/OrderPoint: Multi-Domain-Logik im eigenen Repo
- Hausboard: Supabase-Produktionsanbindung
