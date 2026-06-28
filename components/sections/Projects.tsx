"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { projects, type Project } from "@/data/projects";

// ── GitHub icon (lucide-react v1 dropped it) ──────────────────────
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ── useInView ─────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Hex opacity helpers ───────────────────────────────────────────
function hexAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${h}${a}`;
}

// ── Iframe preview header ─────────────────────────────────────────
function IframeHeader({ liveUrl }: { liveUrl: string }) {
  return (
    <div className="relative h-56 overflow-hidden border-b border-[#222222] pointer-events-none">
      {/* Hover overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 transition-opacity duration-300 opacity-100 group-hover:opacity-0">
        <span className="text-xs text-white/60">Open live site ↗</span>
      </div>
      <iframe
        src={liveUrl}
        loading="lazy"
        title="Project preview"
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-full border-0"
        style={{
          transform: "scale(0.75)",
          transformOrigin: "top left",
          width: "133%",
          height: "133%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ── ProjectCard ───────────────────────────────────────────────────
function ProjectCard({
  project,
  colSpan,
  inView,
  delay,
}: {
  project: Project;
  colSpan: string;
  inView: boolean;
  delay: number;
}) {
  const { id, title, tagline, description, bullets, tech, liveUrl, githubUrl, accentColor, hasIframe } = project;
  const isLarge = project.size === "large";

  return (
    <div
      className={`${colSpan} transition-all duration-700 ease-out`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <Link href={`/projects/${id}`} className="block h-full">
        <div
          className={`group rounded-xl border bg-[#111111] overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col ${isLarge ? "h-full min-h-[480px] border-t-2" : "h-auto"
            }`}
          style={{
            borderColor: hexAlpha(accentColor, 0.2),
            borderTopColor: isLarge ? accentColor : undefined,
            ["--accent-color" as any]: accentColor,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = accentColor;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.borderColor = hexAlpha(accentColor, 0.2);
            if (isLarge) {
              el.style.borderTopColor = accentColor;
            }
          }}
        >
          {/* Top visual */}
          {hasIframe && <IframeHeader liveUrl={liveUrl} />}

          {/* Card body */}
          <div className="p-5 flex flex-col flex-1 justify-between gap-4">
            <div className="flex flex-col gap-3">
              {/* Title row */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-xl leading-tight">
                    {title}
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: accentColor }}>
                    {tagline}
                  </p>
                </div>

                {/* Icon links */}
                <div className="flex items-center gap-2 shrink-0 mt-0.5 z-20">
                  {githubUrl && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(githubUrl, "_blank", "noopener,noreferrer");
                      }}
                      aria-label={`${title} GitHub`}
                      className="text-[#525252] hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none bg-transparent border-0 p-0"
                    >
                      <GitHubIcon className="size-4" />
                    </button>
                  )}
                  {liveUrl && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(liveUrl, "_blank", "noopener,noreferrer");
                      }}
                      aria-label={`${title} live demo`}
                      className="text-[#525252] hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none bg-transparent border-0 p-0"
                    >
                      <ExternalLink className="size-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#c4c4c4] leading-relaxed">
                {description}
              </p>

              {/* Bullet points */}
              <ul className="flex flex-col gap-1.5">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-xs text-[#888888] leading-relaxed">
                    <span className="shrink-0 mt-px" style={{ color: accentColor }}>
                      ▸
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech badges & View case study */}
            <div className="flex items-end justify-between gap-4 mt-auto pt-3">
              <div className="flex flex-wrap gap-1.5">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: hexAlpha(accentColor, 0.4),
                      color: accentColor,
                      backgroundColor: hexAlpha(accentColor, 0.1),
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-xs text-[#525252] group-hover:text-[var(--accent-color)] transition-colors duration-200 shrink-0 font-medium">
                View case study →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ── Column span map ───────────────────────────────────────────────
const colSpanMap: Record<string, string> = {
  clearclause: "lg:col-span-2",
  docgen: "lg:col-span-2",
  stackit: "lg:col-span-2",
};

// ── Projects section ──────────────────────────────────────────────
export default function Projects() {
  const { ref, inView } = useInView(0.05);
  const gridProjects = projects.filter((p) => p.id !== "dynamic-dreamz");

  return (
    <section id="projects" className="bg-[#0a0a0a] py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div
          ref={ref}
          className="transition-all duration-700 ease-out mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="font-mono text-sm text-[#7c3aed] mb-3">// projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Things I&apos;ve built
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {gridProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              colSpan={colSpanMap[project.id] ?? "lg:col-span-2"}
              inView={inView}
              delay={i * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
