// src/app/api/modify-html/route.ts

import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: NextRequest) {
  const { url, instructions } = await req.json();

  if (!url || !instructions) {
    console.error("Invalid URL or instructions");
    return NextResponse.json(
      { error: "Invalid URL or instructions" },
      { status: 400 }
    );
  }

  try {
    console.log("Fetching HTML from URL:", url);
    const response = await fetch(url);
    const html = await response.text();
    console.log("Fetched HTML:", html);

    console.log("Generating modified HTML with OpenAI");
    const { text: modifiedHtml } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: `Modify the following HTML content based on these instructions: ${instructions}\n\nHTML content:\n${html}`,
    });

    console.log("Modified HTML:", modifiedHtml);
    return NextResponse.json({ modifiedHtml });
  } catch (error) {
    console.error("Error modifying HTML:", error);
    return NextResponse.json(
      { error: "Failed to modify the HTML" },
      { status: 500 }
    );
  }
}
