# Sakeida Digital Website

## Überblick

Website für Sakeida Digital – Digitalisierung, Prozessoptimierung, Automatisierung und individuelle digitale Lösungen für kleine und mittelständische Unternehmen. Standort Dreieich / Rhein-Main. KI ist ausdrücklich nur ein Baustein, nicht das Kernangebot.

- Domain: `https://sakreida.digital` (Vercel, verknüpft mit GitHub)
- Repo: `Maggo821/Sakreidadigital`
- Stack: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript; öffentliche Seiten statisch, Backoffice (`/admin`) dynamisch
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
  api/kontakt/route.ts # Formular-Backend (Resend + Notion-Lead)
  api/admin/           # Login/Logout für das Backoffice
  admin/               # Backoffice: Login + geschützter Bereich (Dashboard, Kunden, Projekte, Aufgaben)
  sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx
lib/
  notion.ts            # Notion-API-Client (Datenquellen, Properties)
  admin-auth.ts        # Passwort-Login + signiertes Session-Cookie
proxy.ts               # Routenschutz für /admin (Next 16: "proxy" statt "middleware")
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
- `CONTACT_FROM` – Absender (verifizierte Domain nötig, z. B. `kontakt@sakreida.digital`)
- `NOTION_TOKEN` – Notion-Integration (gleicher Token wie lokal); nötig für Backoffice + Lead-Erfassung
- `ADMIN_PASSWORD` – Passwort für `/admin` (lang und zufällig)
- `ADMIN_SECRET` – optionaler Signatur-Schlüssel für Session-Cookies (sonst wird `ADMIN_PASSWORD` genutzt)

## Notion (Backoffice & Wissensdatenbank)

Regel von Marco: Inhalte/Strukturen immer parallel in Notion anlegen.
Root-Seite „🚀 Sakreida Digital“ (liegt aktuell unter „Sakreida Immobilien Neustart“, soll auf Workspace-Ebene gezogen werden).

```
🚀 Sakreida Digital
├── 🗂️ Backoffice
│   ├── Kunden & Kontakte        (CRM, Status/Quelle/Branche)
│   ├── Projekte & Aufträge      (Relation → Kunden)
│   ├── Angebote & Rechnungen    (Relation → Kunden)
│   └── Aufgaben & To-dos        (Relation → Kunden, Projekte)
├── 📚 Wissensdatenbank
│   ├── Wissen & Methoden        (Kategorien inkl. Fördermittel)
│   ├── Prozesse & Checklisten
│   ├── Vorlagen & Textbausteine
│   └── Kunden-FAQ & Einwände
└── 💶 Förderungen
    └── Förderprogramme          (Ebene: Bund/Land/EU/Region, alle 16 Bundesländer)
```

- Anlegen von Notion-Datenbanken: MCP kann nur Data Sources in bestehenden DBs anlegen → neue DBs über Notion-API (`POST /v1/databases` mit `initial_data_source`, `Notion-Version: 2025-09-03`) via `NOTION_TOKEN`.
- Förderprogramme: vollständig befüllt (Stand 2026-09-12, 31 Programme) – Bund (BAFA, INQA, KfW 511/512, Mittelstand-Digital, ZIM + ausgelaufene Digital Jetzt/go-digital) und alle 16 Bundesländer (u. a. Hessen: DIGI-Zuschuss, HessenFonds, RKW; BW, RLP, Bayern, NRW, Berlin, Brandenburg, Bremen, Hamburg, MV, Niedersachsen, Saarland, Sachsen, Sachsen-Anhalt, Schleswig-Holstein, Thüringen) – je mit Status (Aktiv/Ausgelaufen/Neu prüfen) und Relevanz. Nächste Pflege: Programme regelmäßig auf Status prüfen, EU-Ebene ergänzen.
- Wissensdatenbank (Stand 2026-09-12): Artikel zu Synology NAS, Paperless-NGX, n8n-Automatisierung, KI-Nutzungsregeln und Fördermittel-Checkliste; 8 Arbeitsvorlagen für den Makler-Effizienz-Check 90; Kunden-FAQ mit 7 typischen Fragen/Einwänden befüllt.

## Backoffice (Admin-Bereich)

- URL: `/admin` – Login mit `ADMIN_PASSWORD`, Session-Cookie (7 Tage, signiert), Schutz über `proxy.ts`
- Datenbasis: **dieselben Notion-Datenbanken** wie das Notion-Backoffice (Kunden & Kontakte, Projekte & Aufträge, Aufgaben & To-dos) – eine Quelle der Wahrheit, kein doppeltes Pflegen
- Seiten: Dashboard (Leads, Kunden, aktive Projekte, offene/überfällige Aufgaben), Kunden (Suche/Filter, Status ändern, anlegen), Projekte (anlegen, Status), Aufgaben (anlegen, Status, Kunden-/Projektzuordnung)
- Kontaktformular der Website legt jeden Lead automatisch in „Kunden & Kontakte“ an (Status „Interessent“, Quelle „Website“)
- Code: `lib/notion.ts` (API-Client), `lib/admin-auth.ts` (HMAC-Cookie), Server Actions in `app/admin/(protected)/actions.ts`
- Hinweis Next 16: Middleware-Konvention heißt `proxy.ts` (nicht `middleware.ts`)

## Offene Punkte (Stand 2026-09-12)

- USt-ID im Impressum, rechtliche Endprüfung
- Foto + persönlicher Vorstellungstext von Marco
- Google Search Console + Sitemap einreichen
- OrderPoint: endgültiger Name + Domain
- BeachOrder/OrderPoint: Multi-Domain-Logik im eigenen Repo
- Hausboard: Supabase-Produktionsanbindung
- Backoffice aktivieren: `NOTION_TOKEN` + `ADMIN_PASSWORD` in Vercel setzen, dann `/admin` testen
- Backoffice: erste echte Kunden/Projekte eintragen

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
