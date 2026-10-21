"use client";

import { useState, useEffect } from "react";
import Heatmap from "./components/Heatmap";
import SkillsSection from "./components/SkillsSection";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
    </svg>
  );
}

function Portrait() {
  return (
    <div className="portrait-wrap">
      <div className="portrait-sun" />
      <div className="portrait-circle">
        <img className="portrait-svg" src="/profile-pic.png" alt="Yasin Alam" />
      </div>
      <div className="petal p1"/>
      <div className="petal p2"/>
      <div className="petal p3"/>
    </div>
  );
}

/* Middle section using the user's uploaded panorama illustration */
function SkylineDivider() {
  return (
    <div className="skyline-wrap" aria-hidden>
      <img
        src="/middle-skyline.png"
        alt="Kolkata Panorama with Howrah Bridge and Hooghly River"
        className="skyline-img"
      />
    </div>
  );
}

function ReedsScene() {
  const xs = [18,35,52,68,84,100,116,132,148,164,180,196];
  return (
    <svg className="reeds-svg" viewBox="0 0 220 300" preserveAspectRatio="xMinYMax meet" aria-hidden>
      <g strokeLinecap="round">
        {xs.map((x, i) => (
          <g key={i}>
            <path
              d={`M${x} 300 Q${x + (i % 2 === 0 ? 8 : -8)} ${175 + (i % 3) * 10} ${x + (i % 3 === 0 ? 4 : -4)} ${90 + i * 6}`}
              stroke={i % 4 === 0 ? "#7a796a" : "#6e6d5e"}
              strokeWidth={i % 3 === 0 ? 2 : 1.6}
              fill="none"
            />
            <ellipse
              cx={x + (i % 3 === 0 ? 4 : -4)}
              cy={85 + i * 6}
              rx="4.5" ry="10"
              fill={i % 2 === 0 ? "#908e7e" : "#7a7968"}
              opacity="0.78"
            />
          </g>
        ))}
        <path d="M0 260 Q110 250 220 260" stroke="#9a9888" strokeWidth="0.8" opacity="0.4" fill="none"/>
        <path d="M0 275 Q110 268 220 275" stroke="#9a9888" strokeWidth="0.6" opacity="0.3" fill="none"/>
      </g>
    </svg>
  );
}

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const searchItems = [
    { label: "Rozgaar.ai — AI Job Matching Platform", category: "Project", href: "#shipping" },
    { label: "MediScan-Ai — Medical Diagnostics", category: "Project", href: "#shipping" },
    { label: "PujoJatra — Durga Puja Route Planner", category: "Project", href: "#shipping" },
    { label: "GitHub Contributions & Open Source", category: "Shipping", href: "#shipping" },
    { label: "Technical Skills & Engineering Disciplines", category: "Skills", href: "#skills" },
    { label: "About Yasin Alam", category: "Profile", href: "#home" },
    { label: "Get in Touch / Contact", category: "Contact", href: "#contact" },
  ];

  const filteredItems = searchQuery.trim() === ""
    ? searchItems
    : searchItems.filter((it) => it.label.toLowerCase().includes(searchQuery.toLowerCase()));

  const blossoms: [number,number,number,string][] = [
    [192,26,5.2,"#c0392b"],[180,40,4.8,"#d44e3a"],[167,54,5.0,"#b83229"],
    [155,68,4.2,"#c73428"],[144,86,4.6,"#d44e3a"],[202,108,4.0,"#b83229"],
    [188,120,3.8,"#c0392b"],[165,135,4.2,"#d44e3a"],[175,50,4.0,"#c0392b"],
    [197,63,3.4,"#d44e3a"],[213,36,4.2,"#b83229"],[158,40,5.0,"#c73428"],
    [185,93,4.2,"#d44e3a"],[205,78,3.6,"#b83229"],[168,76,4.0,"#c0392b"],
  ];

  return (
    <main>
      {/* Blossom branch — Pure SVG decorative corner piece */}
      <div className="blossom-wrap" aria-hidden>
        <svg viewBox="0 0 290 280" className="blossom-svg">
          <g stroke="#3d2e1e" fill="none" strokeWidth="2.8" strokeLinecap="round">
            <path d="M290 0 Q228 38 185 80 Q155 112 172 155"/>
            <path d="M228 38 Q208 18 190 34"/>
            <path d="M198 65 Q178 46 162 58"/>
            <path d="M180 98 Q160 80 148 96"/>
            <path d="M174 124 Q190 104 206 115"/>
            <path d="M175 146 Q157 134 150 152"/>
          </g>
          <g fill="#3d5e2a" opacity="0.78">
            <ellipse cx="188" cy="32" rx="14" ry="6" transform="rotate(-38 188 32)"/>
            <ellipse cx="162" cy="55" rx="12" ry="5" transform="rotate(-58 162 55)"/>
            <ellipse cx="150" cy="93" rx="13" ry="5" transform="rotate(22 150 93)"/>
            <ellipse cx="202" cy="112" rx="11" ry="5" transform="rotate(-18 202 112)"/>
          </g>
          {blossoms.map(([cx,cy,r,color],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill={color} opacity="0.88"/>
              <circle cx={cx} cy={cy} r={r*0.32} fill="#fff5f5" opacity="0.55"/>
            </g>
          ))}
          {([[238,135],[258,162],[220,180]] as [number,number][]).map(([x,y],i) => (
            <ellipse key={i} cx={x} cy={y} rx="5.5" ry="3" fill="#b83229" opacity="0.48"
              transform={`rotate(${18+i*32} ${x} ${y})`}/>
          ))}
        </svg>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="hero" id="home">
        <div className="col">
          {/* Quote | Portrait | Heart — balanced three-column row */}
          <div className="hero-row">
            <div className="hero-quote">
              &#x201C;&#x09A8;&#x09A6;&#x09C0;, &#x09AE;&#x09BE;&#x09A8;&#x09C1;&#x09B7;, &#x0997;&#x09B2;&#x09CD;&#x09AA; &#x2014;<br/>
              &#x098F;&#x0987; &#x09A4;&#x09CB; &#x0986;&#x09AE;&#x09BE;&#x09B0; &#x09AC;&#x09BE;&#x0982;&#x09B2;&#x09BE;!&#x201D;
              <em/>
            </div>

            <Portrait/>

            <div className="hero-heart">
              KOLKATA<br/><span>IN MY HEART</span>
            </div>
          </div>

          {/* Name + bio */}
          <div className="intro">
            <h1>MD Yasin Alam</h1>
            <p className="eyebrow">
              SOFTWARE ENGINEER <b>&#x2022;</b> KANKINARA, WEST BENGAL <b>&#x2022;</b> 2ND YEAR, KGEC
            </p>
            <p className="bio">
              I build digital products, explore new technologies, and try to create<br/>
              meaningful impact &#x2014; inspired by the culture, people and stories of Bengal.<br/>
              I care about clean design, good engineering, and solving real problems.<br/>
              For this site, <strong>I measured the ideas before picking the tools.</strong>
            </p>
            <div className="actions">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mdyalam547%40gmail.com" target="_blank" rel="noreferrer" className="btn-primary"><SendIcon/> Get in touch</a>
              <a href="https://drive.google.com/file/d/1qs0v4ChHF9JtvMQqwEqsyUcCPsaxj5mj/view?usp=sharing" target="_blank" rel="noreferrer" className="btn-resume"><FileIcon/>&nbsp; R&#xe9;sum&#xe9;</a>
            </div>
            <div className="socials">
              <a href="https://github.com/1steve78" target="_blank" rel="noopener noreferrer" className="social-link">
                <GithubIcon/> GitHub
              </a>
              <a href="https://www.linkedin.com/in/md-yasin-alam-895039267/?isSelfProfile=true" target="_blank" rel="noopener noreferrer" className="social-link">
                <LinkedinIcon/> LinkedIn
              </a>
              <a href="https://x.com/MdYasin565726" target="_blank" rel="noopener noreferrer" className="social-link">
                <TwitterIcon/> Twitter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SKYLINE (New illustration image from public) ═══ */}
      <SkylineDivider/>

      {/* ═══ SHIPPING (Live GitHub Heatmap) ═══ */}
      <Heatmap/>

      {/* ═══ SKILLS (Japanese-Bengali Theme) ═══ */}
      <SkillsSection/>

      {/* ═══ CURRENTLY ═══ */}
      <section className="currently col" id="currently">
        <div className="currently-left">
          <h2>Currently</h2>
          <div className="section-rule rule-left"/>
          <div className="timeline">
            <div className="timeline-bar"><span/></div>
            <ul className="timeline-items">
              <li>Learning DSA and System Design</li>
              <li>Building projects (Rozgaar.ai, MediScan-Ai, PujoJatra)</li>
              <li>Exploring ML and open source</li>
              <li>Preparing for GATE and future opportunities</li>
            </ul>
          </div>
        </div>
        <aside className="currently-aside">
          <blockquote>
            &#x201C;&#x0986;&#x09B0; &#x09AD;&#x09BE;&#x09B2;&#x09CB; &#x0995;&#x09BF;&#x099B;&#x09C1; &#x0995;&#x09B0;&#x09BE;&#x09B0;<br/>
            &#x0987;&#x099A;&#x09CD;&#x099B;&#x09C7; &#x09B0;&#x09AC;&#x09C7;&#x2026;&#x201D;
          </blockquote>
          <cite>&#x2014; &#x099C;&#x09C0;&#x09AC;&#x09A8;&#x09BE;&#x09A8;&#x09A8;&#x09CD;&#x09A6; &#x09A6;&#x09BE;&#x09B6;</cite>
          <em/>
          <small>PEOPLE &nbsp;&#x2022;&nbsp; PLACES &nbsp;&#x2022;&nbsp; IDEAS<br/>A KINDER TOMORROW</small>
        </aside>
        <div className="reeds-wrap" aria-hidden><ReedsScene/></div>
        <div className="mist" aria-hidden/>
      </section>

      {/* ═══ FOOTER (Simple, Minimal Japanese-Bengali Theme) ═══ */}
      <footer className="footer" id="contact">
        <div className="footer-ink-divider" aria-hidden>
          <svg viewBox="0 0 720 20" preserveAspectRatio="none">
            <path d="M0 10 Q180 8 360 10 Q540 12 720 10" stroke="#d5cebe" strokeWidth="1" fill="none" opacity="0.6"/>
            <circle cx="360" cy="10" r="3" fill="#b93c29"/>
          </svg>
        </div>

        <div className="col footer-inner">
          {/* Hanko red artist seal */}
          <div className="hanko-seal" title="আলম (Alam)">
            <span>&#x0986;&#x09B2;&#x09AE;</span>
          </div>

          <p className="footer-subhead">ROOTED IN BENGAL &#x2022; CRAFTED WITH CARE</p>

          <h2 className="footer-title">
            Let&#x2019;s create together<i>.</i>
          </h2>

          <p className="footer-desc">
            Whether it&#x2019;s a project idea, open-source work, or just a quiet conversation
            about tech and Bengal &#x2014; my inbox is always open.
          </p>

          <div className="footer-actions">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mdyalam547%40gmail.com" target="_blank" rel="noreferrer" className="btn-primary footer-btn">
              <SendIcon/> Write an email
            </a>
            <a href="https://github.com/1steve78" target="_blank" rel="noopener noreferrer" className="btn-resume footer-btn">
              <GithubIcon/> Explore GitHub
            </a>
          </div>

          <div className="footer-zen-line" aria-hidden/>

          <div className="footer-nav-row">
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#shipping">Shipping</a>
              <a href="#skills">Skills</a>
              <a href="#currently">Currently</a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mdyalam547%40gmail.com" target="_blank" rel="noreferrer">Contact</a>
            </div>

            <div className="footer-social-pills">
              <a href="https://github.com/1steve78" target="_blank" rel="noopener noreferrer">GitHub</a>
              <span>&#x2022;</span>
              <a href="https://www.linkedin.com/in/md-yasin-alam-895039267/?isSelfProfile=true" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span>&#x2022;</span>
              <a href="https://x.com/MdYasin565726" target="_blank" rel="noopener noreferrer">Twitter / X</a>
            </div>
          </div>

          <div className="footer-quote-wrap">
            <p className="footer-quote-bengali">
              &#x201C;&#x09AF;&#x09C7;&#x0996;&#x09BE;&#x09A8;&#x09C7; &#x09AE;&#x09BE;&#x099F;&#x09BF;, &#x09B8;&#x09C7;&#x0996;&#x09BE;&#x09A8;&#x09C7;&#x0987; &#x0986;&#x09AE;&#x09BE;&#x09B0; &#x09B8;&#x09CD;&#x09AC;&#x09AA;&#x09CD;&#x09A8;&#x0964;&#x201D;
            </p>
            <span className="footer-quote-author">&#x2014; &#x099C;&#x09C0;&#x09AC;&#x09A8;&#x09BE;&#x09A8;&#x09A8;&#x09CD;&#x09A6; &#x09A6;&#x09BE;&#x09B6;</span>
          </div>

          <div className="footer-bottom-bar">
            <span>&#169; 2025 MD YASIN ALAM</span>
            <div className="footer-zen-dots" aria-hidden>
              <span/>
              <span/>
              <span/>
            </div>
            <span>KANKINARA, WB &#x2022; 22.89&#176; N, 88.42&#176; E</span>
          </div>
        </div>
      </footer>

      {/* ═══ COMMAND PALETTE / SEARCH MODAL ═══ */}
      {searchOpen && (
        <div className="search-backdrop" onClick={() => setSearchOpen(false)}>
          <div className="search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="search-input-wrap">
              <span className="search-icon">&#x2315;</span>
              <input
                type="text"
                autoFocus
                placeholder="Search projects, sections, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button
                type="button"
                className="search-close"
                onClick={() => setSearchOpen(false)}
              >
                esc
              </button>
            </div>
            <div className="search-results">
              {filteredItems.length === 0 ? (
                <div className="search-empty">No results found for &ldquo;{searchQuery}&rdquo;</div>
              ) : (
                filteredItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="search-item"
                    onClick={() => setSearchOpen(false)}
                  >
                    <span className="search-item-label">{item.label}</span>
                    <span className="search-item-cat">{item.category}</span>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
