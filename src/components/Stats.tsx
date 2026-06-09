import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, TrendingUp, Globe, Zap, Users, Star, Award, CheckCircle } from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

const STATS = [
  {
    target: 33, suffix: "+",
    label: "Projects Shipped", sublabel: "End-to-end delivery, zero exceptions",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)",
    glow: "rgba(79,70,229,0.3)",
    accent: "#4f46e5",
    number: "33",
  },
  {
    target: 15, suffix: "+",
    label: "Global Clients", sublabel: "Trusted across 5 countries",
    icon: Users,
    gradient: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
    glow: "rgba(124,58,237,0.3)",
    accent: "#7c3aed",
    number: "15",
  },
  {
    target: 5, suffix: "+",
    label: "Countries Served", sublabel: "India, S. Korea & beyond",
    icon: Globe,
    gradient: "linear-gradient(135deg, #9333ea 0%, #a855f7 100%)",
    glow: "rgba(147,51,234,0.3)",
    accent: "#9333ea",
    number: "5",
  },
  {
    target: 85, suffix: "%",
    label: "Automation Rate", sublabel: "Avg. for enterprise workflows",
    icon: Zap,
    gradient: "linear-gradient(135deg, #c026d3 0%, #d946ef 100%)",
    glow: "rgba(192,38,211,0.3)",
    accent: "#c026d3",
    number: "85",
  },
];

const PROOF_POINTS = [
  { icon: Star, text: "4.9/5 client satisfaction rating" },
  { icon: Award, text: "ISO 27001-ready security practices" },
  { icon: CheckCircle, text: "100% on-time delivery rate" },
  { icon: Globe, text: "Clients across India, Korea, US & more" },
];

const Counter: React.FC<{ target: number; suffix: string; inView: boolean }> = ({ target, suffix, inView }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
      {count}{suffix}
    </span>
  );
};

const StatCard: React.FC<{ stat: typeof STATS[0]; inView: boolean; i: number }> = ({ stat, inView, i }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-100, 100], [14, -14]);
  const rotY = useTransform(mx, [-100, 100], [-14, 14]);
  const shadowX = useTransform(mx, [-100, 100], [-20, 20]);
  const shadowY = useTransform(my, [-100, 100], [-10, 10]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="group"
    >
      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([sx, sy]: number[]) =>
              `${sx}px ${sy + 32}px 80px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.05)`
          ) as any,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="relative overflow-hidden rounded-3xl bg-white border border-slate-100/80 p-8 flex flex-col items-center text-center"
      >
        {/* Gradient top stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl"
          style={{ background: stat.gradient }}
        />

        {/* Ambient glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% -10%, ${stat.glow.replace('0.3', '0.08')} 0%, transparent 60%)` }}
        />

        {/* Icon */}
        <motion.div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
          style={{ background: stat.gradient }}
          whileHover={{ scale: 1.1, rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.5 }}
        >
          <stat.icon className="w-8 h-8 text-white" />
          {/* Icon glow */}
          <div
            className="absolute inset-0 rounded-2xl blur-lg opacity-60"
            style={{ background: stat.gradient }}
          />
        </motion.div>

        {/* Giant number */}
        <div
          className="relative font-black mb-2 leading-none"
          style={{
            fontSize: "clamp(3.5rem, 6vw, 5rem)",
            background: stat.gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <Counter target={stat.target} suffix={stat.suffix} inView={inView} />
        </div>

        <div className="text-slate-800 font-bold text-base mb-1.5">{stat.label}</div>
        <div className="text-slate-400 text-xs leading-relaxed">{stat.sublabel}</div>

        {/* Animated progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.15 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full origin-left"
            style={{ background: stat.gradient }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  const { openModal } = useCalendly();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="stats" className="relative py-32 overflow-hidden" style={{ background: "#0f172a" }}>
      {/* Mesh gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(at 20% 20%, rgba(99,102,241,0.18) 0px, transparent 50%),
            radial-gradient(at 80% 10%, rgba(139,92,246,0.15) 0px, transparent 50%),
            radial-gradient(at 5% 85%, rgba(79,70,229,0.12) 0px, transparent 50%),
            radial-gradient(at 95% 80%, rgba(168,85,247,0.12) 0px, transparent 50%)
          `,
        }}
      />

      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Decorative geometric shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-64 h-64 rounded-full border border-indigo-500/10 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-violet-500/10 pointer-events-none"
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[8%] w-4 h-4 rounded-full pointer-events-none"
        style={{ background: "rgba(99,102,241,0.6)" }}
      />
      <motion.div
        animate={{ y: [20, -20, 20], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2/3 right-[12%] w-3 h-3 rounded-full pointer-events-none"
        style={{ background: "rgba(139,92,246,0.6)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">Proof of Impact</span>
          </div>
          <h2
            className="font-black leading-tight tracking-tight text-white mb-4"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
          >
            Numbers That
            {" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)" }}
            >
              Don't Lie
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Every metric below is a real client outcome — no estimates, no projections.
          </p>
        </motion.div>

        {/* 3D Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} inView={inView} i={i} />
          ))}
        </div>

        {/* Proof points strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {PROOF_POINTS.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-2xl px-5 py-4"
            >
              <Icon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm font-medium">{text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden p-10 sm:p-14 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.12) 50%, rgba(147,51,234,0.1) 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 60%)" }}
          />

          <div className="relative z-10">
            <p className="text-white text-2xl font-black mb-3 leading-tight">
              Your business could be our next success story.
            </p>
            <p className="text-slate-400 text-base mb-10">
              Join 15+ global companies that trusted EpicForge to build and scale their vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl font-bold text-white text-sm overflow-hidden relative"
                style={{
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%)",
                  boxShadow: "0 8px 40px rgba(99,102,241,0.45)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.button>
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-white text-sm border border-white/20 bg-white/8 hover:bg-white/15 hover:border-white/30 transition-all backdrop-blur-sm"
              >
                Book a Free Call
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
