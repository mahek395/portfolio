"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Project } from "@/data/projects";
import Navbar from "@/components/ui/Navbar";

// ── Hex opacity helper ────────────────────────────────────────────
function hexAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${h}${a}`;
}

export default function ProjectDetail({ project }: { project: Project }) {
  const router = useRouter();
  const { title, tagline, description, bullets, tech, liveUrl, githubUrl, accentColor } = project;

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white flex flex-col font-sans">
      {/* Navbar spacer & render */}
      <Navbar />
      
      <div className="pt-16 flex-1">
        {/* ── SECTION 1: HERO ── */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => router.back()}
            className="text-[#a3a3a3] hover:text-white text-sm flex items-center gap-2 mb-8 focus:outline-none transition-colors duration-200 cursor-pointer"
          >
            ← Back to projects
          </button>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="font-mono text-sm text-[#7c3aed] mb-2">// project</p>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 leading-tight">
                {title}
              </h1>
              <p className="text-lg mb-4 font-semibold" style={{ color: accentColor }}>
                {tagline}
              </p>
              <p className="text-[#c4c4c4] leading-relaxed mb-6">
                {description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: accentColor }}
                  >
                    View Live Site ↗
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium border transition-all duration-200 hover:bg-white/5"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    View Code
                  </a>
                )}
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-1.5 mt-4">
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
            </div>

            {/* Right Live Iframe Preview */}
            {liveUrl && (
              <div className="relative h-[400px]">
                {/* Glow behind container */}
                <div
                  className="absolute -inset-1 rounded-xl blur-xl opacity-20 -z-10"
                  style={{ backgroundColor: accentColor }}
                />
                {/* Iframe wrapper */}
                <div className="w-full h-full rounded-xl overflow-hidden border border-[#222222] bg-[#111111] shadow-2xl">
                  <iframe
                    src={liveUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    title={`${title} live view`}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── SECTION 2: WHAT I BUILT ── */}
        <section className="py-16 px-6 max-w-6xl mx-auto border-t border-[#222222]">
          <h2 className="text-2xl font-bold text-white mb-8">What I built</h2>
          <div className="flex flex-col gap-4">
            {bullets.map((bullet, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#222222] bg-[#111111] p-5 flex gap-4"
              >
                <span
                  className="text-xl font-bold shrink-0 select-none"
                  style={{ color: accentColor }}
                >
                  ▸
                </span>
                <p className="text-[#c4c4c4] text-sm leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: TECH STACK DEEP DIVE ── */}
        <section className="py-16 px-6 max-w-6xl mx-auto border-t border-[#222222]">
          <h2 className="text-2xl font-bold text-white mb-8">Tech stack</h2>
          <div className="flex flex-wrap gap-3">
            {tech.map((t) => (
              <span
                key={t}
                className="font-mono text-sm px-4 py-2 rounded-xl border"
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
        </section>

        {/* ── SECTION 4: LIVE PREVIEW ── */}
        {liveUrl && (
          <section className="py-16 px-6 max-w-6xl mx-auto border-t border-[#222222]">
            <h2 className="text-2xl font-bold text-white mb-8">Live preview</h2>
            <div className="rounded-xl border border-[#222222] overflow-hidden h-[600px] bg-[#111111]">
              <iframe
                src={liveUrl}
                className="w-full h-full border-0"
                loading="lazy"
                title={title}
              />
            </div>
            <div className="text-center mt-4 text-sm text-[#a3a3a3]">
              Something not loading?{" "}
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-all duration-200"
                style={{ color: accentColor }}
              >
                Open in new tab ↗
              </a>
            </div>
          </section>
        )}

        {/* ── SECTION 5: BOTTOM CTA ── */}
        <section className="py-16 px-6 max-w-6xl mx-auto border-t border-[#222222] text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Interested in working together?
          </h2>
          <p className="text-[#a3a3a3] mb-8">
            Open to full-stack developer roles in Surat and Ahmedabad.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="mailto:mahekshah395@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: accentColor }}
            >
              Get in touch
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium border border-[#222222] text-white hover:bg-white/5 transition-all duration-200"
            >
              ← All projects
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
