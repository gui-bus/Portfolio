"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpIcon } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "./logo";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function Footer() {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");

  const navItems = [
    { key: "about", href: "#about-me" },
    { key: "work", href: "#projects" },
    { key: "tech", href: "#tech-stack" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background text-foreground overflow-hidden py-16 border-t border-border dark:border-white/5 transition-colors duration-500">
      <div className="max-w-400 mx-auto px-6 relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-10 pb-12"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-3 items-center md:items-start"
          >
            <Logo width={120} height={38} />
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-6">
            <Link
              href="https://github.com/gui-bus"
              target="_blank"
              rel="noreferrer"
              className="group transition-transform hover:-translate-y-1 duration-300"
            >
              <Image
                src="/utils/icons/github_white.svg"
                alt="GitHub"
                width={40}
                height={40}
                className="hidden dark:block object-contain"
              />
              <Image
                src="/utils/icons/github_black.svg"
                alt="GitHub"
                width={40}
                height={40}
                className="block dark:hidden object-contain"
              />
            </Link>

            <Link
              href="https://linkedin.com/in/guibus"
              target="_blank"
              rel="noreferrer"
              className="group transition-transform hover:-translate-y-1 duration-300"
            >
              <Image
                src="/utils/icons/linkedin.svg"
                alt="LinkedIn"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
          </motion.div>
        </motion.div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] font-black">
              © {new Date().getFullYear()} GUIBUS.DEV
            </p>

            <div className="hidden md:block h-3 w-px bg-border dark:bg-white/10" />

            <nav className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-muted-foreground hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors text-[10px] font-mono uppercase tracking-[0.2em] font-black"
                >
                  {tHeader(item.key)}
                </Link>
              ))}
            </nav>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors cursor-pointer font-black"
          >
            {t("back_to_top")}
            <div className="p-2 border border-border dark:border-white/10 group-hover:border-yellow-600 dark:group-hover:border-yellow-500 group-hover:bg-yellow-600/5 transition-all">
              <ArrowUpIcon
                weight="bold"
                size={12}
                className="group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
