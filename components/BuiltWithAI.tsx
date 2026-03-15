"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function BuiltWithAI() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-8 md:px-20 max-w-5xl mx-auto py-20 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Meta</p>
        <h2 className="text-3xl font-bold tracking-tight mb-6">This site was built with AI</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="font-semibold text-gray-900 mb-2">The Stack</p>
            <p className="text-gray-500 text-sm leading-relaxed">Built on Next.js 14, Tailwind CSS, and Framer Motion. Deployed on Vercel with a GitHub auto-deploy pipeline.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">The AI Layer</p>
            <p className="text-gray-500 text-sm leading-relaxed">Claude acted as Tech Lead throughout — architecting the system, writing the code, and debugging errors in real time. The chat feature is powered by the Anthropic API.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-2">The Process</p>
            <p className="text-gray-500 text-sm leading-relaxed">Built in sprint mode with zero prior fullstack experience. Every component, API route, and deployment step was a new concept learned in context.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
