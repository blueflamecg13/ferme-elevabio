import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const entries = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/races", priority: "0.9", changefreq: "monthly" },
  { path: "/commande", priority: "0.9", changefreq: "monthly" },
  { path: "/formation", priority: "0.8", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
