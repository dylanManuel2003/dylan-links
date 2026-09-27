import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";

export const runtime = "nodejs";

const VALID = new Set(["view", "click"]);

export async function POST(req: Request) {
  if (!process.env.DATABASE_URL) return new NextResponse(null, { status: 204 });

  let type: string | undefined;
  let link: string | undefined;
  try {
    const data = await req.json();
    type = data?.type;
    link = data?.link;
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (!type || !VALID.has(type)) return new NextResponse(null, { status: 400 });

  const h = req.headers;
  const referrer = h.get("referer")?.slice(0, 512) ?? null;
  const country = h.get("x-vercel-ip-country")?.slice(0, 8) ?? null;

  try {
    await db.insert(schema.events).values({
      type,
      link: type === "click" ? link?.slice(0, 64) ?? null : null,
      referrer,
      country,
    });
  } catch {
    // no romper aunque falle la DB
  }

  return new NextResponse(null, { status: 204 });
}
