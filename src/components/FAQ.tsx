"use client";

import { motion } from "framer-motion";

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
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-viridian-100/20 backdrop-blur-md shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
            <p className="text-viridian-50/80">{faq.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
