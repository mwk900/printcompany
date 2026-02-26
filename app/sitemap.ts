import type { MetadataRoute } from "next";
import { services, siteConfig } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{
    route: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { route: "", changeFrequency: "weekly", priority: 1 },
    { route: "/services", changeFrequency: "monthly", priority: 0.8 },
    { route: "/work", changeFrequency: "monthly", priority: 0.8 },
    { route: "/file-setup", changeFrequency: "monthly", priority: 0.8 },
    { route: "/about", changeFrequency: "monthly", priority: 0.8 },
    { route: "/contact", changeFrequency: "monthly", priority: 0.8 },
  ];

  const pages = staticRoutes.map((item) => ({
    url: `${siteConfig.siteUrl}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const servicePages = services.map((service) => ({
    url: `${siteConfig.siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...servicePages];
}
