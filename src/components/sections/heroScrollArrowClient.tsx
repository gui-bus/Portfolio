"use client";

import { motion } from "framer-motion";
import { ArrowDownIcon } from "@phosphor-icons/react";

const portfolioUrl = "https://portfolio.magui.studio";

export function ScrollArrowClient() {
  return (
    <motion.a
      href={portfolioUrl}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center w-16 h-16 rounded-full border border-border dark:border-white/10 hover:bg-yellow-600 hover:border-yellow-600 transition-all group"
    >
      <ArrowDownIcon
        size={24}
        className="group-hover:text-white transition-colors"
      />
    </motion.a>
  );
}
