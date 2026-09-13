import { NextResponse } from "next/server";
import { BOOKING, buildIcs, formatSlot, isAllowedSlot, slotIso } from "@/lib/booking";
import { DATA_SOURCES, createPage, props, updatePage } from "@/lib/notion";
import { getBookedKeys } from "@/lib/termine";

const TO = process.env.CONTACT_TO ?? "marcosakreida@outlook.de";
const FROM = process.env.CONTACT_FROM ?? "kontakt@sakreida.digital";

async function sendMail(payload: Record<string, unknown>): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY fehlt – Termin-Mail übersprungen.");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Resend fehlgeschlagen:", res.status, (await res.text()).slice(0, 200));
      return false;
    }
    return true;
  } catch (error) {
    console.error("Resend fehlgeschlagen:", error);
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

  const date = String(data.date ?? "").trim();
  const time = String(data.time ?? "").trim();
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const topic = String(data.topic ?? "").trim();

  if (!name || !email || !date || !time || !topic) {
    return NextResponse.json({ ok: false, error: "Bitte alle Pflichtfelder ausfüllen." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 400 });
  }
  if (name.length > 200 || topic.length > 2000 || phone.length > 50) {
    return NextResponse.json({ ok: false, error: "Eingabe ist zu lang." }, { status: 400 });
  }

  let booked: Set<string>;
  try {
    booked = await getBookedKeys();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Termine sind gerade nicht verfügbar. Bitte später erneut versuchen." },
      { status: 502 },
    );
  }

  if (!isAllowedSlot(date, time, booked)) {
    return NextResponse.json(
      { ok: false, error: "Dieser Termin ist nicht mehr verfügbar. Bitte wähle einen anderen Slot." },
      { status: 409 },
    );
  }

  const when = formatSlot(date, time);
  let created: { id: string };
  try {
    created = await createPage(DATA_SOURCES.termine, {
      Termin: props.title(`Erstgespräch – ${name}`),
      Start: { date: { start: slotIso(date, time) } },
      Name: props.rich(name),
      "E-Mail": props.email(email),
      Telefon: props.phone(phone),
      Thema: props.rich(topic),
      Status: props.select("Gebucht"),
    });
  } catch (error) {
    console.error("Termin konnte nicht gespeichert werden:", error);
    return NextResponse.json(
      { ok: false, error: "Buchung fehlgeschlagen. Bitte später erneut versuchen." },
      { status: 502 },
    );
  }

  const icsBase64 = Buffer.from(buildIcs(date, time), "utf8").toString("base64");

  const [customerMailOk] = await Promise.all([
    sendMail({
      from: FROM,
      to: [email],
      subject: `Terminbestätigung: Erstgespräch am ${when}`,
      text: `Hallo ${name},\n\ndein Termin für ein Erstgespräch ist gebucht:\n\n${when} (${BOOKING.slotMinutes} Minuten, Videokonferenz oder Telefon)\nThema: ${topic}\n\nIm Anhang findest du die Kalender-Datei. Falls du den Termin verschieben musst, antworte einfach auf diese E-Mail.\n\nViele Grüße\nMarco Sakreida\nSakeida Digital`,
      attachments: [{ filename: "termin-sakreida-digital.ics", content: icsBase64 }],
    }),
    sendMail({
      from: FROM,
      to: [TO],
      subject: `Neuer Termin: ${when} – ${name}`,
      reply_to: email,
      text: `Neue Terminbuchung über die Website:\n\n${when}\nName: ${name}\nE-Mail: ${email}\nTelefon: ${phone || "-"}\nThema: ${topic}\n\nIm Backoffice: /admin/termine`,
    }),
  ]);

  if (customerMailOk) {
    try {
      await updatePage(created.id, { Status: props.select("Bestätigt") });
    } catch (error) {
      console.error("Status konnte nicht aktualisiert werden:", error);
    }
  }

  return NextResponse.json({
    ok: true,
    date,
    time,
    when,
    icsUrl: `/api/termin/ics?datum=${date}&zeit=${time}`,
  });
}
