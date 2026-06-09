import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Clock, ArrowRight, Zap, LayoutGrid, Building2, Check, CalendarDays } from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

const MEETINGS = [
  {
    id: "strategy", title: "AI & Software Strategy Call",
    duration: "30 min", tag: "Quick Start",
    description: "Focused session to identify your biggest tech opportunities and map a clear path forward — no fluff, all signal.",
    url: "https://calendly.com/adityavardhan-epicforgesoftware/30min",
    Icon: Zap,
    gradientStyle: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    accent: "#22d3ee",
    glowColor: "rgba(6,182,212,0.12)",
    borderColor: "rgba(6,182,212,0.2)",
    points: ["Tech stack & growth opportunity assessment", "Quick wins & priority action items", "Custom roadmap snapshot"],
    featured: false,
  },
  {
    id: "discovery", title: "Project Discovery & Solution Architecture",
    duration: "45 min", tag: "Most Popular",
    description: "Deep-dive into your project goals, technical requirements, and end-to-end architecture — from idea to blueprint.",
    url: "https://calendly.com/adityavardhan-epicforgesoftware/project-discovery-solution-architecture",
    Icon: LayoutGrid,
    gradientStyle: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    accent: "#818cf8",
    glowColor: "rgba(99,102,241,0.15)",
    borderColor: "rgba(99,102,241,0.3)",
    points: ["Full requirements & scope analysis", "Architecture, tech stack & integrations", "Timeline, milestones & investment estimate"],
    featured: true,
  },
  {
    id: "enterprise", title: "Enterprise AI & Digital Transformation",
    duration: "1 hr", tag: "Enterprise",
    description: "Comprehensive strategy session covering enterprise AI transformation, systems integration, and measurable business impact.",
    url: "https://calendly.com/adityavardhan-epicforgesoftware/enterprise-ai-digital-transformation-consultation",
    Icon: Building2,
    gradientStyle: "linear-gradient(135deg, #f59e0b, #ea580c)",
    accent: "#fbbf24",
    glowColor: "rgba(245,158,11,0.12)",
    borderColor: "rgba(245,158,11,0.2)",
    points: ["Enterprise AI transformation roadmap", "Legacy system integration strategy", "ROI projections & business impact model"],
    featured: false,
  },
];

const MeetingCard: React.FC<{ m: typeof MEETINGS[0]; i: number }> = ({ m, i }) => {
  const { openModal } = useCalendly();
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-100, 100], [8, -8]);
  const rotY = useTransform(mx, [-100, 100], [-8, 8]);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <motion.div
      custom={i}
      initial={{ opacity: 0, y: 48, rotateX: 25 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group ${m.featured ? "lg:-mt-4 lg:mb-0" : ""}`}
      ref={cardRef}
      style={{ perspective: "900px" }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      {m.featured && (
        <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
          <span
            className="inline-flex items-center text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg tracking-wider uppercase"
            style={{ background: m.gradientStyle, boxShadow: `0 4px 20px ${m.accent}40` }}
          >
            Most Popular
          </span>
        </div>
      )}

      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          background: "rgba(17, 24, 39, 0.9)",
          border: `1px solid ${m.featured ? m.borderColor : "rgba(255,255,255,0.07)"}`,
          boxShadow: m.featured ? `0 20px 60px rgba(0,0,0,0.3)` : "none",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="flex-1 flex flex-col relative rounded-2xl overflow-hidden h-full"
      >
        {/* Inner hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 0%, ${m.glowColor} 0%, transparent 60%)` }}
        />

        <div className="relative flex flex-col flex-1 p-8">
          {/* Icon row */}
          <div className="flex items-center justify-between mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
              style={{ background: m.gradientStyle }}
            >
              <m.Icon className="w-7 h-7 text-white" />
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-300 text-sm font-medium">{m.duration}</span>
            </div>
          </div>

          {/* Tag */}
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest mb-2 text-transparent bg-clip-text"
            style={{ backgroundImage: m.gradientStyle }}
          >
            {m.tag}
          </span>

          <h3 className="text-lg font-bold text-white mb-3 leading-snug">{m.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{m.description}</p>

          {/* Points */}
          <ul className="space-y-2.5 mb-8">
            {m.points.map((pt, j) => (
              <li key={j} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: `${m.accent}20` }}
                >
                  <Check className="w-2.5 h-2.5" style={{ color: m.accent }} />
                </span>
                <span className="text-slate-300 text-sm">{pt}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 px-6 text-white font-bold rounded-xl flex items-center justify-center gap-2 overflow-hidden relative shadow-md"
            style={{ background: m.gradientStyle }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Book This Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ScheduleSection: React.FC = () => {
  return (
    <section id="schedule" className="relative py-28 overflow-hidden" style={{ background: "#0f172a" }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          {/* Urgency badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full"
            style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
            </span>
            <span className="text-[12px] font-bold text-red-400 tracking-wide">
              LIMITED — Only 3 strategy call slots left this month
            </span>
          </motion.div>

          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-7 block"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <CalendarDays className="w-4 h-4 text-indigo-400 inline mr-1" />
            <span className="text-sm font-semibold text-indigo-300">Free Consultation Calls</span>
          </div>

          <h2
            className="font-black text-white mb-5 leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            Book Your{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 60%, #e879f9 100%)" }}
            >
              Strategy Session
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the right conversation for your stage. Every call is free,
            zero pressure, and 100% focused on your outcomes.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {MEETINGS.map((m, i) => (
            <MeetingCard key={m.id} m={m} i={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center text-slate-500 text-sm mt-12"
        >
          All calls are <span className="text-slate-300 font-semibold">free</span> · No commitment required · Clients across{" "}
          <span className="text-slate-300 font-semibold">5+ countries</span>
        </motion.p>
      </div>
    </section>
  );
};

export default ScheduleSection;
