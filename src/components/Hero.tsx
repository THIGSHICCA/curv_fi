"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

export default function Hero() {
  const router = useRouter();

  const finalCount = 20; // Final active users
  const [count, setCount] = useState(0);

  // Animate number on mount
  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = finalCount / (duration / 16); // approx 60fps

    const interval = setInterval(() => {
      start += increment;
      if (start >= finalCount) {
        start = finalCount;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto relative flex flex-col items-start justify-center px-16 py-20">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full text-center text-5xl md:text-[190pt] text-[50pt] font-extrabold leading-tight mb-16
          bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--color-viridian-100)] to-[var(--color-viridian-400)]"
      >
        CURV FI
      </motion.h1>

      {/* Subheading and Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-2xl flex flex-col md:items-start items-center"
      >
        <p className="text-lg text-center  sm:text-left md:text-xl text-[var(--color-viridian-100)] mb-6">
          Automate repetitive tasks, optimize collaboration, and make smarter
          decisions with our next-gen AI platform built for businesses of all sizes.
        </p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/auth")}
          className="bg-gradient-to-r from-white/80 via-[var(--color-viridian-300)] to-[var(--color-viridian-400)] 
            text-[var(--color-viridian-950)] font-semibold px-8 py-4 rounded-xl shadow-lg transition-all"
        >
          Start Free Trial
        </motion.button>
      </motion.div>

      {/* Active User Count (Right Side) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="mt-12 w-full flex justify-center sm:justify-end"
      >
        <div className="flex flex-col items-center gap-1 text-[var(--color-viridian-100)] font-bold">
          {/* Number with Icon */}
          <div className="flex items-center gap-2 text-3xl md:text-5xl">
            <FaUsers className="text-[var(--color-viridian-300)] text-3xl md:text-5xl" />
            <span>{count}+</span>
          </div>

          {/* Label */}
          <span className="text-lg md:text-2xl">Active Users</span>
        </div>
      </motion.div>

    </section>
  );
}
