import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ArrowDown, CalendarDays, TrendingUp, Globe, Zap, Users, CheckCircle2 } from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

const ROTATING_SERVICES = [
  "AI-Powered Platforms", "Mobile Applications", "Enterprise Systems",
  "Blockchain Solutions", "Automation Tools",
];

const CLIENT_NAMES = [
  "ForgeOrion", "EximGTH", "NamasteExim", "VysyaRaju Jewellers", "AdOn Auto", "SunAutoFlow",
];

const METRICS = [
  { icon: TrendingUp, value: "33+", label: "Projects", color: "#818cf8" },
  { icon: Users, value: "15+", label: "Clients", color: "#a78bfa" },
  { icon: Globe, value: "5+", label: "Countries", color: "#c084fc" },
  { icon: Zap, value: "85%", label: "Automation", color: "#e879f9" },
];

const LINE_VARIANTS = {
  hidden: { y: "110%" },
  show: (d: number) => ({
    y: "0%",
    transition: { duration: 1.0, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

const PROJECTS_DASH = [
  { name: "ForgeOrion Platform", pct: 100, color: "#22c55e" },
  { name: "EximGTH — Global Trade", pct: 100, color: "#22c55e" },
  { name: "NamasteExim B2B Portal", pct: 88, color: "#818cf8" },
  { name: "AdOn Auto — Mobile App", pct: 62, color: "#fbbf24" },
];

const DashboardMockup: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-120, 120], [14, -14]);
  const rotY = useTransform(mx, [-120, 120], [-14, 14]);
  const shadowX = useTransform(mx, [-120, 120], [-16, 16]);
  const shadowY = useTransform(my, [-120, 120], [-8, 8]);

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ perspective: "900px" }}
      className="relative w-full max-w-[440px] mx-auto lg:mx-0"
    >
      <motion.div
        style={{
          rotateX: rotX, rotateY: rotY,
          background: "#111827",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([sx, sy]: number[]) =>
              `${sx}px ${sy + 24}px 80px rgba(79,70,229,0.4), 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)`
          ) as any,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="rounded-2xl overflow-hidden"
      >
        {/* Card header */}
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.06)" }}>
          <div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-0.5">EpicForge Dashboard</div>
            <div className="text-sm font-bold text-white">Project Command Center</div>
          </div>
          <div className="flex gap-1.5">
            {["#f87171","#fbbf24","#4ade80"].map(c => (
              <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {[
            { label: "Active Projects", val: "4", color: "#818cf8" },
            { label: "Delivered", val: "33+", color: "#22c55e" },
            { label: "Satisfaction", val: "4.9★", color: "#fbbf24" },
          ].map((m, i) => (
            <div key={m.label} className="px-4 py-3 text-center" style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div className="text-xl font-black" style={{ color: m.color }}>{m.val}</div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Project list */}
        <div className="px-5 py-4 space-y-3.5" style={{ background: "#0f172a" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-slate-300">Active & Delivered</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: "#818cf8", background: "rgba(99,102,241,0.15)" }}>Live</span>
          </div>
          {PROJECTS_DASH.map(p => (
            <div key={p.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-semibold text-slate-300">{p.name}</span>
                <span className="text-[11px] font-bold" style={{ color: p.color }}>{p.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.pct}%` }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: p.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tech pills */}
        <div className="px-5 pb-5 pt-3 flex flex-wrap gap-1.5" style={{ background: "#0f172a" }}>
          {["React", "Node.js", "Python", "AI/ML", "AWS", "Flutter"].map(t => (
            <span key={t} className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute -top-5 -right-4 rounded-xl px-3.5 py-2 flex items-center gap-2"
        style={{ background: "rgba(30,41,59,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-[11px] font-bold text-white">5+ Countries</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute -bottom-4 -left-4 rounded-xl px-3.5 py-2 flex items-center gap-2"
        style={{ background: "rgba(30,41,59,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
      >
        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
        <span className="text-[11px] font-bold text-white">Delivered Successfully</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute -bottom-4 right-8 rounded-xl px-3.5 py-2"
        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", boxShadow: "0 8px 32px rgba(79,70,229,0.4)" }}
      >
        <span className="text-[11px] font-bold text-white">4.9 / 5 Rating ⭐</span>
      </motion.div>
    </div>
  );
};

/* ── Hero ── */
const Hero: React.FC = () => {
  const { openModal } = useCalendly();
  const [serviceIndex, setServiceIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const rawY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  const contentOpacity = useSpring(rawOpacity, { stiffness: 120, damping: 30 });
  const contentScale = useSpring(rawScale, { stiffness: 120, damping: 30 });
  const contentY = useSpring(rawY, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const t = setInterval(() => setServiceIndex(p => (p + 1) % ROTATING_SERVICES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#0f172a" }}
    >
      {/* Mesh gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(at 15% 20%, rgba(99,102,241,0.18) 0px, transparent 50%),
            radial-gradient(at 85% 15%, rgba(139,92,246,0.14) 0px, transparent 50%),
            radial-gradient(at 5% 80%, rgba(79,70,229,0.1) 0px, transparent 50%),
            radial-gradient(at 90% 85%, rgba(168,85,247,0.1) 0px, transparent 50%)
          `,
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Animated floating orbs */}
      <motion.div
        animate={{ y: [-30, 30, -30], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(40px)" }}
      />
      <motion.div
        animate={{ y: [20, -20, 20], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 left-1/5 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale, y: contentY, paddingTop: "96px", paddingBottom: "80px" }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 mb-10"
            >
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[13px] font-semibold text-indigo-300">AI Software Development Agency</span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="mb-7">
              <div style={{ overflow: "hidden" }}>
                <motion.h1 custom={0.2} variants={LINE_VARIANTS} initial="hidden" animate="show"
                  className="block font-black text-white tracking-[-0.04em] leading-[1.0]"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)" }}>
                  Engineering
                </motion.h1>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.h1 custom={0.32} variants={LINE_VARIANTS} initial="hidden" animate="show"
                  className="block font-black tracking-[-0.04em] leading-[1.0] text-transparent bg-clip-text"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)", backgroundImage: "linear-gradient(135deg, #818cf8 0%, #a78bfa 45%, #c084fc 80%, #e879f9 100%)" }}>
                  Software
                </motion.h1>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.h1 custom={0.44} variants={LINE_VARIANTS} initial="hidden" animate="show"
                  className="block font-black text-white tracking-[-0.04em] leading-[1.0]"
                  style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)" }}>
                  That Defines Markets.
                </motion.h1>
              </div>
            </div>

            {/* Rotating subtitle */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
              className="flex items-center gap-2 flex-wrap mb-10 text-base sm:text-lg"
            >
              <span className="text-slate-400">We build</span>
              <span className="relative inline-flex min-w-[200px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={serviceIndex}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.32 }}
                    className="font-bold absolute"
                    style={{ color: "#818cf8" }}
                  >
                    {ROTATING_SERVICES[serviceIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="opacity-0 font-bold">AI-Powered Platforms</span>
              </span>
              <span className="text-slate-400">for ambitious companies worldwide.</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.78 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <motion.button
                onClick={scrollToContact}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-3.5 rounded-xl font-bold text-white text-sm overflow-hidden"
                style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%)", boxShadow: "0 8px 32px rgba(99,102,241,0.45)" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Building Today
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </motion.button>

              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                className="group px-8 py-3.5 rounded-xl font-bold text-slate-300 text-sm flex items-center justify-center gap-2 transition-all"
                style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              >
                <CalendarDays className="w-4 h-4 text-indigo-400" />
                Book Free Strategy Call
              </motion.button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="flex items-center gap-6 sm:gap-8 flex-wrap"
            >
              {METRICS.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color }} />
                  <span className="text-sm font-bold text-white">{value}</span>
                  <span className="text-xs text-slate-500">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: 3D Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:flex items-center justify-center pt-8"
          >
            <DashboardMockup />
          </motion.div>
        </div>

        {/* Trusted by strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="mt-20 pt-10"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1))" }} />
            <span className="text-[11px] text-slate-600 font-semibold tracking-[0.18em] uppercase">Trusted by teams at</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.1))" }} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {CLIENT_NAMES.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 + i * 0.06 }}
                className="text-[13px] font-semibold text-slate-600 hover:text-slate-300 transition-colors cursor-default select-none"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-600 font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
