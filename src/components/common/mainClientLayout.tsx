"use client";
import { motion } from "framer-motion";
// import { Header } from "@/components/common/header";
import { fadeIn } from "@/lib/animations";
import Image from "next/image";

interface MainClientLayoutProps {
  children: React.ReactNode;
}

export function MainClientLayout({ children }: MainClientLayoutProps) {
  return (
    <motion.div variants={fadeIn} initial="initial" animate="animate">
      {/* <Header /> */}
      <main className="relative">{children}</main>

      
      <div className="fixed bottom-8 left-0 right-0 z-50 pointer-events-none flex justify-center px-6">
        <div className="w-full max-w-[110rem] flex justify-end">
          <a
            href="https://wa.me/5512981847553"
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto bg-[#25D366] hover:bg-[#20ba5a] text-white p-5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
            aria-label="WhatsApp"
          >
            <Image
              src="/utils/icons/whatsapp.svg"
              alt="WhatsApp"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
