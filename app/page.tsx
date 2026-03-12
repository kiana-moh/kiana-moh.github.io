// File: src/app/page.tsx
// Theme: organic, editorial dark with textured gradients.

"use client";

import React, { useState } from "react";
import { Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const PROFILE = {
  name: "Kiana Mohammadi",
  subtitle: "Software Engineering @ University of Waterloo 🪿",
  email: "kianaa.m07@gmail.com",
  introLocation: "Toronto, ON",
};

const ABOUT =
  "Hi, I’m Kiana. A Software Engineering student at the University of Waterloo passionate about machine learning and data-driven solutions.";

const SOCIALS = [
  { label: "Email", value: "k35moham@uwaterloo.ca", href: "mailto:k35moham@uwaterloo.ca" },
  { label: "LinkedIn", value: "linkedin.com/in/kiana-mo", href: "https://linkedin.com/in/kiana-mo" },
  { label: "GitHub", value: "github.com/kiana-moh", href: "https://github.com/kiana-moh" },
];

type Project = {
  title: string;
  tagline: string;
  description?: string;
  demoSrc?: string;
  links?: { github?: string };
};

const PROJECTS: Project[] = [
  {
    title: "Momentum",
    tagline: "Workout tracking with clean data models.",
    description:
      "FastAPI + PostgreSQL app with auth and structured workout data.",
    links: { github: "https://github.com/kiana-moh" },
  },
  {
    title: "Market Return Analyzer",
    tagline: "Market risk metrics from historical data.",
    description:
      "Computes returns, volatility, and distributions in Python.",
    links: { github: "https://github.com/kiana-moh" },
  },
  {
    title: "UWay",
    tagline: "Campus routing and schedule navigation.",
    description:
      "GeoJSON graph + Dijkstra routing with schedule import.",
    demoSrc: "https://www.youtube.com/embed/zmSzzST2Cl4",
    links: { github: "https://github.com/kiana-moh/UWay" },
  },
  {
    title: "Weather Forecasting",
    tagline: "Next-day temperature prediction.",
    description:
      "Benchmarked LSTM and CNN models on hourly data.",
    links: { github: "https://github.com/kiana-moh" },
  },
];

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
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

function IconMail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2.2-.5 6.8 5.3 6.8-5.3H5.2Zm13.8 2.3-5.8 4.5a2 2 0 0 1-2.4 0L5 8.3v9.2c0 .3.2.5.5.5h13c.3 0 .5-.2.5-.5V8.3Z"
      />
    </svg>
  );
}

function SectionTitle({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/75">{kicker}</p>
      <div className="flex items-center gap-3">
        <span className="h-6 w-1 bg-pink-400" />
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white">{title}</h2>
      </div>
      {subtitle ? <p className="text-sm text-white/75 max-w-xl">{subtitle}</p> : null}
    </div>
  );
}

export default function Page() {
  const [openProject, setOpenProject] = useState<number | null>(0);

  return (
    <main
      className={cn(sourceSans.className, "min-h-screen bg-black text-white")}
    >
      <section id="top" className="relative pb-16 pt-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-8 w-1.5 bg-pink-400" />
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                    {PROFILE.name}
                  </h1>
                </div>
                <p className="mt-4 text-lg font-extrabold tracking-[0.12em] text-white">
                  {PROFILE.subtitle}
                </p>
                <p className="mt-2 text-lg font-extrabold tracking-[0.12em] text-white/90">
                  📍 {PROFILE.introLocation}
                </p>
              </div>
              <p className="text-xl text-white/95 max-w-2xl leading-relaxed">{ABOUT}</p>
            </div>

            <div className="relative">
              <div className="border border-white/15 px-6 py-6">
                <div className="flex items-center gap-4">
                  <span className="h-10 w-2 bg-pink-400" />
                  <div>
                    <p className="text-lg font-extrabold tracking-[0.22em] text-white">SNAPSHOT</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-6">
                  <div className="grid grid-cols-[140px_1fr] items-start gap-4 border-b border-white/10 pb-5">
                    <p className="text-sm font-extrabold tracking-[0.2em] text-white/80">WORKING ON</p>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-2xl font-extrabold text-pink-400 underline underline-offset-4">
                          Axiom
                        </p>
                        <a
                          href="https://github.com/kiana-moh"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center text-pink-400 hover:text-pink-300 transition"
                          aria-label="Axiom GitHub"
                        >
                          <IconGitHub className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-lg text-white/90">Predictive Modeling</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-[140px_1fr] items-start gap-4">
                    <p className="text-sm font-extrabold tracking-[0.2em] text-white/80">RECENT WORK</p>
                    <div>
                      <div className="flex items-center gap-3">
                        <p className="text-2xl font-extrabold text-pink-400 underline underline-offset-4">
                          UWay
                        </p>
                        <a
                          href="https://github.com/kiana-moh/UWay"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center text-pink-400 hover:text-pink-300 transition"
                          aria-label="UWay GitHub"
                        >
                          <IconGitHub className="h-4 w-4" />
                        </a>
                      </div>
                      <p className="text-lg text-white/90">Campus Routing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="pb-20 pt-12">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle
            kicker="Selected Work"
            title="Projects"
            subtitle="Short, straightforward, and results-first."
          />
          <div className="mt-8 space-y-5">
            {PROJECTS.map((project, index) => (
              <article
                key={project.title}
                className="group border-b border-white/10 pb-5 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenProject(openProject === index ? null : index)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 text-sm text-pink-400">
                      {openProject === index ? "▾" : "▸"}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-pink-200 transition">
                        <span className="border-b border-transparent group-hover:border-pink-400 pb-0.5">
                          {project.title}
                        </span>
                      </h3>
                      <p className="mt-1 text-sm text-white/65">{project.tagline}</p>
                    </div>
                  </div>
                  {project.links?.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex h-8 w-8 items-center justify-center text-pink-400 hover:text-pink-300 transition"
                      aria-label={`${project.title} GitHub`}
                    >
                      <IconGitHub className="h-5 w-5" />
                    </a>
                  ) : null}
                </button>
                {openProject === index && (project.description || project.demoSrc) ? (
                  <div className="mt-3 ml-5 border-l border-white/10 pl-5 space-y-3">
                    {project.description ? (
                      <p className="text-sm text-white/50">{project.description}</p>
                    ) : null}
                    {project.demoSrc ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-white/75">
                          UWAY DEMO
                        </p>
                        <div className="aspect-video w-full border-2 border-white/60">
                          <iframe
                            className="h-full w-full"
                            src={project.demoSrc}
                            title="UWay demo"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="socials" className="pb-24 pt-8">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/55">Get in touch</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-white">Get In Touch</h2>
          <div className="mx-auto mt-4 h-px w-20 bg-pink-400/70" />
          <p className="mt-4 text-sm text-white/60">Please reach out!</p>
          <div className="mt-10 space-y-4">
            {SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="group relative flex items-center justify-center gap-3 border border-white/25 px-6 py-3 text-sm text-white/80 hover:text-white transition"
              >
                <span className="text-white/70">
                  {item.label === "Email" ? (
                    <IconMail className="h-4 w-4" />
                  ) : item.label === "LinkedIn" ? (
                    <IconLinkedIn className="h-4 w-4" />
                  ) : (
                    <IconGitHub className="h-4 w-4" />
                  )}
                </span>
                <span className="text-white/80">{item.value}</span>
                <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-pink-400 opacity-0 transition group-hover:opacity-100" />
                <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-pink-400 opacity-0 transition group-hover:opacity-100" />
                <span className="pointer-events-none absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-pink-400 opacity-0 transition group-hover:opacity-100" />
                <span className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-pink-400 opacity-0 transition group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
