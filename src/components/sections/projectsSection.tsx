import { getTranslations } from "next-intl/server";
import { SectionAnimationWrapper } from "@/components/common/sectionAnimationWrapper";
import { ProjectCardClient } from "./projectCardClient";
import Link from "next/link";
import Image from "next/image";

export async function ProjectsSection() {
  const t = await getTranslations("ProjectsSection");
  const tProjects = await getTranslations("Projects");

  const projects = [
    {
      id: "atlas",
      title: tProjects("atlas.title"),
      category: tProjects("atlas.category"),
      description: tProjects("atlas.description"),
      logoId: "atlas",
      repo: "https://github.com/gui-bus/Atlas-HRMS",
      demo: "https://atlas-web-pt7t.onrender.com/pt/",
      tags: [
        "TypeScript", "Node.js", "Next.js", "React", "Tailwind CSS",
        "shadcn/ui", "React Query", "Zustand", "Zod", "NestJS",
        "Prisma", "PostgreSQL", "JWT", "Axios", "Docker",
        "Vitest", "Playwright"
      ],
    },
    {
      id: "lume",
      title: tProjects("lume.title"),
      category: tProjects("lume.category"),
      description: tProjects("lume.description"),
      logoId: "lume",
      repo: "https://github.com/gui-bus/Lume",
      demo: "https://lume.guibus.dev",
      tags: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui",
        "Framer Motion", "React Hook Form", "Zod", "Prisma", "PostgreSQL",
        "Clerk", "nuqs", "Vitest", "Playwright"
      ],
    },
    {
      id: "bloom",
      title: tProjects("bloom.title"),
      category: tProjects("bloom.category"),
      description: tProjects("bloom.description"),
      logoId: "bloom",
      repo: "https://github.com/gui-bus/Bloom",
      demo: "https://bloom.guibus.dev/",
      tags: [
        "React", "Next.js", "TypeScript", "Tailwind CSS",
        "Framer Motion", "Vitest", "Playwright", "Biome"
      ],
    },
    {
      id: "powerfit",
      title: tProjects("powerfit.title"),
      category: tProjects("powerfit.category"),
      description: tProjects("powerfit.description"),
      logoId: "powerfit",
      repos: [
        { label: tProjects("powerfit.cta_frontend"), url: "https://github.com/gui-bus/POWERFIT-Frontend" },
        { label: tProjects("powerfit.cta_backend"), url: "https://github.com/gui-bus/POWERFIT-API" },
      ],
      tags: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui",
        "Framer Motion", "React Hook Form", "TanStack Query", "Axios",
        "Zod", "Vitest", "Fastify", "Prisma", "PostgreSQL", "Docker"
      ],
    },
    {
      id: "magui",
      title: tProjects("magui.title"),
      category: tProjects("magui.category"),
      description: tProjects("magui.description"),
      logoId: "landingpages",
      repo: "https://github.com/gui-bus/MAGUI-Landing-Pages",
      demo: "https://portfolio.magui.studio/",
      tags: [
        "React", "Next.js", "TypeScript", "Tailwind CSS",
        "Framer Motion", "ESLint"
      ],
    },
    {
      id: "techicons",
      title: tProjects("techicons.title"),
      category: tProjects("techicons.category"),
      description: tProjects("techicons.description"),
      logoId: "techicons",
      repo: "https://github.com/gui-bus/TechIcons",
      demo: "https://techicons.guibus.dev/",
      tags: ["Open Source", "SVG Assets", "CI/CD", "Automation"],
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-44 bg-background text-foreground overflow-hidden transition-colors duration-500 grid-approach border-b border-border dark:border-white/5"
    >
      <div className="max-w-400 mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow-600 dark:bg-yellow-500" />
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-yellow-600 dark:text-yellow-500 font-black">
                {t("tag")}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-foreground">
              {t("title_top")} <br />
              <span className="outline-text-global italic">
                {t("title_bottom")}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 border-l border-border pl-8 pb-2">
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              {t("github_hint")}
            </p>
          </div>
        </div>

        <SectionAnimationWrapper className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {projects.map((project, idx) => (
            <ProjectCardClient
              key={project.id}
              index={idx}
              project={{
                ...project,
                githubHint: t("github_hint"),
                ctaGithub: t("cta_github"),
                ctaLive: t("cta_live"),
              }}
            />
          ))}
        </SectionAnimationWrapper>

        <div className="mt-20 flex justify-center">
          <Link
            href="https://github.com/gui-bus"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 group cursor-pointer border border-border dark:border-white/10 px-8 py-5 bg-muted/5 hover:border-yellow-600 dark:hover:border-yellow-500 transition-all duration-300 select-none text-[11px] font-mono uppercase tracking-[0.2em] font-black text-foreground"
          >
            <Image
              src="/utils/icons/github_white.svg"
              alt="GitHub"
              width={20}
              height={20}
              className="hidden dark:block object-contain"
            />
            <Image
              src="/utils/icons/github_black.svg"
              alt="GitHub"
              width={20}
              height={20}
              className="block dark:hidden object-contain"
            />
            <span>{t("explore_all_github")}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
