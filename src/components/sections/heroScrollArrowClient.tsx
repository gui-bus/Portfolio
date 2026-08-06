"use client";

import { motion } from "framer-motion";
import { CaretDownIcon } from "@phosphor-icons/react";

export function ScrollArrowClient() {
  return (
    <motion.a
      href="#about-me"
      animate={{
        y: [0, 8, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}

    >
      <CaretDownIcon
        size={18}
        className="group-hover:text-white dark:group-hover:text-black transition-colors"
      />
    </motion.a>
  );
}
