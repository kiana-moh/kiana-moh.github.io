// File: src/app/page.tsx
// Theme: dark, cinematic index-card carousel with gradient headings.

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const PROFILE = {
  name: "Kiana Mohammadi",
  subtitle: "Software Engineering @ UWaterloo",
  email: "kianaa.m07@gmail.com",
};

type Project = {
  title: string;
  category?: string;
  tagline: string;
  description?: string;
  chips: string[];
  theme: {
    card: string;
    text: string;
    chip: string;
    accent: string;
  };
  links?: { label: string; href: string; github?: string };
};

const PROJECTS: Project[] = [
  {
    title: "Momentum",
    category: "Full-stack",
    tagline: "Workout tracking with clean data models and strong auth.",
    description:
      "Full-stack workout tracking app with a FastAPI backend (auth + protected routes + REST APIs) and a PostgreSQL/SQLAlchemy data model for users, workouts, sessions, and exercises.",
    chips: ["FastAPI", "PostgreSQL", "SQLAlchemy", "REST APIs", "Auth", "TypeScript"],
    theme: {
      card:
        "linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.98) 45%, rgba(2,6,23,0.98) 100%)",
      text: "linear-gradient(90deg, #e2e8f0 0%, #a5b4fc 55%, #38bdf8 100%)",
      chip: "linear-gradient(120deg, rgba(59,130,246,0.25), rgba(14,165,233,0.22))",
      accent: "#93c5fd",
    },
    links: { label: "View project", href: "#", github: "https://github.com/kiana-moh" },
  },
  {
    title: "Market Return Analyzer",
    category: "Data Analytics",
    tagline: "Market risk metrics from historical price data.",
    description:
      "Python tool that computes daily returns, volatility, and return distributions from historical price data to analyze market risk and behavior.",
    chips: ["Python", "pandas", "NumPy", "Time-series", "Risk analytics"],
    theme: {
      card:
        "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,64,175,0.8) 50%, rgba(2,6,23,0.98) 100%)",
      text: "linear-gradient(90deg, #e2e8f0 0%, #60a5fa 55%, #38bdf8 100%)",
      chip: "linear-gradient(120deg, rgba(59,130,246,0.25), rgba(14,165,233,0.22))",
      accent: "#60a5fa",
    },
    links: { label: "View project", href: "#", github: "https://github.com/kiana-moh" },
  },
  {
    title: "UWay",
    category: "Full-stack",
    tagline: "Campus route-planning with auto-generated class navigation.",
    description:
      "Route-planning app that builds a campus path graph (including tunnels) from GeoJSON, runs Dijkstra with haversine distances for shortest routes, and imports Quest schedules to auto-generate between-class navigation.",
    chips: [
      "Python",
      "Flask (+CORS)",
      "GeoJSON",
      "Dijkstra (heapq)",
      "Haversine distance",
      "Regex schedule parser",
      "JSON storage",
      "REST API",
    ],
    theme: {
      card:
        "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(6,78,59,0.8) 45%, rgba(2,6,23,0.98) 100%)",
      text: "linear-gradient(90deg, #e2e8f0 0%, #34d399 55%, #60a5fa 100%)",
      chip: "linear-gradient(120deg, rgba(16,185,129,0.25), rgba(59,130,246,0.22))",
      accent: "#34d399",
    },
    links: { label: "View project", href: "#", github: "https://github.com/kiana-moh" },
  },
  {
    title: "Weather Forecasting",
    category: "Machine Learning",
    tagline: "Next-day temperature prediction with model benchmarks.",
    description:
      "End-to-end pipeline using hourly weather data to predict next-day temperature, benchmarking LSTM/1D-CNN models vs naive baselines with MAE/RMSE and error plots.",
    chips: ["PyTorch", "LSTM/1D-CNN", "MAE/RMSE", "Error plots", "Time-series"],
    theme: {
      card:
        "linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(76,29,149,0.75) 50%, rgba(2,6,23,0.98) 100%)",
      text: "linear-gradient(90deg, #f1f5f9 0%, #f472b6 55%, #fb7185 100%)",
      chip: "linear-gradient(120deg, rgba(244,63,94,0.24), rgba(168,85,247,0.24))",
      accent: "#f472b6",
    },
    links: { label: "View project", href: "#", github: "https://github.com/kiana-moh" },
  },
];

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

// Use native scroll snapping for stable section paging.

function ArrowLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="m10.5 5 1.4 1.4L7.3 11H20v2H7.3l4.6 4.6-1.4 1.4-7-7 7-7Z"
      />
    </svg>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 5 12.1 6.4 16.7 11H4v2h12.7l-4.6 4.6L13.5 19l7-7-7-7Z"
      />
    </svg>
  );
}

function IconGitHub({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5C5.73.5.75 5.62.75 12c0 5.09 3.29 9.4 7.86 10.93.58.11.79-.26.79-.57v-2.02c-3.2.7-3.87-1.58-3.87-1.58-.52-1.37-1.27-1.73-1.27-1.73-1.04-.73.08-.72.08-.72 1.15.08 1.75 1.23 1.75 1.23 1.02 1.8 2.67 1.28 3.32.98.1-.76.4-1.28.73-1.57-2.55-.3-5.23-1.32-5.23-5.9 0-1.3.44-2.36 1.16-3.2-.12-.3-.5-1.52.11-3.17 0 0 .95-.32 3.1 1.22.9-.26 1.86-.39 2.82-.4.96.01 1.92.14 2.82.4 2.15-1.54 3.1-1.22 3.1-1.22.61 1.65.23 2.87.11 3.17.72.84 1.16 1.9 1.16 3.2 0 4.6-2.69 5.6-5.25 5.89.41.37.78 1.1.78 2.23v3.31c0 .31.21.68.8.56A11.53 11.53 0 0 0 23.25 12C23.25 5.62 18.27.5 12 .5Z"
      />
    </svg>
  );
}

function IconLinkedIn({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5C3.6 3.5 2.5 4.62 2.5 6s1.1 2.5 2.48 2.5H5A2.5 2.5 0 0 0 7.5 6c0-1.38-1.12-2.5-2.52-2.5ZM3 21h4V9H3v12Zm6 0h4v-6.4c0-1.71.32-3.37 2.44-3.37 2.09 0 2.12 1.96 2.12 3.48V21h4v-7.1c0-3.49-.75-6.17-4.83-6.17-1.96 0-3.27 1.08-3.81 2.1h-.05V9H9v12Z"
      />
    </svg>
  );
}

function Chip({ children, theme }: { children: React.ReactNode; theme: Project["theme"] }) {
  return (
    <span
      className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-white/85 shadow-[0_12px_22px_rgba(15,23,42,0.35)]"
      style={{ backgroundImage: theme.chip }}
    >
      {children}
    </span>
  );
}

function ProjectCarousel({ projects }: { projects: Project[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = window.requestAnimationFrame(() => {
        const children = Array.from(el.children) as HTMLElement[];
        const center = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let min = Number.POSITIVE_INFINITY;
        children.forEach((child, idx) => {
          const childCenter = child.offsetLeft + child.offsetWidth / 2;
          const dist = Math.abs(center - childCenter);
          if (dist < min) {
            min = dist;
            closest = idx;
          }
        });
        setActiveIndex(closest);
      });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = (activeRef.current + 1) % projects.length;
      const scroller = scrollerRef.current;
      const target = cardRefs.current[next];
      if (scroller && target) {
        // perform horizontal-only smooth scroll to avoid triggering any
        // browser vertical scrolling behavior that `scrollIntoView` can cause
        const offset = target.offsetLeft - (scroller.clientWidth - target.clientWidth) / 2;
        scroller.scrollTo({ left: offset, behavior: "smooth" });
      }
    }, 12000);
    return () => window.clearInterval(id);
  }, [projects.length]);

  const scrollToIndex = (nextIndex: number) => {
    const scroller = scrollerRef.current;
    const target = cardRefs.current[nextIndex];
    if (!scroller || !target) return;
    const offset = target.offsetLeft - (scroller.clientWidth - target.clientWidth) / 2;
    scroller.scrollTo({ left: offset, behavior: "smooth" });
  };

  const active = projects[activeIndex] ?? projects[0];

  return (
    <section id="projects" className="h-screen snap-start snap-always scroll-mt-20 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-center gap-6 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
              Projects
            </p>
            <h2 className="mt-3 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: active.theme.text }}
              >
                Projects
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
              aria-label="Previous project"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(activeIndex + 1, projects.length - 1))}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/80 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
              aria-label="Next project"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div
          ref={scrollerRef}
          data-scroll-ignore="true"
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-visible scroll-smooth pb-12 pt-6"
          style={{
            paddingLeft: "calc((100vw - min(96vw, 980px)) / 2)",
            paddingRight: "calc((100vw - min(96vw, 980px)) / 2)",
          }}
        >
          {projects.map((p, i) => {
            const distance = Math.abs(i - activeIndex);
            return (
              <article
                key={p.title}
                className="snap-center shrink-0 w-[min(96vw,980px)]"
              >
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => {
                    if (i !== activeIndex) scrollToIndex(i);
                  }}
                  className={cn(
                    "relative h-[520px] cursor-pointer rounded-[36px] border border-white/10 p-8 transition-all duration-700",
                    distance === 0 &&
                      "opacity-100 scale-[1.02] brightness-110 shadow-[0_30px_80px_rgba(2,6,23,0.85)]",
                    distance === 1 &&
                      "opacity-60 scale-[0.94] brightness-75 shadow-[0_18px_50px_rgba(2,6,23,0.55)]",
                    distance > 1 &&
                      "opacity-35 scale-[0.9] brightness-60 shadow-[0_12px_35px_rgba(2,6,23,0.45)]"
                  )}
                  style={{ backgroundImage: p.theme.card }}
                >
                  <div className="absolute left-8 top-8 h-1.5 w-16 rounded-full bg-white/10" />
                  <div className="mt-6 flex h-full flex-col justify-between">
                    <div className="min-h-[280px]">
                      {p.category ? (
                        <span
                          className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-semibold"
                          style={{ color: p.theme.accent }}
                        >
                          {p.category}
                        </span>
                      ) : null}
                      <h3 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        <span
                          className="bg-clip-text text-transparent"
                          style={{ backgroundImage: p.theme.text }}
                        >
                          {p.title}
                        </span>
                      </h3>
                      <p className="mt-3 text-lg text-white/85">{p.tagline}</p>
                      {p.description ? (
                        <p className="mt-3 text-sm text-white/65">{p.description}</p>
                      ) : null}

                      {p.links ? (
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <a
                            href={p.links.href}
                              className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                            >
                              {p.links.label}
                              <ArrowRight className="h-4 w-4" />
                            </a>
                          {p.links.github ? (
                            <a
                              href={p.links.github}
                              target="_blank"
                              rel="noreferrer"
                                className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                              >
                                GitHub
                              </a>
                          ) : null}
                        </div>
                      ) : null}

                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.chips.map((c) => (
                          <Chip key={c} theme={p.theme}>
                            {c}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
                        {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const groups = useMemo(
    () => [
      {
        title: "Languages",
        items: ["Python", "SQL", "TypeScript", "JavaScript", "Java", "C", "C++"],
        theme: {
          card:
            "radial-gradient(120% 120% at 20% 20%, rgba(56,189,248,0.28), transparent 60%), radial-gradient(120% 120% at 85% 70%, rgba(99,102,241,0.22), transparent 55%), linear-gradient(180deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
          text: "linear-gradient(90deg, #f8fafc 0%, #93c5fd 55%, #38bdf8 100%)",
          accent: "#93c5fd",
        },
      },
      {
        title: "Frameworks & Libraries",
        items: ["React", "Next.js", "FastAPI", "pandas", "NumPy", "Matplotlib", "PyTorch"],
        theme: {
          card:
            "radial-gradient(120% 120% at 18% 22%, rgba(96,165,250,0.28), transparent 60%), radial-gradient(120% 120% at 82% 70%, rgba(56,189,248,0.22), transparent 55%), linear-gradient(180deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
          text: "linear-gradient(90deg, #f8fafc 0%, #60a5fa 55%, #38bdf8 100%)",
          accent: "#60a5fa",
        },
      },
      {
        title: "Databases & Platforms",
        items: ["PostgreSQL", "Supabase"],
        theme: {
          card:
            "radial-gradient(120% 120% at 20% 20%, rgba(167,139,250,0.28), transparent 60%), radial-gradient(120% 120% at 85% 70%, rgba(196,181,253,0.22), transparent 55%), linear-gradient(180deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
          text: "linear-gradient(90deg, #f8fafc 0%, #c4b5fd 55%, #a78bfa 100%)",
          accent: "#a78bfa",
        },
      },
      {
        title: "Data & ML",
        items: ["Time-Series Forecasting", "Feature Engineering", "Model Evaluation (MAE/RMSE)"],
        theme: {
          card:
            "radial-gradient(120% 120% at 20% 20%, rgba(244,114,182,0.28), transparent 60%), radial-gradient(120% 120% at 85% 70%, rgba(251,113,133,0.22), transparent 55%), linear-gradient(180deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
          text: "linear-gradient(90deg, #f8fafc 0%, #f472b6 55%, #fb7185 100%)",
          accent: "#f472b6",
        },
      },
      {
        title: "Data Visualization & BI",
        items: ["Tableau", "Power BI", "Plotly"],
        theme: {
          card:
            "radial-gradient(120% 120% at 20% 20%, rgba(34,197,94,0.24), transparent 60%), radial-gradient(120% 120% at 85% 70%, rgba(132,204,22,0.2), transparent 55%), linear-gradient(180deg, rgba(15,23,42,0.98), rgba(2,6,23,0.98))",
          text: "linear-gradient(90deg, #f8fafc 0%, #a3e635 55%, #22c55e 100%)",
          accent: "#a3e635",
        },
      },
    ],
    []
  );

  return (
    <section id="skills" className="h-screen snap-start snap-always scroll-mt-20 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
            Skills
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="bg-clip-text text-transparent [background-image:linear-gradient(90deg,#f8fafc,#a5b4fc,#38bdf8)]">
              Technical Skills
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, idx) => (
            <div
              key={g.title}
              className="relative h-[360px] rounded-[30px] border border-white/10 p-6 shadow-[0_18px_55px_rgba(2,6,23,0.65)]"
              style={{ backgroundImage: g.theme.card }}
            >
              <div className="absolute left-6 top-6 h-1.5 w-12 rounded-full bg-white/10" />
              <div className="mt-6 flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: g.theme.text }}
                    >
                      {g.title}
                    </span>
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((x) => (
                      <span
                        key={x}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm font-semibold text-white/90"
                      >
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="h-[2px] w-16 rounded-full" style={{ backgroundColor: g.theme.accent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const roles = useMemo(
    () => [
      {
        title: "Pro Shop Associate & Beverage Cart Attendant",
        org: "Bathurst Glen Golf Course • Richmond Hill, ON",
        period: "June 2025 – September 2025",
        accent: "from-cyan-400 to-blue-500",
      },
      {
        title: "Promotions Committee Lead",
        org: "National Bank Open - Rogers Cup • Toronto, ON",
        period: "2023 – Present",
        accent: "from-emerald-400 to-teal-400",
      },
      {
        title: "Vice President & Finance Lead",
        org: "Relay For Life - Cardinal Carter Catholic High School • Aurora, ON",
        period: "2024 – 2025",
        accent: "from-rose-400 to-fuchsia-400",
      },
    ],
    []
  );

  return (
    <section id="experience" className="h-screen snap-start snap-always scroll-mt-20 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
            Experience
          </p>
          <h2 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            <span className="bg-clip-text text-transparent [background-image:linear-gradient(90deg,#f8fafc,#a5b4fc,#38bdf8)]">
              Experience
            </span>
          </h2>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10 sm:left-8 sm:translate-x-0" />
          <div className="space-y-12 sm:space-y-16">
            {roles.map((role, idx) => (
              <div key={`${role.title}-${role.period}`} className="relative">
                <div className="absolute left-1/2 top-6 -translate-x-1/2 sm:left-8 sm:translate-x-0">
                  <div className={`h-3.5 w-3.5 rounded-full bg-gradient-to-r ${role.accent}`} />
                </div>
                <div className="mx-auto max-w-4xl px-6 py-4 text-center sm:ml-20 sm:text-left">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {role.title}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/60 sm:text-base">
                    <span>{role.org}</span>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span className="text-sm font-semibold text-white/45">{role.period}</span>
                  </div>
                  <div className={`mt-4 h-[2px] w-32 rounded-full bg-gradient-to-r ${role.accent}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main
      className={cn(
        inter.className,
        "h-screen bg-zinc-950 text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      )}
    >
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.14),transparent_45%),radial-gradient(circle_at_50%_90%,rgba(244,63,94,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,9,11,0.2),rgba(9,9,11,1))]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <nav className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            <a href="#top" className="hover:text-white transition">
              Title
            </a>
            <a href="#projects" className="hover:text-white transition">
              Projects
            </a>
            <a href="#skills" className="hover:text-white transition">
              Skills
            </a>
            <a href="#experience" className="hover:text-white transition">
              Experience
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/kiana-moh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="GitHub"
            >
              <IconGitHub className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/kiana-mo"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white/80 hover:text-white hover:bg-white/10 transition"
              aria-label="LinkedIn"
            >
              <IconLinkedIn className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      <div>
        <section id="top" className="h-screen snap-start snap-always scroll-mt-20 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <div className="relative flex min-h-[80vh] items-center justify-center text-center">
              <div className="absolute -top-24 left-1/2 h-72 w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_70%)] blur-3xl" />
              <div className="absolute top-6 left-[65%] h-64 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.14),transparent_70%)] blur-3xl" />
              <div className="absolute -bottom-12 left-[35%] h-64 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,114,182,0.16),transparent_70%)] blur-3xl" />

              <div className="relative w-full">
                <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-white/55">
                  <span>Portfolio</span>
                  <span className="h-px w-10 bg-white/20" />
                  <span>2025</span>
                </div>

                <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
                  <span className="bg-clip-text text-transparent [background-image:linear-gradient(90deg,#f8fafc,#cbd5f5,#7dd3fc)]">
                    {PROFILE.name}
                  </span>
                </h1>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-white/70">
                  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/80">
                    {PROFILE.subtitle}
                  </span>
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <a
                    href="/resume.pdf"
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                  >
                    Download resume
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
                  >
                    Contact us
                  </a>
                  <span className="hidden sm:inline text-xs text-white/40">
                    Scroll for projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProjectCarousel projects={PROJECTS} />
        <SkillsSection />
        <ExperienceSection />
      </div>

    </main>
  );
}
