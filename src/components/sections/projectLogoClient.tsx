"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

interface ProjectLogoProps {
  projectId: string;
  alt: string;
}

export function ProjectLogoClient({ projectId, alt }: ProjectLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!mounted) {
    return <div className="w-44 h-16 animate-pulse bg-muted rounded-none" />;
  }

  const isDark = resolvedTheme === "dark";
  const logoSrc = `/projects/logos/${projectId}/logo_${isDark ? "white" : "black"}.svg`;
  const logoWidth = projectId === "nexus" ? 80 : (projectId === "atlas" || projectId === "bloom" ? 96 : 128);

  return (
    <div className="relative flex items-center justify-end">
      <Image
        src={logoSrc}
        alt={alt}
        width={logoWidth}
        height={96}
        priority
        unoptimized
        className="object-contain object-left"
      />
    </div>
  );
}
