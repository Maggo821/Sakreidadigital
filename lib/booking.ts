export const BOOKING = {
  slotMinutes: 30,
  startHour: 9,
  endHour: 17,
  daysAhead: 14,
  minNoticeHours: 12,
  timeZone: "Europe/Berlin",
} as const;

export type Slot = {
  date: string;
  time: string;
  key: string;
  label: string;
};

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

function berlinString(value: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: BOOKING.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .format(value)
    .slice(0, 16);
}

export function berlinNow(): string {
  return berlinString(new Date());
}

function addDays(dateStr: string, days: number): string {
  const date = new Date(`${dateStr}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function weekday(dateStr: string): number {
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay();
}

export function berlinOffset(dateStr: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING.timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(new Date(`${dateStr}T12:00:00Z`));
  const value = parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT+01:00";
  const offset = value.replace("GMT", "");
  return offset === "" ? "+00:00" : offset;
}

export function slotIso(date: string, time: string): string {
  return `${date}T${time}:00${berlinOffset(date)}`;
}

export function slotKeyFromIso(iso: string): string {
  return berlinString(new Date(iso)).replace(" ", "T");
}

function slotLabel(date: string, time: string): string {
  const day = new Date(`${date}T12:00:00Z`);
  const [, month, dayOfMonth] = date.split("-");
  return `${WEEKDAYS[day.getUTCDay()]}, ${dayOfMonth}.${month}. · ${time}`;
}

export function generateSlots(bookedKeys: Set<string>): Slot[] {
  const now = berlinNow();
  const nowDate = new Date(`${now.replace(" ", "T")}:00${berlinOffset(now.slice(0, 10))}`);
  const threshold = berlinString(new Date(nowDate.getTime() + BOOKING.minNoticeHours * 3600_000));
  const today = now.slice(0, 10);

  const slots: Slot[] = [];
  for (let dayOffset = 0; dayOffset <= BOOKING.daysAhead; dayOffset++) {
    const date = addDays(today, dayOffset);
    const dayOfWeek = weekday(date);
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    for (
      let minutes = BOOKING.startHour * 60;
      minutes + BOOKING.slotMinutes <= BOOKING.endHour * 60;
      minutes += BOOKING.slotMinutes
    ) {
      const time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
      if (`${date} ${time}` < threshold) continue;
      const key = `${date}T${time}`;
      if (bookedKeys.has(key)) continue;
      slots.push({ date, time, key, label: slotLabel(date, time) });
    }
  }
  return slots;
}

export function isAllowedSlot(date: string, time: string, bookedKeys: Set<string>): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return false;
  return generateSlots(bookedKeys).some((slot) => slot.key === `${date}T${time}`);
}

export function formatSlot(date: string, time: string): string {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year} um ${time} Uhr`;
}

export function buildIcs(date: string, time: string, summary = "Erstgespräch Sakeida Digital"): string {
  const start = new Date(slotIso(date, time));
  const end = new Date(start.getTime() + BOOKING.slotMinutes * 60_000);
  const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const uid = `${date}-${time}-${Math.random().toString(36).slice(2, 8)}@sakreida.digital`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sakeida Digital//Termine//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${summary}`,
    "DESCRIPTION:Erstgespräch mit Marco Sakreida – Sakeida Digital. Bei Bedarf per Videokonferenz oder Telefon.",
    "LOCATION:Videokonferenz / Telefon",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
