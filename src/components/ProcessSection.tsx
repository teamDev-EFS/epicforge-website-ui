import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Search, Layers, Code2, Rocket, ArrowRight, CalendarDays, CheckCircle2,
} from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

const STEPS = [
  {
    num: "01", icon: Search, title: "Discovery & Strategy",
    description:
      "We start by listening. We map your goals, constraints, and opportunities in a free strategy session — no assumptions, no templates.",
    bullets: ["Goals & requirements audit", "Competitive landscape review", "Custom project roadmap"],
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    glow: "rgba(79,70,229,0.18)",
    accent: "#818cf8",
    checkBg: "rgba(99,102,241,0.15)",
  },
  {
    num: "02", icon: Layers, title: "Architecture & Design",
    description:
      "We design the full technical architecture: system design, UI/UX wireframes, data models, and API contracts — before a single line of code.",
    bullets: ["UI/UX wireframes & prototypes", "System & database architecture", "Tech stack selection"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
    glow: "rgba(124,58,237,0.18)",
    accent: "#a78bfa",
    checkBg: "rgba(124,58,237,0.15)",
  },
  {
    num: "03", icon: Code2, title: "Development & Testing",
    description:
      "Agile sprints, transparent updates, zero surprises. We ship clean tested code with bi-weekly milestones and live staging environments.",
    bullets: ["Agile bi-weekly delivery sprints", "QA, unit & integration testing", "Staging access throughout"],
    gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
    glow: "rgba(8,145,178,0.18)",
    accent: "#22d3ee",
    checkBg: "rgba(8,145,178,0.15)",
  },
  {
    num: "04", icon: Rocket, title: "Launch & Scale",
    description:
      "We don't disappear after launch. We handle deployment, monitor performance, and continue evolving the product as your business grows.",
    bullets: ["Production deployment & DevOps", "Performance monitoring & alerts", "Ongoing support & iterations"],
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    glow: "rgba(5,150,105,0.18)",
    accent: "#34d399",
    checkBg: "rgba(5,150,105,0.15)",
  },
];

const StepCard: React.FC<{ step: typeof STEPS[0]; i: number }> = ({ step, i }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-100, 100], [10, -10]);
  const rotY = useTransform(mx, [-100, 100], [-10, 10]);
  const shadowX = useTransform(mx, [-100, 100], [-16, 16]);
  const shadowY = useTransform(my, [-100, 100], [-8, 8]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      style={{ perspective: "1000px" }}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="group relative"
    >
      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          background: "rgba(17, 24, 39, 0.9)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([sx, sy]: number[]) =>
              `${sx}px ${sy + 24}px 60px rgba(0,0,0,0.3)`
          ) as any,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative rounded-3xl overflow-hidden h-full"
      >
        {/* Top accent stripe */}
        <div className="h-1.5" style={{ background: step.gradient }} />

        {/* Hover glow bg */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${step.glow} 0%, transparent 60%)` }}
        />

        {/* Giant decorative step number */}
        <div
          className="absolute right-4 top-8 font-black text-[6rem] leading-none select-none pointer-events-none"
          style={{
            background: step.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: 0.12,
          }}
        >
          {step.num}
        </div>

        <div className="relative z-10 p-8">
          {/* Icon */}
          <motion.div
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
            style={{ background: step.gradient }}
            whileHover={{ scale: 1.08, rotate: [0, -6, 6, 0] }}
            transition={{ duration: 0.4 }}
          >
            <step.icon className="w-8 h-8 text-white" />
            {/* Pulsing ring */}
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
              className="absolute inset-0 rounded-2xl"
              style={{ border: `2px solid ${step.accent}60` }}
            />
          </motion.div>

          {/* Step badge */}
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider mb-4 text-white"
            style={{ background: step.gradient }}
          >
            Step {i + 1}
          </div>

          <h3 className="text-xl font-black text-white mb-3 leading-tight">
            {step.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            {step.description}
          </p>

          <ul className="space-y-3">
            {step.bullets.map((b, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + j * 0.07 + 0.4 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: step.checkBg }}
                >
                  <CheckCircle2 className="w-3 h-3" style={{ color: step.accent }} />
                </div>
                <span className="text-slate-300 text-sm">{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProcessSection: React.FC = () => {
  const { openModal } = useCalendly();

  return (
    <section id="process" className="relative py-32 overflow-hidden" style={{ background: "#0a0f1a" }}>
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-7"
            style={{ background: "rgba(5,150,105,0.15)", border: "1px solid rgba(5,150,105,0.25)" }}
          >
            <Rocket className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">Our Process</span>
          </div>
          <h2
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
          >
            From Idea to
            {" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #34d399 0%, #22d3ee 50%, #818cf8 100%)" }}
            >
              Production in Weeks
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A proven 4-step process refined across 33+ projects — transparent, agile, and built around your outcomes.
          </p>
        </motion.div>

        {/* Animated connector line */}
        <div className="relative mb-16 hidden lg:block">
          <div className="flex justify-between items-center px-[12.5%]">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg z-10 relative"
                  style={{ background: step.gradient }}
                >
                  {i + 1}
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 mx-2 h-px relative overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.2 + 0.3, ease: "easeOut" }}
                      className="absolute inset-0 origin-left"
                      style={{ background: `linear-gradient(90deg, ${step.accent}, ${STEPS[i + 1].accent})` }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3D Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} i={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="text-center mt-20"
        >
          <p className="text-slate-500 text-base mb-6">
            Ready to start? Step 1 is a free 30-minute call — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl font-bold text-white text-sm overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, #059669 0%, #0891b2 55%, #4f46e5 100%)",
                boxShadow: "0 8px 32px rgba(16,185,129,0.25)",
              }}
            >
              <CalendarDays className="w-4 h-4" />
              Start Step 1 — Book Free Call
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.button>
            <motion.button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-slate-300 text-sm transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)"; e.currentTarget.style.color = "#818cf8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#cbd5e1"; }}
            >
              Send Us a Brief
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
