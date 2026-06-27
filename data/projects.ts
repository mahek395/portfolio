export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  bullets: string[]
  tech: string[]
  liveUrl: string
  githubUrl: string
  accentColor: string
  size: "large" | "medium" | "small"
  hasIframe: boolean
}

export const projects: Project[] = [
  {
    id: "clearclause",
    title: "ClearClause",
    tagline: "AI Legal Document Analyzer",
    description:
      "Upload any legal document and get instant AI-powered analysis, clause explanations, and multi-turn Q&A — all grounded in your actual document via a full RAG pipeline.",
    bullets: [
      "Full RAG pipeline: Cohere embed-english-v3.0 → pgvector IVFFlat index → top-5 semantic chunk retrieval per query",
      "2 decoupled BullMQ async queues (doc processing + embedding); SSE for section-by-section streaming; hybrid OCR fallback (PDF.js → Tesseract EN+HI)",
      "Multi-provider AI failover: Gemini 2.5 Flash → Groq Llama-3.3-70B on rate limits; JWT + httpOnly refresh token auth",
    ],
    tech: ["React.js", "Node.js", "PostgreSQL", "pgvector", "Redis", "BullMQ", "Docker", "Gemini API", "Cohere"],
    liveUrl: "https://clear-clause-pi.vercel.app/", 
    githubUrl: "https://github.com/mahek395/ClearClause.git",  
    accentColor: "#7c3aed",
    size: "large",
    hasIframe: true,
  },
  {
    id: "docgen",
    title: "DocGen-AI",
    tagline: "Automated Documentation Generator",
    description:
      "Point it at any public GitHub repo and it clones it, performs a 6-phase deep analysis, and auto-generates a README + Developer Guide in under 10 minutes.",
    bullets: [
      "6-phase codebase analysis: stack detection, entry points, API routes, DB schemas, env vars, folder tree",
      "Async BullMQ + Redis pipeline with 6-step real-time progress tracking; Docker Compose orchestrates 5 services",
      "React/Nginx + Express API + BullMQ worker + MySQL + Redis with health-check-based dependency ordering",
    ],
    tech: ["React.js", "Node.js", "Express.js", "Redis", "BullMQ", "Docker", "MySQL", "OpenRouter API"],
    liveUrl: "https://doc-gen-ai-tau.vercel.app/",  
    githubUrl: "https://github.com/mahek395/DocGen-ai.git", 
    accentColor: "#0d9488",
    size: "large",
    hasIframe: true,
  },
  {
    id: "stackit",
    title: "StackIt",
    tagline: "Minimal Q&A Forum",
    description:
      "A clean, Reddit-style Q&A platform with markdown editing, AI-assisted tag generation, and optimized full-text search.",
    bullets: [
      "Question posting, answer submission, upvoting, and accepted-answer marking",
      "Markdown rich text editor + AI-assisted tag generation",
      "RESTful APIs with MongoDB indexing for paginated full-text search at scale",
    ],
    tech: ["React.js", "TailwindCSS", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "https://stack-it-a-minimal-qn-a-forum-platf-amber.vercel.app/",   
    githubUrl: "https://github.com/mahek395/StackIt-A-minimal-QnA-Forum-Platform.git", 
    accentColor: "#d97706",
    size: "medium",
    hasIframe: true,
  },
  {
    id: "dynamic-dreamz",
    title: "Dynamic Dreamz Internship",
    tagline: "Full Stack Development Intern",
    description:
      "Building backend-agnostic commerce middleware and pixel-accurate storefronts at a Premier Shopify Partner serving real client deployments.",
    bullets: [
      "Backend-agnostic middleware adapter in Next.js — swap Shopify / WooCommerce / MedusaJS with zero UI changes",
      "Pixel-accurate storefronts from Figma designs with MedusaJS v2 API integration (SSR, route-based data fetching)",
      "Code reviews and cross-functional collaboration in a production Shopify Partner environment",
    ],
    tech: ["Next.js", "MedusaJS v2", "Shopify", "WooCommerce", "Figma", "TailwindCSS"],
    liveUrl: "",
    githubUrl: "",
    accentColor: "#2563eb",
    size: "small",
    hasIframe: false,
  },
]