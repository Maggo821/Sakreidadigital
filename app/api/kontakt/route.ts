import { NextResponse } from "next/server";
import { DATA_SOURCES, createPage, props } from "@/lib/notion";

const TO = process.env.CONTACT_TO ?? "marcosakreida@outlook.de";
const FROM = process.env.CONTACT_FROM ?? "kontakt@sakreida.digital";

async function saveLeadToNotion(input: { name: string; email: string; company: string; message: string }): Promise<boolean> {
  if (!process.env.NOTION_TOKEN) {
    console.error("NOTION_TOKEN fehlt – Lead konnte nicht gespeichert werden.");
    return false;
  }
  try {
    await createPage(DATA_SOURCES.kunden, {
      Name: props.title(input.name),
      "E-Mail": props.email(input.email),
      Unternehmen: props.rich(input.company),
      Status: props.select("Interessent"),
      Quelle: props.select("Website"),
      Notizen: props.rich(input.message),
    });
    return true;
  } catch (error) {
    console.error("Notion-Lead konnte nicht angelegt werden:", error);
    return false;
  }
}

async function sendNotification(input: { name: string; email: string; company: string; message: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY fehlt – E-Mail-Benachrichtigung übersprungen.");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: `Anfrage von ${input.name} – Sakeida Digital Website`,
        reply_to: input.email,
        text: `Name: ${input.name}\nE-Mail: ${input.email}\nUnternehmen: ${input.company || "-"}\n\n${input.message}`,
      }),
    });
    if (!res.ok) {
      console.error("Resend-Versand fehlgeschlagen:", res.status, (await res.text()).slice(0, 200));
      return false;
    }
    return true;
  } catch (error) {
    console.error("Resend-Versand fehlgeschlagen:", error);
    return false;
  }
}

export async function POST(request: Request) {
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

  const [mailOk, leadOk] = await Promise.all([
    sendNotification({ name, email, company, message }),
    saveLeadToNotion({ name, email, company, message }),
  ]);

  if (!mailOk && !leadOk) {
    return NextResponse.json(
      { ok: false, error: "Senden fehlgeschlagen. Bitte später erneut versuchen." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
