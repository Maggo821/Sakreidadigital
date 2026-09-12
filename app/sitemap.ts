import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/ratgeber";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sakreida.digital";

  const staticEntries: MetadataRoute.Sitemap = [
    "",
    "/loesungen",
    "/ratgeber",
    "/termin",
    "/kontakt",
    "/impressum",
    "/datenschutz",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.5,
  }));

  const articleEntries: MetadataRoute.Sitemap = getArticles().map((article) => ({
    url: `${baseUrl}/ratgeber/${article.slug}`,
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
