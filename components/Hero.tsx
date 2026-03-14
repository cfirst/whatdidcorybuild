"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">PM and Builder</p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">Cory Firstenberg</h1>
        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mb-12">I build products at the intersection of AI, compliance, and commerce. 7+ years shipping things that scale.</p>
        <div className="flex gap-6">
          <a href="#work" className="px-6 py-3 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-700 transition-colors">See my work</a>
          <Link href="/chat" className="px-6 py-3 border border-gray-300 text-sm tracking-wide hover:border-gray-900 transition-colors">Ask me anything</Link>
        </div>
      </motion.div>
    </section>
  );
}
