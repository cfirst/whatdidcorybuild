"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const roles = [
  {
    company: "TikTok Shop",
    title: "Senior Program Manager - Restricted Products",
    period: "2024 - Present",
    description: "Led product strategy and GTM for TikTok Shop Restricted Products program. Built an OCR and LLM-powered document processing pipeline that increased seller acceptance rates by 38% QoQ. Driving AI models that review 1.5M listings daily.",
    metric: "1.5M listings reviewed daily",
    tags: ["AI/LLM", "Policy", "eCommerce"],
  },
  {
    company: "Sendoso",
    title: "Senior Product Manager - Campaign Creation and Marketplace",
    period: "2022 - 2023",
    description: "Defined the roadmap and executed product strategy for Sendoso Intelligent Sending platform. Led end-to-end launch of a new Campaign Creation and Marketplace MVP that generated $800K in quarterly revenue.",
    metric: "$800K in one quarter",
    tags: ["MarTech", "Growth", "MVP"],
  },
  {
    company: "Sendoso",
    title: "Product Manager - Marketplace, Catalog and Assortment",
    period: "2022 - 2023",
    description: "Built a GraphQL-based API to unify product catalog data across 150,000 SKUs. Scaled the service across Engineering and Data Science organizations and improved 3rd party API integrations.",
    metric: "150,000 SKUs unified",
    tags: ["API", "Platform", "Data"],
  },
  {
    company: "Drop",
    title: "Senior Product Manager - Community Growth",
    period: "2021",
    description: "Drove $100K in Q4 revenue by launching Drop Keycap Club, a novel eCommerce subscription product that acquired 1,000 new subscribers within 3 months.",
    metric: "1,000 subscribers in 90 days",
    tags: ["DTC", "Subscriptions", "Growth"],
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
      className="grid md:grid-cols-12 gap-8 py-16 border-t border-gray-100"
    >
      <div className="md:col-span-3">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">{role.period}</p>
        <p className="font-semibold text-gray-900">{role.company}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {role.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-500">{tag}</span>
          ))}
        </div>
      </div>
      <div className="md:col-span-6">
        <h3 className="text-lg font-semibold mb-3">{role.title}</h3>
        <p className="text-gray-500 leading-relaxed">{role.description}</p>
      </div>
      <div className="md:col-span-3 flex md:justify-end">
        <div className="text-right">
          <p className="text-3xl font-bold text-gray-900 leading-tight">{role.metric.split(" ")[0]}</p>
          <p className="text-sm text-gray-400 mt-1">{role.metric.split(" ").slice(1).join(" ")}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoleScroll() {
  return (
    <section id="work" className="px-8 md:px-20 max-w-5xl mx-auto py-20">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-widest text-gray-400 mb-16"
      >
        Work Experience
      </motion.h2>
      {roles.map((role, index) => (
        <RoleCard key={index} role={role} index={index} />
      ))}
    </section>
  );
}
