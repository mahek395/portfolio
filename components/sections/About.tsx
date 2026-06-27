"use client";

import { useEffect, useRef, useState } from "react";
import { meta } from "@/data/meta";

// ── useInView hook ────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Directional fade-in wrapper ───────────────────────────────────
type FadeDirection = "left" | "right" | "up";

function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className = "",
  inView,
}: {
  children: React.ReactNode;
  direction?: FadeDirection;
  delay?: number;
  className?: string;
  inView: boolean;
}) {
  const translate =
    direction === "left"
      ? "translate-x-6"
      : direction === "right"
        ? "-translate-x-6"
        : "translate-y-4";

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${translate}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────
export default function About() {
  const { ref: leftRef, inView: leftInView } = useInView();
  const { ref: rightRef, inView: rightInView } = useInView();

  return (
    <section id="about" className="bg-[#0a0a0a] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left column ── */}
          <div ref={leftRef}>
            <FadeIn direction="left" delay={0} inView={leftInView}>
              {/* Label */}
              <p className="font-mono text-sm text-[#7c3aed] mb-3">
                // about me
              </p>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Building systems that actually work
              </h2>

              {/* Bio */}
              <p className="text-[#a3a3a3] leading-relaxed mb-6">
                {meta.bio}
              </p>

              {/* Location pill */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#222222] px-3 py-1 text-sm text-[#a3a3a3]">
                📍 Surat, Gujarat
              </span>
            </FadeIn>
          </div>

          {/* ── Right column ── */}
          <div ref={rightRef}>
            <FadeIn direction="right" delay={100} inView={rightInView}>
              <div className="grid grid-cols-2 gap-4">
                {meta.stats.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-[#222222] bg-[#111111] p-5"
                  >
                    <p className="text-3xl font-bold text-[#7c3aed] mb-1">
                      {value}
                    </p>
                    <p className="text-sm text-[#a3a3a3]">{label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
