"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { fadeInUp } from "@/lib/animations";

interface TechCardClientProps {
  tech: {
    name: string;
    iconSrcLight: string;
    iconSrcDark: string;
    description: string;
  };
  index: number;
}

export function TechCardClient({ tech, index }: TechCardClientProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const iconSrc = resolvedTheme === "dark" ? tech.iconSrcDark : tech.iconSrcLight;

  useEffect(() => {
    if (!cardRef.current) return;

    const floatingAnimation = gsap.to(cardRef.current, {
      y: -10,
      duration: 2 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.1,
    });

    return () => {
      floatingAnimation.kill();
    };
  }, [index]);

  return (
    <motion.div variants={fadeInUp} className="group relative">
      <div
        ref={cardRef}
        className="relative p-10 h-full flex flex-col items-start justify-between min-h-55 bg-background dark:bg-zinc-900/10 border border-border dark:border-zinc-800/50 hover:border-yellow-600 dark:hover:border-yellow-500/40 transition-all duration-500 overflow-hidden"
      >
        <span className="text-[10px] font-mono text-muted-foreground/40 dark:text-zinc-700 group-hover:text-yellow-600 dark:group-hover:text-yellow-500/50 transition-colors font-bold">
          0{index + 1}
        </span>

        <div className="relative z-10 flex flex-col gap-4">
          <motion.div
          >
            <Image
              src={iconSrc}
              alt={tech.name}
              width={32}
              height={32}
              className="object-contain"
            />
          </motion.div>
          <div>
            <h4 className="font-bold text-foreground text-xl tracking-tight uppercase italic">
              {tech.name}
            </h4>
            <p className="text-[9px] text-muted-foreground/60 dark:text-zinc-600 mt-1 uppercase tracking-[0.2em] font-mono group-hover:text-yellow-600 dark:group-hover:text-zinc-400 transition-colors">
              {tech.description}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-yellow-600/3 dark:from-yellow-500/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}
