import { NextResponse } from "next/server";

export async function GET() {
  const urls = [
    {
      loc: "https://cv-proffen.no/",
      priority: "1.0",
      changefreq: "weekly",
    },
    {
      loc: "https://cv-proffen.no/lage-cv",
      priority: "0.9",
      changefreq: "monthly",
    },
    {
      loc: "https://cv-proffen.no/jobbsoknad",
      priority: "0.9",
      changefreq: "monthly",
    },
    {
      loc: "https://cv-proffen.no/cv-offentlig-sektor",
      priority: "0.8",
      changefreq: "monthly",
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}