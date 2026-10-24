export async function GET() {
  try {
    const response = await fetch("https://api.github.com/repos/LNReader/lnreader", {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) throw new Error("GitHub repository unavailable");

    const repository = await response.json();
    const stars: unknown = repository.stargazers_count;
    if (typeof stars !== "number" || !Number.isInteger(stars) || stars < 0) {
      throw new Error("Invalid GitHub star count");
    }

    return Response.json(
      { stars },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return Response.json({ stars: null }, { status: 503 });
  }
}
