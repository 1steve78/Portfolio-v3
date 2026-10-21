"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SiteNav() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme") === "dark";
    setDark(saved);
    document.body.classList.toggle("dark-theme", saved);
  }, []);
  return <header className="site-nav col">
    <Link className="brand" href="/" aria-label="Yasin Alam — Home"><b>&#x09AA;&#x09BE;&#x09A0;&#x09B6;&#x09BE;&#x09B2;&#x09BE;</b><i/><span>ROOTED IN BENGAL</span></Link>
    <nav aria-label="Main navigation">
      <Link className={pathname === "/" ? "nav-active" : ""} href="/">Profile</Link>
      <Link className={pathname === "/opensource" ? "nav-active" : ""} href="/opensource">Open source</Link>
      <Link className={pathname === "/projects" ? "nav-active" : ""} href="/projects">Projects</Link>
      <button type="button" className="moon-btn" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => { const next = !dark; setDark(next); window.localStorage.setItem("portfolio-theme", next ? "dark" : "light"); document.body.classList.toggle("dark-theme", next); }}>{dark ? "☼" : "☾"}</button>
    </nav>
  </header>;
}
