"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="px-8 md:px-20 max-w-5xl mx-auto py-32 border-t border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-6">Lets connect</p>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">Lets build something.</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <a href="mailto:cm.firstenberg@gmail.com" className="px-6 py-3 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-700 transition-colors inline-block">cm.firstenberg@gmail.com</a>
          <a href="https://www.linkedin.com/in/firstenbergc/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-gray-300 text-sm tracking-wide hover:border-gray-900 transition-colors inline-block">LinkedIn</a>
          <Link href="/chat" className="px-6 py-3 border border-gray-300 text-sm tracking-wide hover:border-gray-900 transition-colors inline-block">Ask me anything</Link>
        </div>
      </motion.div>
    </section>
  );
}
