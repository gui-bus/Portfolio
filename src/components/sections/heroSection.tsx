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
import Link from "next/link";
import Image from "next/image";

const portfolioUrl = "#projects";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section className="relative bg-background text-foreground flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden transition-colors duration-500 grid-hero py-44!">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        <HeroSectionClient>
          <div className="lg:col-span-12 flex flex-col items-center text-center">
            {/* Center Top: Profile Image */}
            <div className="mb-10">
              <HeroImageAnimation>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-yellow-600/20 dark:bg-yellow-500/10 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative overflow-hidden rounded-full border border-border dark:border-white/10 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 shadow-2xl">
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

            {/* Tagline */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <span className="w-6 h-px bg-yellow-600 dark:bg-yellow-500" />
              <span className="text-[10px] font-mono text-yellow-600 dark:text-yellow-500 uppercase tracking-[0.4em] font-black">
                {t("location")}
              </span>
              <span className="w-6 h-px bg-yellow-600 dark:bg-yellow-500" />
            </div>

            {/* Giant Centered Name */}
            <HeroTitleAnimation>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black leading-[0.85] tracking-[-0.07em] uppercase text-foreground mb-12">
                {t("title_top")} <br />
                <span className="outline-text-global italic">
                  {t("title_bottom")}
                </span>
              </h1>
            </HeroTitleAnimation>

            {/* Cards & Status */}
            <HeroDescriptionAnimation>
              <div className="flex flex-col items-center gap-12 w-full">
                {/* Horizontal centered info cards */}
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

                {/* Status indicator and Projects CTA */}
                <div className="flex flex-col sm:flex-row items-center gap-8 border-t border-border dark:border-white/5 pt-8 w-full max-w-md justify-center">
                  <div className="flex items-center gap-2.5">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-muted-foreground">
                      {t("status")}
                    </span>
                  </div>

                  <div className="hidden sm:block w-px h-4 bg-border dark:bg-white/10" />

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
            </HeroDescriptionAnimation>
          </div>
        </HeroSectionClient>
      </div>
    </section>
  );
}
