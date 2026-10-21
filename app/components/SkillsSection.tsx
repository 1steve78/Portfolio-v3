"use client";

interface SkillItem {
  name: string;
  featured?: boolean;
}

interface SkillCategory {
  id: string;
  bengali: string;
  kanji: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    bengali: "\u09AC\u09C1\u09A6\u09CD\u09A7\u09BF\u09AE\u09A4\u09CD\u09A4\u09BE",
    kanji: "\u667A",
    title: "AI & Agentic Systems",
    subtitle: "Autonomous agents, custom RAG pipelines, and multi-model workflows.",
    skills: [
      { name: "LangChain", featured: true },
      { name: "LangGraph", featured: true },
      { name: "LLM Orchestration", featured: true },
      { name: "RAG Pipelines", featured: true },
      { name: "Groq & Mistral" },
      { name: "OpenRouter" },
      { name: "Agent Tooling" },
      { name: "Python" },
      { name: "Prompt Architecture" }
    ]
  },
  {
    id: "frontend",
    bengali: "\u09AC\u09BF\u0995\u09BE\u09B6",
    kanji: "\u5275",
    title: "Frontend & Interfaces",
    subtitle: "Tactile, minimal, responsive interfaces crafted with deliberate care.",
    skills: [
      { name: "Next.js (App Router)", featured: true },
      { name: "React", featured: true },
      { name: "TypeScript", featured: true },
      { name: "Tailwind CSS", featured: true },
      { name: "State & Hooks" },
      { name: "Component Architecture" },
      { name: "Responsive UI/UX" },
      { name: "Design Systems" }
    ]
  },
  {
    id: "backend",
    bengali: "\u09AA\u09B0\u09BF\u0995\u09BE\u09A0\u09BE\u09AE\u09CB",
    kanji: "\u69CB",
    title: "Backend & Systems",
    subtitle: "Resilient APIs, relational schemas, and structured data layers.",
    skills: [
      { name: "Node.js", featured: true },
      { name: "PostgreSQL", featured: true },
      { name: "Prisma ORM", featured: true },
      { name: "RESTful APIs", featured: true },
      { name: "Supabase" },
      { name: "MongoDB" },
      { name: "Redis Caching" },
      { name: "JWT Auth" }
    ]
  },
  {
    id: "foundations",
    bengali: "\u09AD\u09BF\u09A4\u09CD\u09A4\u09BF",
    kanji: "\u57FA",
    title: "Foundations & Craft",
    subtitle: "Algorithmic depth, system fundamentals, and Unix craftsmanship.",
    skills: [
      { name: "C++", featured: true },
      { name: "DSA (Graphs, DP)", featured: true },
      { name: "Competitive Programming", featured: true },
      { name: "System Design" },
      { name: "Git & GitHub Workflows" },
      { name: "Linux / Bash" },
      { name: "OOP & Clean Architecture" }
    ]
  }
];

export default function SkillsSection() {
  return (
    <section className="skills col" id="skills">
      <div className="skills-header">
        <span className="section-bengali-kicker">&#x09A6;&#x0995;&#x09CD;&#x09B7;&#x09A4;&#x09BE; &nbsp;&#x2022;&nbsp; DISCIPLINES OF CRAFT</span>
        <h2>Skills</h2>
        <div className="section-rule" />
        <p className="skills-sub">
          A quiet mastery of modern engineering &#x2014; from autonomous agentic systems
          to resilient full-stack architecture.
        </p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((cat) => (
          <div className="skill-card" key={cat.id}>
            <div className="skill-card-top">
              <div className="skill-meta-left">
                <span className="skill-bengali-tag">{cat.bengali}</span>
                <h3 className="skill-card-title">{cat.title}</h3>
              </div>
              <span className="skill-kanji-watermark" aria-hidden="true">
                {cat.kanji}
              </span>
            </div>

            <p className="skill-card-desc">{cat.subtitle}</p>

            <div className="skill-tags">
              {cat.skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`skill-tag ${skill.featured ? "skill-tag-featured" : ""}`}
                >
                  {skill.featured && <i className="skill-dot" aria-hidden="true" />}
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="skills-zen-bar" aria-hidden="true">
        <span className="zen-symbol">&#x25EF;</span>
        <span className="zen-text">&#x201C;&#x09B8;&#x09B9;&#x099C; &#x0995;&#x09A5;&#x09BE; &#x09A0;&#x09BF;&#x0995; &#x09AE;&#x09A4;&#x09CB; &#x09AC;&#x09B2;&#x09BE; &#x09B8;&#x09AC;&#x099A;&#x09C7;&#x09AF;&#x09BC;&#x09C7; &#x0995;&#x09A0;&#x09BF;&#x09A8;&#x201D; &nbsp;&#x2014;&nbsp; SIMPLICITY IS THE HIGHEST FORM OF MASTERY</span>
      </div>
    </section>
  );
}
