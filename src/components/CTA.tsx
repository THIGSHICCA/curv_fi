"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CTA() {
  const router = useRouter();

  return (
    <section className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl py-20 px-6 text-center text-emerald-700">
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-4xl md:text-5xl font-extrabold mb-6">
        Ready to Supercharge Your Workflow?
      </motion.h2>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
        Start your free trial today. No credit card required.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/auth")}
        className="bg-gradient-to-r from-white/50 via-[var(--color-viridian-300)] to-[var(--color-viridian-400)] 
            text-[var(--color-viridian-950)] font-semibold px-8 py-4 rounded-xl shadow-lg transition-all">
        Get Started Free
      </motion.button>
    </section>
  );
}
