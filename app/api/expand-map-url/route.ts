import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
    });

    return NextResponse.json({ expandedUrl: response.url });
  } catch (err) {
    console.error("Error expanding map URL:", err);
    return NextResponse.json({ error: "Expansion failed" }, { status: 500 });
  }
}
