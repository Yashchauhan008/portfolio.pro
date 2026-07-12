import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import ProjectArchive from "@/components/ProjectArchive";
import { ScrollProgress } from "@/components/ScrollFx";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "The full archive of projects by Yash Chauhan — client work, products, and experiments built with React, Next.js, and Node.js.",
  alternates: { canonical: `${siteConfig.url}/projects` },
};

export default function ProjectsPage() {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Nav />
      <ProjectArchive />
    </SmoothScroll>
  );
}
