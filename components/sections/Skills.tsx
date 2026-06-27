"use client";

import { useEffect, useRef, useState } from "react";
import { skillGroups } from "@/data/skills";

// ── useInView ─────────────────────────────────────────────────────
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

// ── Color maps ────────────────────────────────────────────────────
const labelColor: Record<string, string> = {
  purple: "text-[#7c3aed]",
  teal:   "text-[#0d9488]",
  amber:  "text-[#d97706]",
  blue:   "text-[#2563eb]",
};

const badgeColor: Record<string, string> = {
  purple: "border-violet-700/40 text-violet-300  bg-violet-950/30",
  teal:   "border-teal-700/40   text-teal-300    bg-teal-950/30",
  amber:  "border-amber-700/40  text-amber-300   bg-amber-950/30",
  blue:   "border-blue-700/40   text-blue-300    bg-blue-950/30",
};

// ── SkillCard ─────────────────────────────────────────────────────
function SkillCard({
  label,
  color,
  skills,
  inView,
  delay,
}: {
  label: string;
  color: string;
  skills: string[];
  inView: boolean;
  delay: number;
}) {
  const heading = labelColor[color] ?? "text-[#a3a3a3]";
  const badge   = badgeColor[color]  ?? "border-white/10 text-white/60 bg-white/5";

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{
        opacity:   inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Group label */}
      <p className={`text-sm font-semibold uppercase tracking-widest mb-3 ${heading}`}>
        {label}
      </p>

      {/* Skill badges */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`font-mono text-xs px-3 py-1 rounded-full border ${badge} transition-colors duration-200`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Skills section ────────────────────────────────────────────────
export default function Skills() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="skills" className="bg-[#0a0a0a] py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div
          ref={ref}
          className="transition-all duration-700 ease-out mb-12"
          style={{
            opacity:   inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="font-mono text-sm text-[#7c3aed] mb-3">
            // skills &amp; tools
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What I work with
          </h2>
        </div>

        {/* Groups grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map(({ label, color, skills }, i) => (
            <SkillCard
              key={label}
              label={label}
              color={color}
              skills={skills}
              inView={inView}
              delay={i * 80}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
