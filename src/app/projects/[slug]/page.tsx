import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import CaseStudyPage from "@/components/CaseStudy";
import { ScrollProgress } from "@/components/ScrollFx";
import { caseStudies } from "@/lib/caseStudies";
import { siteConfig } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};
  return {
    title: `${study.title} — Case Study`,
    description: study.tagline,
    alternates: { canonical: `${siteConfig.url}/projects/${study.slug}` },
    openGraph: {
      title: `${study.title} — Case Study — ${siteConfig.name}`,
      description: study.tagline,
      url: `${siteConfig.url}/projects/${study.slug}`,
      images: [{ url: study.image }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Nav />
      <CaseStudyPage study={study} />
    </SmoothScroll>
  );
}
