"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, FileDown } from "lucide-react"

// ── GitHub inline SVG ─────────────────────────────────────────────
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

// ── Contact cards data ────────────────────────────────────────────
const contacts = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com/mahek395",
    href: "https://github.com/mahek395",
    external: true,
    icon: <GitHubIcon className="size-5 text-[#a3a3a3]" />,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "Mahek Shah",
    href: "https://www.linkedin.com/in/mahek-shah-9738a8238/",
    external: true,
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  },
  {
    id: "email",
    label: "Email",
    value: "mahekshah395@gmail.com",
    href: "mailto:mahekshah395@gmail.com",
    external: false,
    icon: <Mail className="size-5 text-[#a3a3a3]" />,
  },
] as const;

// ── Contact ───────────────────────────────────────────────────────
export default function Contact() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="contact" className="bg-[#0a0a0a] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className="flex flex-col items-center transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Header */}
          <p className="font-mono text-sm text-[#7c3aed] mb-3">// contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">
            Let&apos;s build something
          </h2>
          <p className="text-[#a3a3a3] text-center max-w-md mb-10">
            Open to full-stack developer and software engineer roles in Surat and Ahmedabad.
          </p>

          {/* Contact cards */}
          <div className="flex flex-wrap justify-center gap-4">
            {contacts.map(({ id, label, value, href, external, icon }, i) => (
              <a
                key={id}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="rounded-xl border border-[#222222] bg-[#111111] px-6 py-4 flex items-center gap-3 hover:border-[#7c3aed] transition-all duration-700 ease-out"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(16px)",
                }}
              >
                {icon}
                <div>
                  <p className="text-xs text-[#525252] leading-none mb-1">{label}</p>
                  <p className="text-sm text-white">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Resume button */}
          <a
            href="/resume.pdf"
            download
            className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-[#7c3aed] text-[#7c3aed] text-sm font-semibold hover:bg-[#7c3aed] hover:text-white transition-all duration-200"
          >
            <FileDown className="size-4" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
