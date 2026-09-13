import { slotKeyFromIso } from "@/lib/booking";
import { DATA_SOURCES, getDate, getSelect, queryDataSource, type NotionPage } from "@/lib/notion";

export async function getBookedKeys(): Promise<Set<string>> {
  const termine = await queryDataSource(DATA_SOURCES.termine, {
    sorts: [{ property: "Start", direction: "ascending" }],
  });
  const keys = new Set<string>();
  for (const termin of termine) {
    if (getSelect(termin.properties["Status"]) === "Abgesagt") continue;
    const iso = getDate(termin.properties["Start"]);
    if (iso) keys.add(slotKeyFromIso(iso));
  }
  return keys;
}

export async function getTermine(): Promise<NotionPage[]> {
  return queryDataSource(DATA_SOURCES.termine, {
    sorts: [{ property: "Start", direction: "ascending" }],
  });
}
