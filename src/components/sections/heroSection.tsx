import {
  FingerprintIcon,
  CpuIcon,
  ArrowRightIcon,
  FileTextIcon,
} from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";
import {
  HeroSectionClient,
  HeroTitleAnimation,
  HeroDescriptionAnimation,
  HeroImageAnimation,
} from "./heroSectionClient";
import { ThemeToggle } from "@/components/common/themeToggle";
import { LanguageSwitcher } from "@/components/common/languageSwitcher";
import Link from "next/link";
import Image from "next/image";

const portfolioUrl = "#projects";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative bg-background text-foreground flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden transition-colors duration-500 grid-hero pt-20 md:pt-28 pb-20">
      <div className="w-full relative z-10">
        <HeroSectionClient>
          <div className="lg:col-span-12 flex flex-col items-center text-center">
            <div className="mb-10">
              <HeroImageAnimation>
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-full border border-border dark:border-white/10 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56">
                    <Image
                      src="/images/profile.jpg"
                      alt={t("branding")}
                      fill
                      className="object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                      priority
                    />
                  </div>
                </div>
              </HeroImageAnimation>
            </div>

            <div className="flex justify-center items-center gap-3 mb-6">
              <span className="w-6 h-px bg-yellow-600 dark:bg-yellow-500" />
              <span className="text-[10px] font-mono text-yellow-600 dark:text-yellow-500 uppercase tracking-[0.4em] font-black">
                {t("location")}
              </span>
              <span className="w-6 h-px bg-yellow-600 dark:bg-yellow-500" />
            </div>

            <HeroTitleAnimation>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.85] tracking-[-0.07em] uppercase text-foreground mb-12">
                {t("title_top")} <br />
                <span className="outline-text-global italic">
                  {t("title_bottom")}
                </span>
              </h1>
            </HeroTitleAnimation>

            <HeroDescriptionAnimation>
              <div className="flex flex-col items-center gap-12 w-full">
                {/* Cinematic Info Cards */}
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-4 px-6 py-4 cinematic-card group hover:border-yellow-600/40 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-yellow-600/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    <CpuIcon
                      size={24}
                      weight="thin"
                      className="text-yellow-600 dark:text-yellow-500 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] font-mono uppercase tracking-widest font-black text-foreground">
                        {t("stack_expert")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 px-6 py-4 cinematic-card group hover:border-yellow-600/40 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-yellow-600/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    <FingerprintIcon
                      size={24}
                      weight="thin"
                      className="text-yellow-600 dark:text-yellow-500 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] font-mono uppercase tracking-widest font-black text-foreground">
                        {t("design_specialist")}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="https://lume.guibus.dev/pt/share/guilherme-bustamante"
                    target="_blank"
                    className="flex items-center gap-4 px-6 py-4 cinematic-card group hover:border-yellow-600/40 transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-yellow-600/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    <FileTextIcon
                      size={24}
                      weight="thin"
                      className="text-yellow-600 dark:text-yellow-500 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] font-mono uppercase tracking-widest font-black">
                        {t("cv_cta")}
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Symmetrical Utility and Actions Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border dark:border-white/5 pt-8 w-full max-w-2xl">
                  {/* Left Side: Status & Socials */}
                  <div className="flex items-center gap-6">
                    {/* Status */}
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground">
                        {t("status")}
                      </span>
                    </div>

                    <div className="w-px h-3 bg-border dark:bg-white/10" />

                    {/* Socials */}
                    <div className="flex items-center gap-4">
                      <Link
                        href="https://github.com/gui-bus"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-transform hover:scale-110 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Image
                          src="/utils/icons/github_white.svg"
                          alt="GitHub"
                          width={18}
                          height={18}
                          className="hidden dark:block object-contain"
                        />
                        <Image
                          src="/utils/icons/github_black.svg"
                          alt="GitHub"
                          width={18}
                          height={18}
                          className="block dark:hidden object-contain"
                        />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/gui-bus/"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-transform hover:scale-110 flex items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Image
                          src="/utils/icons/linkedin.svg"
                          alt="LinkedIn"
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Right Side: Preferences & CTA */}
                  <div className="flex items-center gap-6">
                    {/* Language & Theme switchers */}
                    <div className="flex items-center gap-4">
                      <LanguageSwitcher />
                      <ThemeToggle />
                    </div>

                    <div className="w-px h-3 bg-border dark:bg-white/10" />

                    {/* Explorar Projetos Link */}
                    <Link
                      href={portfolioUrl}
                      className="flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest font-black group-hover:text-yellow-600 transition-colors">
                        {t("cta_projects")}
                      </span>
                      <ArrowRightIcon
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </HeroDescriptionAnimation>
          </div>
        </HeroSectionClient>
      </div>
    </section>
  );
}
