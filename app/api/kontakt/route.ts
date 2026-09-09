import { NextResponse } from "next/server";

const TO = process.env.CONTACT_TO ?? "marcosakreida@outlook.de";
const FROM = process.env.CONTACT_FROM ?? "kontakt@sakreida.digital";

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: "Formular ist derzeit nicht konfiguriert." }, { status: 500 });
  }

  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const company = String(data.company ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Bitte alle Pflichtfelder ausfüllen." }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200 || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Eingabe ist zu lang." }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject: `Anfrage von ${name} – Sakeida Digital Website`,
      reply_to: email,
      text: `Name: ${name}\nE-Mail: ${email}\nUnternehmen: ${company || "-"}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Senden fehlgeschlagen. Bitte später erneut versuchen." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
