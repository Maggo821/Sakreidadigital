import { NextResponse } from "next/server";
import { buildIcs } from "@/lib/booking";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("datum") ?? "";
  const time = searchParams.get("zeit") ?? "";

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return NextResponse.json({ ok: false, error: "Ungültige Parameter." }, { status: 400 });
  }

  return new NextResponse(buildIcs(date, time), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="termin-sakreida-digital.ics"',
    },
  });
}
