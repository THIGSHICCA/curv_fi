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
    <section className="md:py-30 py-10 px-6 max-w-6xl mx-auto relative">
      <h2 className="text-4xl font-bold text-center mb-16 text-viridian-50">
        How It Works
      </h2>

      <div className="relative flex flex-col gap-12 md:gap-16">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            {/* Connector Line (except last step) */}
            {index !== steps.length - 1 && (
              <div className="hidden md:block absolute left-1/2 top-full w-0.5 h-16 bg-gradient-to-b from-viridian-400/40 to-viridian-600/30" />
            )}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative z-10 p-8 rounded-3xl bg-gradient-to-br from-viridian-950/60 to-viridian-800/40 backdrop-blur-lg border border-white/10 shadow-xl max-w-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <step.icon className="w-10 h-10 text-viridian-400" />
                <h3 className="text-xl font-semibold text-viridian-50">
                  {step.title}
                </h3>
              </div>
              <p className="text-viridian-50/80">{step.description}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
