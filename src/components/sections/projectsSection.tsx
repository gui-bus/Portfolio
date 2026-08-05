import { getTranslations } from "next-intl/server";
import { SectionAnimationWrapper } from "@/components/common/sectionAnimationWrapper";
import { ProjectCardClient } from "./projectCardClient";

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
      tags: ["NestJS", "Next.js", "Prisma", "PostgreSQL"],
    },
    {
      id: "lume",
      title: tProjects("lume.title"),
      category: tProjects("lume.category"),
      description: tProjects("lume.description"),
      logoId: "lume",
      repo: "https://github.com/gui-bus/Lume",
      demo: "https://lume.guibus.dev",
      tags: ["Next.js", "React 19", "Zod", "Clerk"],
    },
    {
      id: "bloom",
      title: tProjects("bloom.title"),
      category: tProjects("bloom.category"),
      description: tProjects("bloom.description"),
      logoId: "bloom",
      repo: "https://github.com/gui-bus/Bloom",
      demo: "https://bloom.guibus.dev/",
      tags: ["React 19", "Tailwind v4", "Radix UI", "Vitest"],
    },
    {
      id: "magui",
      title: tProjects("magui.title"),
      category: tProjects("magui.category"),
      description: tProjects("magui.description"),
      logoId: "landingpages",
      repo: "https://github.com/gui-bus/MAGUI-Landing-Pages",
      demo: "https://portfolio.magui.studio/",
      tags: ["React", "Next.js", "TypeScript", "Tailwind v4"],
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
    {
      id: "placeholder",
      title: tProjects("placeholder.title"),
      category: tProjects("placeholder.category"),
      description: tProjects("placeholder.description"),
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
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
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-xs">
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
      </div>
    </section>
  );
}
