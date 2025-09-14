"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20  ">
      {/* Gradient arch background */}
      {/* <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 w-[160%] h-[90%] left-[-30%] rounded-full bg-gradient-to-b from-emerald-400 via-emerald-600 to-viridian-950 opacity-60 blur-3xl z-0"></motion.div>


      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-36 h-36 bg-emerald-300/20 rounded-full blur-2xl z-0"></motion.div>
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-1/4 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl z-0"></motion.div> */}

      {/* Heading */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-200 z-10">
        AI-Powered Workflow <br /> Solutions for{" "}
        <span className="text-emerald-300">Modern Teams</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative text-lg md:text-xl text-viridian-50 max-w-2xl mb-10 z-10">
        Automate repetitive tasks, optimize collaboration, and make smarter
        decisions with our next-gen AI platform built for businesses of all
        sizes.
      </motion.p>

      {/* CTA */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/auth")}
          className="bg-emerald-400 hover:bg-emerald-500 text-viridian-950 font-semibold px-6 py-4 rounded-xl rounded-br-3xl shadow-lg transition-all">
          Start Free Trial
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/auth")}
          className="border border-emerald-400 text-viridian-50 hover:text-white hover:border-emerald-200 px-6 py-4 rounded-xl shadow-lg transition-all">
          Login
        </motion.button>
      </div>
    </section>
  );
}
