"use client";

import { motion } from "framer-motion";

// Define a few circles with different sizes, positions, speeds, and colors
const circles = [
  { size: 40, top: 20, left: 10, color: "bg-emerald-500/40", duration: 8 },
  { size: 60, top: 50, left: 70, color: "bg-emerald-500/30", duration: 12 },
  { size: 50, top: 75, left: 30, color: "bg-emerald-500/35", duration: 10 },
  { size: 80, top: 10, left: 50, color: "bg-emerald-500/25", duration: 15 },
  { size: 30, top: 40, left: 20, color: "bg-emerald-500/45", duration: 7 },
];

export default function DarkAnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-viridian-950 overflow-hidden">
      {/* High-grain subtle overlay for texture */}
      <div className="absolute inset-0 bg-viridian-950/90 backdrop-blur-sm" />

      {/* Animated floating circles */}
      {circles.map((circle, i) => (
        <motion.div
          key={i}
          animate={{
            y: [circle.top, circle.top + Math.random() * 50 - 25, circle.top],
            x: [
              circle.left,
              circle.left + Math.random() * 50 - 25,
              circle.left,
            ],
            borderRadius: ["50%", "40%", "50%", "60%", "50%"], // morph shape
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            width: circle.size,
            height: circle.size,
          }}
          className={`absolute ${circle.color} blur-3xl`}
        />
      ))}
    </div>
  );
}
