import { NextResponse } from "next/server";
import { fallbackContributions } from "./fallbackData";

export const revalidate = 3600; // Cache for 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "1steve78";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "portfolio-github,heatmap"
      },
      next: { revalidate: 3600 },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const total =
        data.total?.lastYear ??
        data.contributions?.reduce((sum: number, c: { count?: number }) => sum + (c.count || 0), 0) ??
        0;

      return NextResponse.json({
        total,
        username,
        contributions: data.contributions || []
      });
    }
  } catch (err) {
    console.warn("Could not fetch fresh GitHub contributions, using fallback data:", err);
  }

  // Fallback if network fails or times out
  const fallbackTotal =
    fallbackContributions.total?.lastYear ??
    fallbackContributions.contributions?.reduce((sum: number, c: { count?: number }) => sum + (c.count || 0), 0) ??
    0;

  return NextResponse.json({
    total: fallbackTotal,
    username,
    contributions: fallbackContributions.contributions || []
  });
}
