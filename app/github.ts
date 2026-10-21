const API = "https://api.github.com";
const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-v3" };

export type Repo = {
  id: number; name: string; full_name: string; description: string | null; html_url: string;
  homepage: string | null; language: string | null; stargazers_count: number; fork: boolean;
  updated_at: string; topics?: string[];
};
export type Activity = {
  id: number; title: string; html_url: string; state: string; created_at: string;
  repository_url: string; pull_request?: { html_url: string; merged_at?: string | null };
};

async function github<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getRepos(): Promise<Repo[]> {
  const repos = await github<Repo[]>("/users/1steve78/repos?per_page=100&sort=updated&type=owner");
  return repos.sort((a, b) => b.stargazers_count - a.stargazers_count || Date.parse(b.updated_at) - Date.parse(a.updated_at));
}

export async function getActivity(kind: "pr" | "issue"): Promise<Activity[]> {
  const data = await github<{ items: Activity[] }>(`/search/issues?q=author%3A1steve78+type%3A${kind}&sort=created&order=desc&per_page=100`);
  return data.items;
}
