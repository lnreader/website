import "server-only";

const GITHUB_RELEASES_API =
  "https://api.github.com/repos/LNReader/lnreader/releases";

export interface GitHubRelease {
  readonly id: number;
  readonly name: string;
  readonly publishedAt: string;
  readonly tagName: string;
  readonly anchor: string;
  readonly assets: ReadonlyArray<{
    readonly label: string;
    readonly url: string;
  }>;
  readonly notes: string;
}

interface GitHubReleaseResponse {
  readonly id: number;
  readonly name: string;
  readonly tag_name: string;
  readonly published_at: string;
  readonly body: string;
  readonly prerelease: boolean;
  readonly assets: ReadonlyArray<{
    readonly browser_download_url: string;
    readonly name: string;
  }>;
}

export async function fetchReleases(): Promise<{
  releases: GitHubRelease[];
  updatedAt: string | null;
}> {
  const response = await fetch(GITHUB_RELEASES_API, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    next: {
      revalidate: 60 * 15,
    },
  });

  if (!response.ok) {
    return { releases: [], updatedAt: null };
  }

  const json = (await response.json()) as GitHubReleaseResponse[];

  const releases = json.map((release) => ({
    id: release.id,
    name: release.name,
    tagName: release.tag_name,
    anchor: `release-${release.tag_name}`.replace(/[^a-zA-Z0-9-_]/gu, "-"),
    publishedAt: formatDate(release.published_at),
    assets: release.assets.map((asset) => ({
      label: asset.name,
      url: asset.browser_download_url,
    })),
    notes: release.body,
  }));

  const updatedAt = releases[0]?.publishedAt ?? null;

  return { releases, updatedAt };
}

function formatDate(value: string): string {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
