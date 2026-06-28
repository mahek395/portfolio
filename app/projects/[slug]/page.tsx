import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetail from "@/components/sections/ProjectDetail";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}
