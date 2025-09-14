// "use client";

// import { motion } from "framer-motion";
// import { DollarSign, Globe, Rocket } from "lucide-react";

// const items = [
//   {
//     title: "Accurate Pricing",
//     desc: "No more guessing. Get project cost estimations that reflect real effort & complexity.",
//     icon: DollarSign,
//   },
//   {
//     title: "Works for Any Project",
//     desc: "From websites to SaaS apps to enterprise tools, CurvFi adapts to your needs.",
//     icon: Globe,
//   },
//   {
//     title: "Save Time & Win Clients",
//     desc: "Show transparent cost breakdowns and impress clients with clarity.",
//     icon: Rocket,
//   },
// ];

// export default function WhyCurvFi() {
//   return (
//     <section className="py-24 px-6 max-w-6xl mx-auto text-center ">
//       <h2 className="text-4xl font-bold mb-12">Why Choose CurvFi?</h2>
//       <div className="grid md:grid-cols-3 gap-12 ">
//         {items.map((item, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: i * 0.2 }}
//             className="p-8 rounded-3xl bg-viridian-100/20 backdrop-blur-md shadow-lg">
//             <item.icon className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
//             <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
//             <p className="text-viridian-50/80">{item.desc}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }
