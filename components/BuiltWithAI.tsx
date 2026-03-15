"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BuiltWithAI() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-8 md:px-20 max-w-5xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#242218] rounded-lg p-8"
      >
        <p className="text-[13px] font-medium text-[#c4b89a] mb-6">This site was built with AI</p>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-[11px] font-medium text-[#8fba9a] mb-2 tracking-[0.06em] uppercase">The Stack</p>
            <p className="text-[12px] text-[#6b6455] leading-relaxed">Next.js 14, Tailwind CSS, and Framer Motion. Deployed on Vercel with a GitHub auto-deploy pipeline.</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#8fba9a] mb-2 tracking-[0.06em] uppercase">The AI Layer</p>
            <p className="text-[12px] text-[#6b6455] leading-relaxed">Claude acted as Tech Lead throughout — architecting the system, writing the code, and debugging in real time. The chat is powered by the Anthropic API.</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#8fba9a] mb-2 tracking-[0.06em] uppercase">The Process</p>
            <p className="text-[12px] text-[#6b6455] leading-relaxed">Built in sprint mode with zero prior fullstack experience. Every component, API route, and deployment step was a new concept learned in context.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
