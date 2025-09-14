"use client";

import { motion } from "framer-motion";
import { Code, Calculator, Globe } from "lucide-react";

const useCases = [
  {
    title: "Website Projects",
    desc: "Easily calculate how much to charge for a responsive website with SEO optimization.",
    icon: Code,
  },
  {
    title: "Freelance Software Pricing",
    desc: "Break down features, time, and cost to price your freelance projects confidently.",
    icon: Calculator,
  },
  {
    title: "SaaS & Agency Projects",
    desc: "Plan SaaS budgets, feature costs, and scaling expenses before starting development.",
    icon: Globe,
  },
];

export default function UseCases() {
  return (
    <section className="md:py-30 py-10  px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">
        Who Can Use CurvFi?
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {useCases.map((use, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-viridian-950/60 to-viridian-800/40 backdrop-blur-lg border border-white/10 shadow-xl cursor-pointer transition-all hover:shadow-emerald-500/20 ">
            <use.icon className="w-12 h-12 mb-4 text-emerald-400" />
            <h3 className="text-xl font-semibold mb-3">{use.title}</h3>
            <p className="text-viridian-50/80">{use.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
