"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const roles = [
  {
    company: "TikTok Shop",
    title: "Senior Program Manager - Restricted Products",
    period: "2024 - Present",
    description: "Built an OCR + LLM-powered pipeline increasing seller acceptance rates by 38% QoQ. Driving AI models that review 1.5M listings daily across global markets.",
    metric: "1.5M",
    metricLabel: "listings daily",
    tagLabel: "AI / LLM",
    tagColor: "bg-[#2a3d2e] text-[#8fba9a]",
    metricColor: "text-[#8fba9a]",
  },
  {
    company: "Sendoso",
    title: "Senior PM - Campaign Creation & Marketplace",
    period: "2022 - 2023",
    description: "Led end-to-end launch of a Campaign Creation and Marketplace MVP generating $x00K+ in quarterly revenue. Defined roadmap for the Intelligent Sending platform.",
    metric: "$x00k",
    metricLabel: "one quarter",
    tagLabel: "MarTech",
    tagColor: "bg-[#3d2e1e] text-[#c4956a]",
    metricColor: "text-[#c4956a]",
  },
  {
    company: "Sendoso",
    title: "PM - Marketplace, Catalog & Assortment",
    period: "2022 - 2023",
    description: "Built a GraphQL API unifying 150,000+ SKUs across Engineering and Data Science. Improved 3rd party integrations to automate catalog management.",
    metric: "150K",
    metricLabel: "SKUs unified",
    tagLabel: "API",
    tagColor: "bg-[#2e2a3d] text-[#9a8fc4]",
    metricColor: "text-[#9a8fc4]",
  },
  {
    company: "Drop",
    title: "Senior PM - Community Growth",
    period: "2021",
    description: "Launched Drop Keycap Club - a novel eCommerce subscription product that acquired 1,000 new subscribers in 90 days and drove $100K in Q4 revenue.",
    metric: "1,000",
    metricLabel: "subscribers in 90 days",
    tagLabel: "DTC",
    tagColor: "bg-[#3d2e1e] text-[#c4956a]",
    metricColor: "text-[#c4956a]",
  },
];

function RoleCard({ role, index }: { role: (typeof roles)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
      className="grid md:grid-cols-12 gap-6 py-6 border-t border-[#3e3b33]"
    >
      <div className="md:col-span-3">
        <p className="text-[10px] tracking-[0.1em] uppercase text-[#6b6455] mb-1">{role.period}</p>
        <p className="text-[13px] font-medium text-[#c4b89a] mb-3">{role.company}</p>
        <span className={`text-[10px] px-2 py-1 tracking-[0.06em] uppercase ${role.tagColor}`}>{role.tagLabel}</span>
      </div>
      <div className="md:col-span-6">
        <h3 className="text-[13px] font-medium text-[#e8dcc8] mb-2">{role.title}</h3>
        <p className="text-[12px] text-[#6b6455] leading-relaxed">{role.description}</p>
      </div>
      <div className="md:col-span-3 flex md:justify-end">
        <div className="text-right">
          <p className={`font-display text-[24px] font-bold leading-none ${role.metricColor}`}>{role.metric}</p>
          <p className="text-[10px] text-[#6b6455] mt-1">{role.metricLabel}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoleScroll() {
  return (
    <section id="work" className="px-8 md:px-20 max-w-5xl mx-auto py-16">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-[11px] tracking-[0.16em] uppercase text-[#6b6455] mb-8"
      >
        Work Experience
      </motion.p>
      {roles.map((role, index) => (
        <RoleCard key={index} role={role} index={index} />
      ))}
    </section>
  );
}
