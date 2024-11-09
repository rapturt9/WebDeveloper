// src/app/api/fetch-html/route.ts

import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    return new NextResponse(html, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the HTML" },
      { status: 500 }
    );
  }
}
