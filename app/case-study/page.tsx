"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const caseStudy = {
  company: "TikTok Shop",
  role: "Senior Program Manager, Restricted Products",
  period: "2024 - Present",
  tags: ["AI/LLM", "Policy", "eCommerce", "Compliance"],
  tagColors: ["bg-[#2a3d2e] text-[#8fba9a]", "bg-[#3d2e1e] text-[#c4956a]", "bg-[#3d2e1e] text-[#c4956a]", "bg-[#2e2a3d] text-[#9a8fc4]"],
  headline: "Building a marketplace that is safe for consumers and open for business for sellers.",
  sections: [
    {
      label: "The Problem",
      content: "TikTok Shop is one of the fastest growing eCommerce platforms in the world. But with scale comes risk. Sellers listing restricted products without proper compliance documentation create real harm for consumers and regulatory exposure for the platform. My mandate was to build a program that could handle both sides of that equation - protecting consumers without shutting out legitimate sellers.",
    },
    {
      label: "The Approach",
      content: "I led the development of an OCR + LLM-powered intelligent document processing pipeline that could automatically review seller compliance materials for restricted category access. This shifted the review process from manual and inconsistent to scalable and accurate. The hardest part was not the technology - it was deciding what to build and in what order. With 1.5M listings reviewed daily, the wrong prioritization decision has real consequences for real sellers.",
    },
    {
      label: "The Outcome",
      content: "Seller acceptance rates for restricted categories increased by 38% QoQ. More sellers with legitimate products could reach TikTok's massive audience. Violative listings were caught faster and more consistently. The program now operates at a scale that would be impossible without the AI layer underneath it.",
    },
    {
      label: "What I Would Do Differently",
      content: "Talk to customers sooner. We spent significant time building internal alignment and defining the technical architecture before we had deep qualitative signal from the sellers actually going through the process. Earlier customer conversations would have sharpened our prioritization decisions and likely accelerated our timeline.",
    },
    {
      label: "What I Learned",
      content: "Compliance and growth are not opposites. The assumption that tighter restrictions hurt sellers is wrong when the program is designed well. A trustworthy marketplace attracts more buyers, which creates more opportunity for every seller on the platform. The best compliance programs are also growth programs.",
    },
  ],
  metric1: { value: "38%", label: "QoQ acceptance rate increase" },
  metric2: { value: "1.5M", label: "listings reviewed daily" },
};

export default function CaseStudyPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <main className="min-h-screen bg-[#2c2a24]">
      <nav className="flex justify-between items-center px-8 md:px-20 py-6 border-b border-[#3e3b33]">
        <span className="text-[11px] tracking-[0.14em] uppercase text-[#c4b89a]">Cory Firstenberg</span>
        <Link href="/" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6455] hover:text-[#c4b89a] transition-colors">
          Back to portfolio
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#8a7d60] mb-3">Case Study</p>
          <h1 className="font-display text-[52px] font-bold text-[#e8dcc8] leading-none mb-4">{caseStudy.company}</h1>
          <p className="text-[13px] text-[#6b6455] mb-2">{caseStudy.role}</p>
          <p className="text-[13px] text-[#6b6455] mb-6">{caseStudy.period}</p>
          <div className="flex flex-wrap gap-2 mb-10">
            {caseStudy.tags.map((tag, i) => (
              <span key={tag} className={`text-[10px] px-3 py-1 tracking-[0.06em] uppercase ${caseStudy.tagColors[i]}`}>{tag}</span>
            ))}
          </div>

          <p className="text-[22px] text-[#e8dcc8] leading-relaxed mb-12 font-display">{caseStudy.headline}</p>

          <div className="flex gap-12 mb-16 p-6 bg-[#242218] rounded-lg">
            <div>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#6b6455] mb-1">{caseStudy.metric1.label}</p>
              <p className="font-display text-[42px] font-bold text-[#8fba9a] leading-none">{caseStudy.metric1.value}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#6b6455] mb-1">{caseStudy.metric2.label}</p>
              <p className="font-display text-[42px] font-bold text-[#c4956a] leading-none">{caseStudy.metric2.value}</p>
            </div>
          </div>

          <div ref={ref} className="flex flex-col gap-12">
            {caseStudy.sections.map((section, i) => (
              <motion.div
                key={section.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="border-t border-[#3e3b33] pt-8"
              >
                <p className="text-[11px] tracking-[0.16em] uppercase text-[#6b6455] mb-4">{section.label}</p>
                <p className="text-[15px] text-[#c4b89a] leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-[#3e3b33] flex gap-6">
            <Link href="/" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6455] hover:text-[#c4b89a] transition-colors">
              Back to portfolio
            </Link>
            <Link href="/chat" className="text-[11px] tracking-[0.1em] uppercase text-[#6b6455] hover:text-[#c4b89a] transition-colors">
              Ask me about this
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
