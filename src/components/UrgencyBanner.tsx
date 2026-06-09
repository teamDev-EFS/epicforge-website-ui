import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

const UrgencyBanner: React.FC = () => {
  const { openModal } = useCalendly();

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden py-5"
      style={{
        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #9333ea 70%, #a855f7 100%)",
      }}
    >
      {/* Shimmer */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-4 h-4 text-white/70" />
              <span className="text-sm font-semibold">
                Currently accepting{" "}
                <span className="font-black text-white">5 new projects</span> this month
                {" "}·{" "}
                <span className="text-white/80">3 strategy call slots remaining</span>
              </span>
            </div>
          </div>
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group flex-shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm bg-white text-indigo-700 hover:bg-white/95 shadow-md transition-all"
          >
            Secure Your Spot
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default UrgencyBanner;
