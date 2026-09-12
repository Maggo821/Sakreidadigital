import fs from "node:fs";
import path from "node:path";

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "ratgeber");

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator > 0) {
      data[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
    }
  }
  return { data, body: raw.slice(match[0].length).trim() };
}

export function getArticles(): Article[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? file,
        description: data.description ?? "",
        date: data.date ?? "",
        keywords: data.keywords ? data.keywords.split(",").map((keyword) => keyword.trim()) : [],
        body,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}

export function formatArticleDate(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
}
