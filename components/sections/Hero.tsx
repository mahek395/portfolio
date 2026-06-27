"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

// lucide-react v1 dropped the Github icon — use inline SVG instead
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .322.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ── Typing animation ──────────────────────────────────────────────
const TYPING_STRINGS = [
  "Full Stack Developer",
  "AI Engineer",
  "Backend Architect",
  "Building cool stuff",
];

function useTypingEffect(strings: string[], speed = 80, pause = 1600) {
  const [displayed, setDisplayed] = useState("");
  const [strIndex, setStrIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[strIndex];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplayed(current.slice(0, charIndex + 1));
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIndex((c) => c + 1);
          }
        } else {
          setDisplayed(current.slice(0, charIndex - 1));
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setStrIndex((s) => (s + 1) % strings.length);
            setCharIndex(0);
          } else {
            setCharIndex((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, strIndex, strings, speed, pause]);

  return displayed;
}

// ── Fade-in wrapper ───────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } ${className}`}
    >
      {children}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────
export default function Hero() {
  const typed = useTypingEffect(TYPING_STRINGS);

  function scrollToProjects() {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.15), transparent), #0a0a0a",
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-4 sm:px-6 gap-6">
        {/* 1 · Greeting */}
        <FadeIn delay={0}>
          <p className="text-[#a3a3a3] text-lg tracking-wide">Hi, I&apos;m</p>
        </FadeIn>

        {/* 2 · Name */}
        <FadeIn delay={100} className="-mt-2">
          <h1 className="font-sans text-6xl md:text-8xl font-bold tracking-tight text-white leading-none">
            Mahek Shah
          </h1>
        </FadeIn>

        {/* 3 · Typing role */}
        <FadeIn delay={300}>
          <p className="text-2xl md:text-3xl font-medium text-[#7c3aed] min-h-[2.5rem] flex items-center gap-0.5">
            {typed}
            <span className="inline-block w-[2px] h-[1.1em] bg-[#7c3aed] ml-0.5 animate-[blink_1s_step-end_infinite]" />
          </p>
        </FadeIn>

        {/* 4 · Bio */}
        <FadeIn delay={500}>
          <p className="text-[#a3a3a3] text-base md:text-lg leading-relaxed max-w-lg">
            Computer Engineering student at PDEU building full-stack systems
            with real depth — RAG pipelines, async queues, and pixel-accurate
            frontends.
          </p>
        </FadeIn>

        {/* 5 · CTAs */}
        <FadeIn delay={700}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                         bg-[#7c3aed] text-white
                         hover:bg-[#6d28d9] active:scale-95
                         shadow-[0_0_24px_rgba(124,58,237,0.35)]
                         transition-all duration-200"
            >
              View my work
              <ArrowDown className="size-4" />
            </button>

            <a
              href="https://github.com/mahek395"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold
                         border border-[#222222] text-[#a3a3a3]
                         hover:border-[#7c3aed] hover:text-white
                         active:scale-95
                         transition-all duration-200"
            >
              <GitHubIcon className="size-4" />
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Scroll-down cue */}
      <div className="absolute bottom-8 inset-x-0 flex justify-center animate-bounce opacity-40">
        <ArrowDown className="size-5 text-[#a3a3a3]" />
      </div>
    </section>
  );
}
