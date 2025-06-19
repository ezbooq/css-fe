import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
    });

    return NextResponse.json({ expandedUrl: res.url });
  } catch (error) {
    console.error("Failed to expand map URL:", error);
    return NextResponse.json(
      { error: "Failed to expand URL" },
      { status: 500 }
    );
  }
}
