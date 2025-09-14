"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CTA() {
  const router = useRouter();

  return (
    <section className="relative bg-gradient-to-r from-emerald-500 to-emerald-700 py-20 px-6 text-center text-white">
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
        className="bg-white text-emerald-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-emerald-100 transition-all">
        Get Started Free
      </motion.button>
    </section>
  );
}
