"use client";

import { useEffect, useRef, useState } from "react";
import { meta } from "@/data/meta";

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

// ── Internship bullets (from meta / projects data) ────────────────
const internBullets = [
  "Backend-agnostic middleware adapter in Next.js — swap Shopify / WooCommerce / MedusaJS with zero UI changes",
  "Pixel-accurate storefronts from Figma designs with MedusaJS v2 API integration (SSR, route-based data fetching)",
  "Code reviews and cross-functional collaboration in a production Shopify Partner environment",
];

const internTech = ["Next.js", "MedusaJS v2", "Shopify", "Figma", "TailwindCSS"];

const BLUE = "#2563eb";

function hexAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const a = Math.round(alpha * 255).toString(16).padStart(2, "0");
  return `#${h}${a}`;
}

// ── Achievement card data ─────────────────────────────────────────
const achievements = [
  { title: "GATE 2026",       subtitle: "Qualified",          accent: "#7c3aed", initials: "GA" },
  { title: "OCI Foundation",  subtitle: "Certified 2025",     accent: "#0d9488", initials: "OC" },
  { title: "NPTEL",           subtitle: "Entrepreneurship",   accent: "#d97706", initials: "NP" },
];

// ── Experience ────────────────────────────────────────────────────
export default function Experience() {
  const { ref, inView } = useInView(0.08);

  return (
    <section id="experience" className="bg-[#0a0a0a] py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div
          ref={ref}
          className="transition-all duration-700 ease-out mb-12"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="font-mono text-sm text-[#7c3aed] mb-3">// experience</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Where I&apos;ve worked
          </h2>
        </div>

        {/* ── Internship card ── */}
        <div
          className="transition-all duration-700 ease-out delay-100"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "100ms",
          }}
        >
          <div className="rounded-xl border border-[#222222] border-l-4 bg-[#111111] p-6"
               style={{ borderLeftColor: BLUE }}>

            {/* Top row: company + date */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <span className="font-semibold text-white text-xl">Dynamic Dreamz</span>
              <span className="text-sm text-[#a3a3a3] shrink-0">Jun 2025 – Present</span>
            </div>

            {/* Second row: role + location */}
            <div className="flex items-center justify-between gap-4 flex-wrap mt-0.5">
              <span className="text-sm" style={{ color: BLUE }}>
                Full Stack Development Intern
              </span>
              <span className="text-xs text-[#525252]">Surat, Gujarat (Onsite)</span>
            </div>

            {/* Partner badge */}
            <span
              className="inline-flex mt-2 mb-4 px-2 py-0.5 text-xs rounded-full border"
              style={{
                borderColor:     hexAlpha(BLUE, 0.4),
                color:           BLUE,
                backgroundColor: hexAlpha(BLUE, 0.1),
              }}
            >
              Premier Shopify Partner
            </span>

            {/* Bullets */}
            <ul className="flex flex-col gap-2 mb-5">
              {internBullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-[#a3a3a3] leading-relaxed">
                  <span className="shrink-0 mt-px" style={{ color: BLUE }}>▸</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              {internTech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor:     hexAlpha(BLUE, 0.4),
                    color:           BLUE,
                    backgroundColor: hexAlpha(BLUE, 0.1),
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Achievements ── */}
        <div
          className="mt-8 transition-all duration-700 ease-out"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transitionDelay: "220ms",
          }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Certifications &amp; Achievements
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {achievements.map(({ title, subtitle, accent, initials }) => (
              <div
                key={title}
                className="rounded-xl border border-[#222222] bg-[#111111] p-4 flex items-center gap-3"
              >
                {/* Colored circle icon */}
                <div
                  className="rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: hexAlpha(accent, 0.15),
                    color:           accent,
                    border:          `1px solid ${hexAlpha(accent, 0.35)}`,
                  }}
                >
                  {initials}
                </div>

                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{title}</p>
                  <p className="text-xs text-[#a3a3a3] mt-0.5">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
