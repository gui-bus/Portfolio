"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";

export function ExperienceLogoClient() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!mounted) {
    return <div className="w-24 h-8 animate-pulse bg-muted rounded-none mb-2" />;
  }

  const isDark = resolvedTheme === "dark";
  const logoSrc = `/utils/experiences/unifahe/logo-${isDark ? "white" : "black"}.svg`;

  return (
    <div className="relative flex items-center mb-2">
      <Image
        src={logoSrc}
        alt="Unifahe Logo"
        width={112*2}
        height={40}
        priority
        unoptimized
        className="object-contain object-left"
      />
    </div>
  );
}
