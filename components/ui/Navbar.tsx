"use client";

import { useEffect, useState } from "react";
import { Menu, FileDown } from "lucide-react";

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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 h-16 flex items-center",
        "backdrop-blur-md bg-black/80 transition-all duration-300",
        scrolled ? "border-b border-[#222222]" : "border-b border-transparent",
      ].join(" ")}
    >
      <nav className="w-full max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* ── Logo ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-lg font-semibold tracking-tight focus:outline-none"
          aria-label="Scroll to top"
        >
          <span className="text-[#7c3aed]">&lt;</span>
          <span className="text-white">Mahek</span>
          <span className="text-[#7c3aed]">&nbsp;/&gt;</span>
        </button>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-sm text-[#a3a3a3] hover:text-white transition-colors duration-200 focus:outline-none"
            >
              {label}
            </button>
          ))}

          {/* Resume download button */}
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium
                       border border-[#7c3aed] text-[#7c3aed]
                       hover:bg-[#7c3aed] hover:text-white
                       transition-all duration-200"
          >
            <FileDown className="size-3.5" />
            Resume
          </a>

          {/* GitHub icon link */}
          <a
            href="https://github.com/mahek395"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-[#a3a3a3] hover:text-white transition-colors duration-200"
          >
            <GitHubIcon className="size-5" />
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="text-[#a3a3a3] hover:text-white transition-colors duration-200 focus:outline-none"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[260px] bg-[#0a0a0a] border-l border-[#222222] p-0 flex flex-col"
            >
              {/* Sheet header */}
              <div className="px-6 py-5 border-b border-[#222222]">
                <span className="font-mono text-base font-semibold">
                  <span className="text-[#7c3aed]">&lt;</span>
                  <span className="text-white">Mahek</span>
                  <span className="text-[#7c3aed]">&nbsp;/&gt;</span>
                </span>
              </div>

              {/* Mobile nav links */}
              <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
                {NAV_LINKS.map(({ label, id }) => (
                  <SheetClose asChild key={id}>
                    <button
                      onClick={() => scrollToSection(id)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-[#a3a3a3] hover:text-white hover:bg-white/5 transition-all duration-200 text-sm font-medium focus:outline-none"
                    >
                      {label}
                    </button>
                  </SheetClose>
                ))}
              </nav>

              {/* Mobile footer actions */}
              <div className="flex flex-col gap-3 px-4 pb-8">
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium border border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white transition-all duration-200"
                >
                  <FileDown className="size-4" />
                  Resume
                </a>
                <a
                  href="https://github.com/mahek395"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  aria-label="GitHub profile"
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg text-sm font-medium text-[#a3a3a3] hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <GitHubIcon className="size-4" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
