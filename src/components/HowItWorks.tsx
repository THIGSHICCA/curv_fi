"use client";

import { Zap, Cpu, Settings, Monitor } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "1. Getting Inputs",
    description:
      "Users submit their project requirements or data to get started.",
    icon: Zap,
  },
  {
    title: "2. Processing with AI",
    description:
      "Our AI analyzes the inputs and generates initial insights quickly.",
    icon: Cpu,
  },
  {
    title: "3. Handling Complex Logic",
    description:
      "Advanced algorithms handle complicated calculations & planning.",
    icon: Settings,
  },
  {
    title: "4. Planning & Presenting",
    description:
      "Results are neatly visualized and presented for decision-making.",
    icon: Monitor,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto relative">
      <h2 className="text-4xl font-bold text-center mb-16 text-viridian-50">
        How It Works
      </h2>
      <div className="flex flex-col gap-12 md:gap-20">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}>
            <div className="relative z-10 p-8 rounded-3xl shadow-xl bg-viridian-100/30 backdrop-blur-md max-w-md">
              <div className="flex items-center gap-4 mb-4">
                <step.icon className="w-8 h-8 text-viridian-400" />
                <h3 className="text-xl font-semibold text-viridian-50">
                  {step.title}
                </h3>
              </div>
              <p className="text-viridian-50/80">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
