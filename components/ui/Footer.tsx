export default function Footer() {
  return (
    <footer className="border-t border-[#222222] bg-[#0a0a0a] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-2 text-sm text-[#525252] text-center">
        <span>Mahek Shah · Built with Next.js &amp; Tailwind</span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/mahek395"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#a3a3a3] transition-colors duration-200"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href="mailto:mahekshah395@gmail.com"
            className="hover:text-[#a3a3a3] transition-colors duration-200"
          >
            mahekshah395@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
