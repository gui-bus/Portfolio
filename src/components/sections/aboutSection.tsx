import { getTranslations } from "next-intl/server";
import { SectionAnimationWrapper } from "@/components/common/sectionAnimationWrapper";
import { ExperienceLogoClient } from "./experienceLogoClient";
import Image from "next/image";

export async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section
      id="about-me"
      className="relative py-44 bg-background text-foreground overflow-hidden transition-colors duration-500 grid-approach border-b border-border dark:border-white/5"
    >
      <div className="max-w-400 mx-auto px-6 relative z-10">
        <SectionAnimationWrapper className="grid grid-cols-1 xl:grid-cols-12 gap-16 xl:gap-24">
          <div className="xl:col-span-6 flex flex-col">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-yellow-600 dark:bg-yellow-500" />
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-yellow-600 dark:text-yellow-500 font-black">
                  {t("tag")}
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-foreground mb-12">
                {t("title_top")} <br />
                <span className="outline-text-global italic">
                  {t("title_bottom")}
                </span>
              </h2>

              <div className="space-y-6 max-w-xl">
                <h3 className="text-xl font-bold uppercase tracking-tight italic">
                  {t("bio_title")}
                </h3>
                <p className="text-base font-light text-muted-foreground leading-relaxed">
                  {t("bio_description")}
                </p>
              </div>
            </div>
          </div>

          <div className="xl:col-span-6 flex flex-col gap-12 xl:pl-12 xl:border-l border-border dark:border-white/5">
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-yellow-600 dark:text-yellow-500 font-black block">
                [ {t("experience_title")} ]
              </span>

              <div className="space-y-4">
                <ExperienceLogoClient />
                <div className="space-y-2">
                  <h4 className="text-sm font-mono font-bold text-foreground uppercase tracking-wider">
                    {t("unifahe_role")}
                  </h4>
                  <p className="text-sm font-light text-muted-foreground leading-relaxed">
                    {t("unifahe_description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t border-border dark:border-white/5 pt-12">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-yellow-600 dark:text-yellow-500 font-black block">
                [ {t("education_title")} ]
              </span>

              <div className="space-y-6">
                <p className="text-sm font-light text-muted-foreground leading-relaxed">
                  {t("education_description")}
                </p>

                <div className="grid grid-cols-4 gap-6">
                  <Image
                    src="/utils/courses/ux-unicornio.svg"
                    alt="UX Unicórnio"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain object-left transition-transform duration-300 hover:scale-105 aspect-square w-full"
                  />
                  <Image
                    src="/utils/courses/design-boost.svg"
                    alt="Design Boost"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain object-left transition-transform duration-300 hover:scale-105 aspect-square w-full"
                  />
                  <Image
                    src="/utils/courses/sujeito-programador.svg"
                    alt="Sujeito Programador"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain object-left transition-transform duration-300 hover:scale-105 aspect-square w-full"
                  />
                  <Image
                    src="/utils/courses/fullstack-club.svg"
                    alt="Fullstack Club"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="object-contain object-left transition-transform duration-300 hover:scale-105 aspect-square w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </SectionAnimationWrapper>
      </div>
    </section>
  );
}
