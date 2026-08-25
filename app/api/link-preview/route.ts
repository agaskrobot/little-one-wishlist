import { NextRequest, NextResponse } from "next/server";
import { fetchLinkPreview } from "@/lib/link-preview";
import { getWishlistByEditToken } from "@/lib/wishlist";
import { isValidUrl } from "@/lib/validation";

export const maxDuration = 10;

export async function GET(request: NextRequest) {
  const editToken = request.nextUrl.searchParams.get("editToken") ?? "";
  const url = request.nextUrl.searchParams.get("url") ?? "";

  if (!editToken || !(await getWishlistByEditToken(editToken))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "invalid_url" }, { status: 400 });
  }

  try {
    const preview = await fetchLinkPreview(url);
    return NextResponse.json(preview);
  } catch (error) {
    console.error("[little-one-wishlist] link-preview failed:", error);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}
