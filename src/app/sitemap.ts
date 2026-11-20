import type { MetadataRoute } from "next";
import { series } from "@/lib/journal";
import { journalEnabled } from "@/lib/features";
import { siteUrl as base } from "@/utils/constants";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!journalEnabled) return [{ url: base, priority: 1 }];
  return [
    { url: base, priority: 1 },
    { url: base + "/blog" },
    ...series.flatMap((s) => [
      { url: base + "/blog/series/" + s.slug },
      ...s.posts.map((p) => ({
        url: base + "/blog/" + p.slug.current,
        lastModified: new Date(p.publishedAt),
      })),
    ]),
  ];
}
