import React from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

const TECH_ROW1 = [
  { name: "React", color: "#38bdf8", bg: "rgba(56,189,248,0.12)" },
  { name: "Next.js", color: "#e2e8f0", bg: "rgba(226,232,240,0.08)" },
  { name: "TypeScript", color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  { name: "Node.js", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
  { name: "Python", color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  { name: "AI / ML", color: "#c084fc", bg: "rgba(192,132,252,0.12)" },
  { name: "OpenAI", color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  { name: "React Native", color: "#22d3ee", bg: "rgba(34,211,238,0.12)" },
  { name: "Flutter", color: "#38bdf8", bg: "rgba(56,189,248,0.12)" },
  { name: "Expo", color: "#e2e8f0", bg: "rgba(226,232,240,0.08)" },
  { name: "PostgreSQL", color: "#93c5fd", bg: "rgba(147,197,253,0.12)" },
  { name: "MongoDB", color: "#4ade80", bg: "rgba(74,222,128,0.12)" },
];

const TECH_ROW2 = [
  { name: "AWS", color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  { name: "Docker", color: "#38bdf8", bg: "rgba(56,189,248,0.12)" },
  { name: "Kubernetes", color: "#93c5fd", bg: "rgba(147,197,253,0.12)" },
  { name: "GraphQL", color: "#f472b6", bg: "rgba(244,114,182,0.12)" },
  { name: "Solidity", color: "#94a3b8", bg: "rgba(148,163,184,0.10)" },
  { name: "Ethereum", color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
  { name: "Stripe", color: "#818cf8", bg: "rgba(129,140,248,0.12)" },
  { name: "Firebase", color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  { name: "Supabase", color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  { name: "Redis", color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  { name: "TensorFlow", color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
  { name: "Figma", color: "#f472b6", bg: "rgba(244,114,182,0.12)" },
];

const ScrollRow: React.FC<{ items: typeof TECH_ROW1; reverse?: boolean }> = ({ items, reverse }) => {
  const doubled = [...items, ...items];
  const totalWidth = items.length * 160;

  return (
    <div className="relative overflow-hidden">
      {/* Dark fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #0f172a 0%, transparent 100%)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #0f172a 0%, transparent 100%)" }} />

      <motion.div
        className="flex items-center gap-3 py-2"
        animate={{ x: reverse ? [`-${totalWidth}px`, "0px"] : ["0px", `-${totalWidth}px`] }}
        transition={{ duration: reverse ? 50 : 40, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {doubled.map((tech, i) => (
          <motion.div
            key={`${tech.name}-${i}`}
            whileHover={{ scale: 1.08, y: -3 }}
            className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl cursor-default select-none"
            style={{
              minWidth: "148px",
              background: "rgba(17,24,39,0.8)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-[11px]"
              style={{ background: tech.bg, color: tech.color }}
            >
              {tech.name.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-sm font-bold whitespace-nowrap" style={{ color: "#cbd5e1" }}>
              {tech.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const TechBanner: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#0f172a" }}>
      {/* Top + bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(139,92,246,0.3), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(139,92,246,0.3), transparent)" }} />

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 px-4"
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-5"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Cpu className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Technologies We Master</span>
        </div>
        <h2
          className="font-black text-white leading-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
        >
          Powered by the{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 60%, #e879f9 100%)" }}
          >
            Best-in-Class Stack
          </span>
        </h2>
      </motion.div>

      <div className="space-y-4">
        <ScrollRow items={TECH_ROW1} />
        <ScrollRow items={TECH_ROW2} reverse />
      </div>
    </section>
  );
};

export default TechBanner;
