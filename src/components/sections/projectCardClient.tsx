"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { GithubLogoIcon, ArrowsOutSimpleIcon } from "@phosphor-icons/react";
import { ProjectLogoClient } from "./projectLogoClient";
import Link from "next/link";
import { CodeIcon } from "@phosphor-icons/react";

interface ProjectCardClientProps {
  index: number;
  project: {
    id: string;
    title: string;
    category: string;
    description: string;
    logoId?: string;
    repo?: string;
    repos?: { label: string; url: string }[];
    demo?: string;
    tags: string[];
    githubHint?: string;
    ctaGithub?: string;
    ctaLive?: string;
  };
}

export function ProjectCardClient({ index, project }: ProjectCardClientProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const line = card.querySelector(".animated-line");

    const tl = gsap.timeline({ paused: true });
    tl.to(line, { width: "100%", duration: 0.5, ease: "power2.out" });

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const hasRepo = !!project.repo || (!!project.repos && project.repos.length > 0);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-background p-10 md:p-12 overflow-hidden transition-colors hover:bg-muted/50 dark:hover:bg-zinc-900/20 flex flex-col justify-between min-h-[450px]"
    >
      <div className="absolute inset-0 bg-yellow-500/3 dark:bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full justify-between gap-8">
        <div>
          {/* Top Row: Index and Logo */}
          <div className="flex justify-between items-start mb-8">
            <span className="text-4xl font-black text-muted dark:text-zinc-900 group-hover:text-black dark:group-hover:text-white transition-colors">
              0{index + 1}
            </span>
            
            <div className="h-10 relative flex items-center">
              {project.logoId ? (
                <ProjectLogoClient
                  projectId={project.logoId}
                  alt={`${project.title} Logo`}
                />
              ) : (
                <CodeIcon size={32} className="text-yellow-600 dark:text-yellow-500" weight="thin" />
              )}
            </div>
          </div>

          {/* Category & Title */}
          <span className="text-[9px] font-mono uppercase tracking-widest text-yellow-600 dark:text-yellow-500 mb-2 block font-black">
            [{project.category}]
          </span>
          <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors text-foreground">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed font-light mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono border border-border dark:border-white/10 px-2 py-0.5 uppercase tracking-widest text-muted-foreground bg-background dark:bg-transparent"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions & Hint */}
        <div className="space-y-4 border-t border-border dark:border-white/5 pt-6 mt-auto">
          {hasRepo && project.githubHint && (
            <p className="text-[10px] font-mono text-muted-foreground/60 leading-relaxed">
              * {project.githubHint}
            </p>
          )}

          <div className="flex flex-wrap gap-6">
            {project.repos ? (
              project.repos.map((r) => (
                <Link
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  className="flex items-center gap-2 group/link text-[10px] font-mono uppercase tracking-[0.2em] font-black text-foreground hover:text-yellow-600 transition-colors"
                >
                  <GithubLogoIcon size={16} />
                  {r.label}
                </Link>
              ))
            ) : project.repo ? (
              <Link
                href={project.repo}
                target="_blank"
                className="flex items-center gap-2 group/link text-[10px] font-mono uppercase tracking-[0.2em] font-black text-foreground hover:text-yellow-600 transition-colors"
              >
                <GithubLogoIcon size={16} />
                {project.ctaGithub || "GitHub"}
              </Link>
            ) : null}

            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                className="flex items-center gap-2 group/link text-[10px] font-mono uppercase tracking-[0.2em] font-black text-foreground hover:text-yellow-600 transition-colors"
              >
                <ArrowsOutSimpleIcon size={16} />
                {project.ctaLive || "Live Demo"}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="animated-line absolute bottom-0 left-0 h-0.5 w-0 bg-yellow-600 dark:bg-yellow-500" />
    </motion.div>
  );
}
