"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "How do I price a website project as a freelancer?",
    a: "CurvFi lets you input features like pages, forms, SEO, and calculates a fair price instantly.",
  },
  {
    q: "How do agencies plan SaaS project budgets?",
    a: "Agencies use CurvFi to break down features, integrations, and infrastructure costs for SaaS projects.",
  },
  {
    q: "Can CurvFi help freelancers win more clients?",
    a: "Yes. Transparent budget breakdowns build trust and help you close deals faster.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="md:py-24 py-10 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 bg-white bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="p-6 rounded-2xl bg-gradient-to-br from-viridian-950/60 to-viridian-800/40 backdrop-blur-lg border border-white/10 shadow-xl cursor-pointer transition-all hover:shadow-emerald-500/20"
            >
              {/* Question */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold text-viridian-50">
                  {faq.q}
                </h3>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-viridian-200"
                >
                  <FiChevronDown size={22} />
                </motion.span>
              </div>

              {/* Answer */}
              {isOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 text-viridian-100/80 leading-relaxed"
                >
                  {faq.a}
                </motion.p>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
