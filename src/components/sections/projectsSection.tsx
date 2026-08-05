import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowsOutSimpleIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { ProjectLogoClient } from "./projectLogoClient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export async function ProjectsSection() {
  const t = await getTranslations("ProjectsSection");
  const tProjects = await getTranslations("Projects");

  const projects = [
    {
      id: "atlas",
      title: tProjects("atlas.title"),
      category: tProjects("atlas.category"),
      description: tProjects("atlas.description"),
      results: [
        tProjects("atlas.results.0"),
        tProjects("atlas.results.1"),
        tProjects("atlas.results.2"),
        tProjects("atlas.results.3"),
      ],
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
      results: [
        tProjects("lume.results.0"),
        tProjects("lume.results.1"),
        tProjects("lume.results.2"),
        tProjects("lume.results.3"),
      ],
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
      results: [
        tProjects("bloom.results.0"),
        tProjects("bloom.results.1"),
        tProjects("bloom.results.2"),
        tProjects("bloom.results.3"),
      ],
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
      results: [
        tProjects("magui.results.0"),
        tProjects("magui.results.1"),
        tProjects("magui.results.2"),
        tProjects("magui.results.3"),
      ],
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
      results: [
        tProjects("techicons.results.0"),
        tProjects("techicons.results.1"),
        tProjects("techicons.results.2"),
        tProjects("techicons.results.3"),
      ],
      logoId: "techicons",
      repo: "https://github.com/gui-bus/TechIcons",
      demo: "https://techicons.guibus.dev/",
      tags: ["Open Source", "SVG Assets", "CI/CD", "Automation"],
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-44 bg-background text-foreground overflow-hidden transition-colors duration-500 grid-projects border-b border-border dark:border-white/5"
    >
      <div className="max-w-400 mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
          <div className="lg:col-span-12">
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
        </div>

        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {projects.map((project) => (
              <CarouselItem key={project.id} className="basis-full">
                <div className="group relative p-8 md:p-12 border border-border dark:border-white/5 hover:border-yellow-600/30 dark:hover:border-yellow-500/30 bg-muted/5 transition-all duration-500 flex flex-col lg:flex-row justify-between gap-12 select-none h-full">
                  {/* Project Branding & Logo */}
                  <div className="flex flex-col gap-6 justify-between lg:w-1/3">
                    <div className="space-y-4">
                      <ProjectLogoClient
                        projectId={project.logoId}
                        alt={`${project.title} Logo`}
                      />
                      <p className="text-xs font-mono uppercase tracking-widest text-yellow-600 dark:text-yellow-500 font-black">
                        {project.category}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono border border-border dark:border-white/10 px-2.5 py-1 uppercase tracking-widest text-muted-foreground bg-background dark:bg-transparent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex flex-col gap-6 lg:w-2/3 justify-between">
                    <div className="space-y-6">
                      <p className="text-base font-light text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      <ul className="space-y-2 border-t border-border dark:border-white/5 pt-6">
                        {project.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed">
                            <span className="text-yellow-600 dark:text-yellow-500 mt-1 font-mono">0{idx + 1}.</span>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-mono text-muted-foreground/60 border-t border-border dark:border-white/5 pt-6 leading-relaxed">
                        * {t("github_hint")}
                      </p>

                      <div className="flex flex-wrap gap-6 pt-2">
                        <Link
                          href={project.repo}
                          target="_blank"
                          className="flex items-center gap-2 group/link text-[10px] font-mono uppercase tracking-[0.2em] font-black text-foreground hover:text-yellow-600 transition-colors"
                        >
                          <GithubLogoIcon size={16} />
                          {t("cta_github")}
                        </Link>

                        {project.demo && (
                          <Link
                            href={project.demo}
                            target="_blank"
                            className="flex items-center gap-2 group/link text-[10px] font-mono uppercase tracking-[0.2em] font-black text-foreground hover:text-yellow-600 transition-colors"
                          >
                            <ArrowsOutSimpleIcon size={16} />
                            {t("cta_live")}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Accent Hover Line */}
                  <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-yellow-600 dark:bg-yellow-500 transition-all duration-500" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Controls: Arrows and Dots */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border dark:border-white/5">
            <CarouselDots />
            
            <div className="flex gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
