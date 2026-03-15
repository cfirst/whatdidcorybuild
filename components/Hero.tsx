"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-8 md:px-20 max-w-5xl mx-auto pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-[11px] tracking-[0.18em] uppercase text-[#8a7d60] mb-4">
          PM & Builder
        </p>
        <h1 className="font-display text-[64px] leading-none text-[#e8dcc8] mb-5 font-bold">
          Cory<br />Firstenberg
        </h1>
        <p className="text-[15px] text-[#7a7060] leading-relaxed max-w-md mb-8">
          Building products at the intersection of AI, compliance, and commerce. 7+ years shipping things that scale.
        </p>

        <div className="flex gap-8 mb-8 p-5 bg-[#242218] rounded-lg">
          <div>
            <p className="text-[10px] tracking-[0.1em] uppercase text-[#6b6455] mb-1">listings daily</p>
            <p className="font-display text-[30px] font-bold text-[#8fba9a] leading-none">1.5M</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.1em] uppercase text-[#6b6455] mb-1">revenue generated</p>
            <p className="font-display text-[30px] font-bold text-[#c4956a] leading-none">$x00K</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.1em] uppercase text-[#6b6455] mb-1">subscribers in 90 days</p>
            <p className="font-display text-[30px] font-bold text-[#9a8fc4] leading-none">1,000</p>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <span className="text-[10px] px-3 py-1 bg-[#2a3d2e] text-[#8fba9a] tracking-[0.06em] uppercase">AI / LLM</span>
          <span className="text-[10px] px-3 py-1 bg-[#3d2e1e] text-[#c4956a] tracking-[0.06em] uppercase">eCommerce</span>
          <span className="text-[10px] px-3 py-1 bg-[#2e2a3d] text-[#9a8fc4] tracking-[0.06em] uppercase">Platform</span>
        </div>

        <div className="flex gap-3">
          <a href="#work" className="px-5 py-3 bg-[#8fba9a] text-[#1a2e1e] text-[11px] tracking-[0.1em] uppercase hover:bg-[#7aaa88] transition-colors">
            See my work
          </a>
          <Link href="/chat" className="px-5 py-3 border border-[#3e3b33] text-[#c4b89a] text-[11px] tracking-[0.1em] uppercase hover:border-[#6b6455] transition-colors">
            Ask me anything
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
