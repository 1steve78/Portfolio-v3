import { getActivity } from "../github";
import LoadMore from "../components/LoadMore";

export const metadata = { title: "Open source — Yasin Alam" };
const date = (value: string) => new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const excludedRepos = new Set(["klick", "espektro-2026", "kiraya-backend", "credsaathi", "dev-events", "free-programming-books"]);
const isExcluded = (repositoryUrl: string) => {
  const repo = repositoryUrl.split("/repos/")[1]?.split("/")[1];
  return repo ? excludedRepos.has(repo.toLowerCase()) : false;
};

export default async function OpenSourcePage() {
  const [prs, issues] = await Promise.all([getActivity("pr").catch(() => null), getActivity("issue").catch(() => null)]);
  const unavailable = prs === null || issues === null;
  const visiblePrs = (prs || []).filter(item => !isExcluded(item.repository_url));
  const visibleIssues = (issues || []).filter(item => !isExcluded(item.repository_url));
  const items = [...visiblePrs, ...visibleIssues].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
  return <main className="directory-page">
    <section className="directory-hero col"><p className="directory-kicker">COMMUNITY · COLLABORATION</p><h1>Open source<span>.</span></h1>
      <p>Pull requests and issues I’ve opened across GitHub, gathered from my public activity.</p>
      <div className="activity-stats"><span><b>{prs === null ? "—" : visiblePrs.length}</b> pull requests</span><span><b>{issues === null ? "—" : visibleIssues.length}</b> issues</span></div>
    </section>
    <section aria-label="GitHub issues and pull requests">
      {unavailable && <div className="directory-empty col">GitHub activity is temporarily unavailable. <a href="https://github.com/1steve78">Open GitHub profile ↗</a></div>}
      {!unavailable && items.length === 0 && <div className="directory-empty col">No public issues or pull requests found yet.</div>}
      {!unavailable && items.length > 0 && <LoadMore className="activity-list col" items={items.map(item => { const isPr = Boolean(item.pull_request); const repo = item.repository_url.split("/repos/")[1]; return <article className="activity-row" key={item.id}>
        <span className={`activity-type ${isPr ? "pr" : "issue"}`}>{isPr ? "↗ PR" : "◎ ISSUE"}</span>
        <div className="activity-main"><h2><a href={item.html_url} target="_blank" rel="noreferrer">{item.title} ↗</a></h2><p>{repo} · {date(item.created_at)}</p></div>
        <span className="activity-state">{item.pull_request?.merged_at ? "MERGED" : item.state.toUpperCase()}</span>
      </article>; })} />}
    </section>
    <footer className="directory-footer col">MD YASIN ALAM <span>•</span> KANKINARA, WEST BENGAL</footer>
  </main>;
}
