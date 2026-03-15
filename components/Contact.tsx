"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="px-8 md:px-20 max-w-5xl mx-auto pt-16 pb-12 border-t border-[#3e3b33]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-[11px] tracking-[0.18em] uppercase text-[#6b6455] mb-3">
          Let's connect
        </p>
        <h2 className="font-display text-[42px] font-bold text-[#e8dcc8] leading-tight mb-10">
          Let's build<br />something.
        </h2>

        <div className="grid md:grid-cols-3 gap-8 border-t border-[#3e3b33] pt-8">
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[#6b6455] mb-3">Navigation</p>
            <a href="#work" className="block text-[13px] text-[#c4b89a] mb-2 hover:text-[#8fba9a] transition-colors">Work</a>
            <Link href="/chat" className="block text-[13px] text-[#c4b89a] mb-2 hover:text-[#8fba9a] transition-colors">Chat with Cory</Link>
            <a href="#contact" className="block text-[13px] text-[#c4b89a] mb-2 hover:text-[#8fba9a] transition-colors">Contact</a>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[#6b6455] mb-3">Connect</p>
            <a href="https://www.linkedin.com/in/firstenbergc/" target="_blank" rel="noopener noreferrer" className="block text-[13px] text-[#c4b89a] mb-2 hover:text-[#8fba9a] transition-colors">LinkedIn</a>
            <a href="mailto:cm.firstenberg@gmail.com" className="block text-[13px] text-[#c4b89a] mb-2 hover:text-[#8fba9a] transition-colors">cm.firstenberg@gmail.com</a>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.16em] uppercase text-[#6b6455] mb-3">This site</p>
            <p className="text-[12px] text-[#6b6455] leading-relaxed">Built with Next.js, Tailwind, and Claude. Deployed on Vercel.</p>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-[#3e3b33] mt-8 pt-6">
          <span className="text-[11px] text-[#4a4740]">2025 Cory Firstenberg</span>
          <span className="text-[11px] text-[#4a4740]">Built with <span className="text-[#6b6455]">Claude</span></span>
        </div>
      </motion.div>
    </section>
  );
}
