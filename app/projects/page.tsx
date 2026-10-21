import { getRepos } from "../github";
import LoadMore from "../components/LoadMore";

export const metadata = { title: "Projects — Yasin Alam" };

export default async function ProjectsPage() {
  let repos = [];
  let failed = false;
  try {
    repos = (await getRepos()).filter(repo => !repo.fork);
  } catch {
    failed = true;
  }
  return <main className="directory-page">
    <section className="directory-hero col"><p className="directory-kicker">BUILT IN PUBLIC · GITHUB</p><h1>Projects<span>.</span></h1>
      <p>Things I’ve made, explored, and shipped. Repository details stay in sync with GitHub.</p>
      <a className="directory-github" href="https://github.com/1steve78" target="_blank" rel="noreferrer">View GitHub profile ↗</a>
    </section>
    <section aria-label="GitHub projects">
      {failed ? <div className="directory-empty col">Couldn’t load repositories right now. <a href="https://github.com/1steve78?tab=repositories">Browse them on GitHub ↗</a></div> : <LoadMore className="directory-grid col" items={repos.map((repo, i) => <article className="directory-card" key={repo.id}>
        <div className="card-topline"><span>PROJECT / {String(i + 1).padStart(2, "0")}</span><span>★ {repo.stargazers_count}</span></div>
        <h2><a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name} ↗</a></h2>
        <p>{repo.description || "A project from my GitHub workspace."}</p>
        <div className="card-meta">{repo.fork && <span>Fork</span>}{repo.language && <span>{repo.language}</span>}{repo.topics?.slice(0, 3).map(t => <span key={t}>{t}</span>)}{repo.homepage && <a href={repo.homepage} target="_blank" rel="noreferrer">Live site ↗</a>}</div>
      </article>)} />}
    </section>
    <footer className="directory-footer col">MD YASIN ALAM <span>•</span> KANKINARA, WEST BENGAL</footer>
  </main>;
}
