import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const LAST_MODIFIED = new Date("2026-10-20");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/pasfoto", priority: 0.9, changeFrequency: "monthly" },
    { path: "/anime", priority: 0.9, changeFrequency: "monthly" },
    { path: "/kebijakan-privasi", priority: 0.3, changeFrequency: "yearly" },
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
