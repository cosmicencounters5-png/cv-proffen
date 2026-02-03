import { NextResponse } from "next/server";

export function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://cv-proffen.no/sitemap-main.xml
`.trim();

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}