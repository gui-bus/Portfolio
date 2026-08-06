"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "./themeToggle";
import { LanguageSwitcher } from "./languageSwitcher";
import { cn } from "@/lib/utils";
import { fadeIn } from "@/lib/animations";
import { Logo } from "./logo";
import Link from "next/link";
import Image from "next/image";

interface NavItemProps {
  item: { key: string; href: string };
  t: (key: string) => string;
  active: boolean;
  onClick?: () => void;
}

function NavItem({ item, t, active, onClick }: NavItemProps) {
  const isExternal = item.href.startsWith("http");

  return (
    <Link
      href={item.href}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={cn(
        "text-[10px] font-mono font-black transition-all relative group uppercase tracking-[0.2em] flex items-center gap-2 py-2",
        active
          ? "text-yellow-600 dark:text-yellow-500"
          : "text-muted-foreground/60 dark:text-zinc-500 hover:text-foreground dark:hover:text-white",
      )}
    >
      <motion.span
        className={cn(
          "h-px bg-yellow-600 dark:bg-yellow-500 transition-all duration-300",
          active ? "w-3" : "w-0 group-hover:w-3",
        )}
      />
      {t(item.key)}
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const t = useTranslations("Header");

  const navItems = [
    { key: "about", href: "#about-me" },
    { key: "work", href: "#projects" },
    { key: "tech", href: "#tech-stack" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          
          if (id && window.location.hash !== `#${id}`) {
            window.history.replaceState(null, "", `#${id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const sections = ["about-me", "projects", "tech-stack", "github-activity"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className={cn(
          "px-4 md:px-12 w-full",
        )}
      >
        <div
          className={cn(
            "w-full max-w-400 mx-auto flex items-center justify-around transition-all duration-500 px-6 bg-transparent border-transparent py-5",
          )}
        >
          <div className="flex items-center gap-12">
            <motion.a
              href="/"
              className="relative z-10 block shrink-0"
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <Logo width={scrolled ? 90 : 110} height={32} />
            </motion.a>

            <nav className="hidden 2xl:flex items-center gap-10">
              {navItems.map((item) => (
                <NavItem
                  key={item.key}
                  item={item}
                  t={t}
                  active={activeSection === item.href.replace("#", "")}
                />
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="https://github.com/gui-bus"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity flex items-center justify-center"
              >
                <Image
                  src="/utils/icons/github_white.svg"
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="hidden dark:block object-contain"
                />
                <Image
                  src="/utils/icons/github_black.svg"
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="block dark:hidden object-contain"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/gui-bus/"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity flex items-center justify-center mr-2"
              >
                <Image
                  src="/utils/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </Link>
              <LanguageSwitcher />
              <ThemeToggle />
            </div>



            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="2xl:hidden p-3 bg-muted/30 dark:bg-white/3 border border-border dark:border-white/5 text-foreground cursor-pointer transition-colors hover:border-yellow-600 dark:hover:border-yellow-500"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <XIcon size={20} weight="bold" />
              ) : (
                <ListIcon size={20} weight="bold" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="fixed inset-0 z-90 bg-background/98 dark:bg-[#050505]/98 backdrop-blur-2xl 2xl:hidden flex flex-col pt-32 px-8"
          >
            {/* Close Button inside Overlay */}
            <div className="absolute top-[22px] right-14">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-3 bg-muted/30 dark:bg-white/3 border border-border dark:border-white/5 text-foreground cursor-pointer transition-colors hover:border-yellow-600 dark:hover:border-yellow-500"
                aria-label="Close Menu"
              >
                <XIcon size={20} weight="bold" />
              </button>
            </div>

            <div className="flex flex-col gap-8 mb-12">
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-yellow-600 dark:text-yellow-500 font-bold border-b border-border dark:border-white/5 pb-4">
                {t("navigation_menu")}
              </span>
              <div className="flex flex-col gap-6">
                {navItems.map((item, index) => {
                  const isExternal = item.href.startsWith("http");

                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          "text-4xl font-black uppercase tracking-tighter transition-colors flex items-center gap-4 group",
                          activeSection === item.href.replace("#", "")
                            ? "text-yellow-600 dark:text-yellow-500"
                            : "text-foreground hover:text-yellow-600 dark:hover:text-yellow-500",
                        )}
                      >
                        <span className="text-xs font-mono tracking-widest text-muted-foreground/40 group-hover:text-yellow-600/40">
                          0{index + 1}
                        </span>
                        {t(item.key)}
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-auto pb-12 flex flex-col gap-8 border-t border-border dark:border-white/5 pt-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                  {t("social")}
                </span>
                <div className="flex items-center gap-4">
                  <Link
                    href="https://github.com/gui-bus"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity flex items-center justify-center"
                  >
                    <Image
                      src="/utils/icons/github_white.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="hidden dark:block object-contain"
                    />
                    <Image
                      src="/utils/icons/github_black.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="block dark:hidden object-contain"
                    />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/gui-bus/"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity flex items-center justify-center"
                  >
                    <Image
                      src="/utils/icons/linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border dark:border-white/5 pt-6">
                <span className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                  {t("preferences")}
                </span>
                <div className="flex items-center gap-4">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
