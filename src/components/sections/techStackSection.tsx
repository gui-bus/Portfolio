import { getTranslations } from "next-intl/server";
import { SectionAnimationWrapper } from "@/components/common/sectionAnimationWrapper";
import Image from "next/image";

export async function TechStackSection() {
  const t = await getTranslations("TechStack");

  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/React.svg" },
        { name: "NextJS", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/NextJS.svg" },
        { name: "Typescript", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Typescript.svg" },
        { name: "Tailwind", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/TailwindCSS.svg" },
        { name: "ShadCN", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/ShadCNUI.svg" },
        { name: "Framer Motion", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Framer%20Motion.svg" },
        { name: "Phosphor Icons", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Phosphor%20Icons.svg" },
      ],
    },
    {
      title: "Estado / Requisições / Validação",
      skills: [
        { name: "React Hook Form", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/React%20Hook%20Form.svg" },
        { name: "React Query", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/React%20Query.svg" },
        { name: "Tanstack Query", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Tanstack.svg" },
        { name: "Zustand", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Zustand.svg" },
        { name: "Axios", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Axios.svg" },
        { name: "Zod", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Zod.svg" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node JS", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/NodeJS.svg" },
        { name: "Nest JS", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/NestJS.svg" },
      ],
    },
    {
      title: "Banco de Dados",
      skills: [
        { name: "Prisma", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/PrismaORM.svg" },
        { name: "Postgresql", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/PostgreSQL.svg" },
        { name: "Redis", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Redis.svg" },
      ],
    },
    {
      title: "Arquitetura / Filas / APIs",
      skills: [
        { name: "BullMQ", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/BullMQ.svg" },
        { name: "Scalar", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Scalar.svg" },
      ],
    },
    {
      title: "Autenticação",
      skills: [
        { name: "JWT", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/JWT.svg" },
        { name: "Next Auth", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Next%20Auth.svg" },
        { name: "Clerk", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Clerk.svg" },
      ],
    },
    {
      title: "Serviços",
      skills: [
        { name: "UploadThing", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Uploadthing.svg" },
        { name: "Resend", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Resend.svg" },
        { name: "Sanity", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Sanity.svg" },
      ],
    },
    {
      title: "Testes",
      skills: [
        { name: "Jest", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Jest.svg" },
        { name: "Vitest", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Vitest.svg" },
        { name: "Cypress", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Cypress.svg" },
        { name: "Playwright", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Playwright.svg" },
      ],
    },
    {
      title: "Qualidade",
      skills: [
        { name: "ESLint", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/ESLint.svg" },
        { name: "Biome", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Biome.svg" },
        { name: "Husky", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Husky.svg" },
        { name: "Conventional Commits", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Conventional%20Commits.svg" },
        { name: "Semantic Release", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Semantic%20Release.svg" },
      ],
    },
    {
      title: "Infra / DevOps",
      skills: [
        { name: "Docker", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Docker.svg" },
        { name: "Git", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/GIT.svg" },
        { name: "Github Actions", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Github%20Actions.svg" },
        { name: "Turborepo", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Turborepo.svg" },
        { name: "pnpm", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/pnpm.svg" },
        { name: "Vercel", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Vercel.svg" },
        { name: "Render", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Render.svg" },
      ],
    },
    {
      title: "Design / Gestão",
      skills: [
        { name: "Figma", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Figma.svg" },
        { name: "ClickUp", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/ClickUp.svg" },
        { name: "Google Analytics", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Analytics.svg" },
      ],
    },
    {
      title: "IA",
      skills: [
        { name: "Cursor", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Cursor.svg" },
        { name: "Gemini", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Gemini.svg" },
        { name: "Codex", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Codex.svg" },
        { name: "Antigravity", src: "https://github.com/gui-bus/TechIcons/blob/main/Dark/Antigravity.svg" },
      ],
    },
  ];

  return (
    <section
      id="tech-stack"
      className="relative py-32 bg-background transition-colors duration-500 overflow-hidden grid-tech"
    >
      <div className="relative z-10 max-w-400 mx-auto px-6">
        <div className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yellow-600 dark:bg-yellow-500" />
              <span className="text-yellow-600 dark:text-yellow-500 text-[10px] font-mono tracking-[0.5em] uppercase font-black">
                {t("tag")}
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-foreground leading-[0.8] tracking-tighter uppercase">
              {t("title_top")} <br />
              <span className="outline-text-global italic">
                {t("title_bottom")}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4">
            <p className="text-muted-foreground text-lg font-light leading-relaxed border-l border-border dark:border-white/10 pl-8">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <SectionAnimationWrapper className="space-y-16">
          {skillCategories.map((category) => (
            <div key={category.title} className="border-b border-border dark:border-white/5 pb-10 last:border-0 last:pb-0">
              <h3 className="text-xs font-mono tracking-[0.3em] uppercase text-yellow-600 dark:text-yellow-500 font-black mb-8">
                {"//"} {category.title}
              </h3>
              <div className="flex flex-wrap gap-6 items-center">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="relative group p-4 border border-border dark:border-white/5 hover:border-yellow-600/30 dark:hover:border-yellow-500/30 transition-all duration-300 bg-muted/5 hover:bg-yellow-600/3 dark:hover:bg-yellow-500/2 rounded-none flex items-center justify-center"
                    title={skill.name}
                  >
                    <Image
                      src={skill.src}
                      alt={skill.name}
                      height={50}
                      width={50}
                      unoptimized
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </SectionAnimationWrapper>
      </div>
    </section>
  );
}
