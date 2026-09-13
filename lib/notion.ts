const NOTION_VERSION = "2025-09-03";
const API = "https://api.notion.com/v1";

export const DATA_SOURCES = {
  kunden: "e84b2822-b2db-48c6-a184-1affa932cddc",
  projekte: "ef148e41-7258-472e-9fdd-7f4150ef1068",
  angebote: "c82daec1-651f-422f-a639-e43db64d7248",
  aufgaben: "474ada67-6241-4d3e-bc26-6d92daf61d04",
  termine: "e6b1ed38-e2b7-4698-a6d8-035a8a53c134",
} as const;

export type NotionPage = {
  id: string;
  created_time: string;
  properties: Record<string, unknown>;
};

function token(): string {
  const value = process.env.NOTION_TOKEN;
  if (!value) throw new Error("NOTION_TOKEN ist nicht gesetzt.");
  return value;
}

export async function notionFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token()}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion ${res.status}: ${text.slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

export async function queryDataSource(
  dataSourceId: string,
  body: Record<string, unknown> = {},
): Promise<NotionPage[]> {
  const data = await notionFetch<{ results: NotionPage[] }>(`/data_sources/${dataSourceId}/query`, {
    method: "POST",
    body: JSON.stringify({ page_size: 100, ...body }),
  });
  return data.results;
}

export async function createPage(
  dataSourceId: string,
  properties: Record<string, unknown>,
): Promise<{ id: string }> {
  return notionFetch<{ id: string }>("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: { type: "data_source_id", data_source_id: dataSourceId },
      properties,
    }),
  });
}

export async function updatePage(pageId: string, properties: Record<string, unknown>): Promise<void> {
  await notionFetch(`/pages/${pageId}`, {
    method: "PATCH",
    body: JSON.stringify({ properties }),
  });
}

export const props = {
  title: (value: string) => ({ title: value ? [{ text: { content: value } }] : [] }),
  rich: (value: string) => ({ rich_text: value ? [{ text: { content: value } }] : [] }),
  select: (value: string) => ({ select: value ? { name: value } : null }),
  email: (value: string) => ({ email: value || null }),
  phone: (value: string) => ({ phone_number: value || null }),
  date: (value: string) => ({ date: value ? { start: value } : null }),
  relation: (ids: string[]) => ({ relation: ids.filter(Boolean).map((id) => ({ id })) }),
};

export function getTitle(property: unknown): string {
  const value = property as { title?: Array<{ plain_text?: string }> } | undefined;
  return value?.title?.map((item) => item.plain_text ?? "").join("") ?? "";
}

export function getRich(property: unknown): string {
  const value = property as { rich_text?: Array<{ plain_text?: string }> } | undefined;
  return value?.rich_text?.map((item) => item.plain_text ?? "").join("") ?? "";
}

export function getSelect(property: unknown): string {
  const value = property as { select?: { name?: string } | null } | undefined;
  return value?.select?.name ?? "";
}

export function getEmail(property: unknown): string {
  const value = property as { email?: string | null } | undefined;
  return value?.email ?? "";
}

export function getPhone(property: unknown): string {
  const value = property as { phone_number?: string | null } | undefined;
  return value?.phone_number ?? "";
}

export function getDate(property: unknown): string {
  const value = property as { date?: { start?: string } | null } | undefined;
  return value?.date?.start ?? "";
}

export function getRelation(property: unknown): string[] {
  const value = property as { relation?: Array<{ id?: string }> } | undefined;
  return (value?.relation ?? []).map((item) => item.id ?? "").filter(Boolean);
}

export function getCreated(property: unknown): string {
  const value = property as { created_time?: string } | undefined;
  return value?.created_time ?? "";
}
