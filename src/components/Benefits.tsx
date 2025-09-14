"use client";

import { motion } from "framer-motion";

const benefits = [
  "Save hours weekly with automation.",
  "Boost collaboration across teams.",
  "AI-driven insights for smarter decisions.",
  "Secure & scalable for any business size.",
];

export default function Benefits() {
  return (
    <section className="relative bg-viridian-950 py-20 px-6 overflow-hidden">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 w-[160%] h-[90%] left-[-30%] rounded-full bg-gradient-to-b from-emerald-400 via-emerald-600 to-viridian-950 opacity-60 blur-3xl z-0"></motion.div>

      {/* Decorative floating elements */}
      {/* <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-36 h-36 bg-emerald-300/20 rounded-full blur-2xl z-0"></motion.div>
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-1/4 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl z-0"></motion.div> */}

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center text-emerald-300 mb-12">
        Benefits of Using Our Platform
      </motion.h2>

      <ul className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {benefits.map((benefit, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center bg-viridian-900 p-6 rounded-xl shadow-lg border border-emerald-400/20 hover:border-emerald-400/40 transition-all">
            <span className="text-emerald-300 text-xl font-semibold">
              {benefit}
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
