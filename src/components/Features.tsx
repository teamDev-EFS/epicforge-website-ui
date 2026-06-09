import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Bot, Code2, Zap, TrendingUp, Smartphone, Globe, ShieldCheck, BarChart3,
  ArrowRight, Sparkles, CalendarDays, Check,
} from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

const FEATURED_SERVICE = {
  icon: Bot,
  label: "01 — Most Requested",
  title: "AI & Intelligent Automation",
  subtitle: "Replace manual workflows with intelligent AI systems",
  description:
    "We build custom LLM-powered automation pipelines, AI chatbots, and intelligent document processing systems that eliminate 80–85% of manual work — deployed and production-ready.",
  points: [
    "GPT-4o / Claude integrations with your data",
    "Custom AI agents and workflow automation",
    "RAG systems on private knowledge bases",
    "Real-time AI chatbots for sales & support",
  ],
  gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #9333ea 100%)",
  glow: "rgba(99,102,241,0.15)",
  tag: "85% efficiency gain avg.",
};

const SERVICES = [
  {
    icon: Code2,
    title: "Custom Web Applications",
    description: "Enterprise-grade platforms with React, Next.js, Node.js — scalable and production-ready.",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
    accent: "#a78bfa",
    glow: "rgba(124,58,237,0.12)",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native iOS & Android apps via React Native & Flutter — seamless cross-platform experiences.",
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    accent: "#34d399",
    glow: "rgba(5,150,105,0.12)",
  },
  {
    icon: Zap,
    title: "Enterprise Automation",
    description: "CRM, ERP, HRM integrations — your entire operation intelligently connected and automated.",
    gradient: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
    accent: "#fbbf24",
    glow: "rgba(217,119,6,0.12)",
  },
  {
    icon: Globe,
    title: "EdTech & SaaS Platforms",
    description: "LMS, multi-tenant SaaS, and digital marketplaces built for global scale.",
    gradient: "linear-gradient(135deg, #e11d48 0%, #db2777 100%)",
    accent: "#fb7185",
    glow: "rgba(225,29,72,0.12)",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain & Web3",
    description: "Smart contracts, DeFi integrations, and secure decentralized apps on Ethereum.",
    gradient: "linear-gradient(135deg, #4338ca 0%, #3b82f6 100%)",
    accent: "#93c5fd",
    glow: "rgba(67,56,202,0.12)",
  },
  {
    icon: BarChart3,
    title: "CRM & Business Intelligence",
    description: "Custom CRM, analytics dashboards, and BI tools that turn data into revenue decisions.",
    gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
    accent: "#22d3ee",
    glow: "rgba(8,145,178,0.12)",
  },
  {
    icon: TrendingUp,
    title: "AI SEO & Digital Growth",
    description: "GEO + traditional SEO — rank on Google, ChatGPT, Perplexity, and Bing Copilot.",
    gradient: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
    accent: "#4ade80",
    glow: "rgba(22,163,74,0.12)",
  },
];

const SmallCard: React.FC<{ service: typeof SERVICES[0]; i: number }> = ({ service, i }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-80, 80], [10, -10]);
  const rotY = useTransform(mx, [-80, 80], [-10, 10]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, rotateX: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "900px" }}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        mx.set(e.clientX - r.left - r.width / 2);
        my.set(e.clientY - r.top - r.height / 2);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="group"
    >
      <motion.div
        style={{
          rotateX: rotX, rotateY: rotY,
          background: "rgba(17, 24, 39, 0.9)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        className="relative rounded-2xl p-6 h-full overflow-hidden cursor-default"
      >
        {/* Top stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 group-hover:h-1 rounded-t-2xl transition-all duration-300"
          style={{ background: service.gradient }}
        />

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow} 0%, transparent 70%)` }}
        />

        <div className="relative z-10">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg"
            style={{ background: service.gradient }}
            whileHover={{ scale: 1.1, rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
          >
            <service.icon className="w-6 h-6 text-white" />
          </motion.div>

          <h3 className="text-[15px] font-bold text-white mb-2 leading-snug">
            {service.title}
          </h3>
          <p className="text-slate-400 text-[13px] leading-relaxed mb-4">{service.description}</p>

          <div
            className="flex items-center gap-1.5 text-[13px] font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100"
            style={{ color: service.accent }}
          >
            Learn more
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const { openModal } = useCalendly();
  const featuredRef = useRef<HTMLDivElement>(null);
  const fmx = useMotionValue(0);
  const fmy = useMotionValue(0);
  const fRotX = useTransform(fmy, [-150, 150], [8, -8]);
  const fRotY = useTransform(fmx, [-150, 150], [-8, 8]);

  return (
    <section id="features" className="relative py-32 overflow-hidden" style={{ background: "#0f172a" }}>
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      {/* Ambient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.10) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-7"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">What We Build</span>
          </div>
          <h2
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
          >
            Enterprise Software
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 60%, #e879f9 100%)" }}
            >
              Built to Scale
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From AI automation to blockchain — every piece of software we build delivers
            measurable ROI for forward-thinking companies.
          </p>
        </motion.div>

        {/* FEATURED card — full width hero */}
        <motion.div
          ref={featuredRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: "1200px" }}
          onMouseMove={(e) => {
            if (!featuredRef.current) return;
            const r = featuredRef.current.getBoundingClientRect();
            fmx.set(e.clientX - r.left - r.width / 2);
            fmy.set(e.clientY - r.top - r.height / 2);
          }}
          onMouseLeave={() => { fmx.set(0); fmy.set(0); }}
          className="mb-6 group"
        >
          <motion.div
            style={{ rotateX: fRotX, rotateY: fRotY }}
            transition={{ type: "spring", stiffness: 200, damping: 28 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0" style={{ background: FEATURED_SERVICE.gradient }} />
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 60%)", transform: "translate(30%, -30%)" }} />

            <div className="relative z-10 p-10 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/90 text-xs font-bold uppercase tracking-wider">{FEATURED_SERVICE.label}</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                  {FEATURED_SERVICE.title}
                </h3>
                <p className="text-white/70 font-semibold mb-4">{FEATURED_SERVICE.subtitle}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {FEATURED_SERVICE.description}
                </p>

                <motion.button
                  onClick={openModal}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 bg-white text-indigo-700 font-bold px-7 py-3.5 rounded-xl text-sm shadow-xl hover:shadow-2xl transition-all"
                >
                  <CalendarDays className="w-4 h-4" />
                  Discuss This Service
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-4">What's included</div>
                  <ul className="space-y-3">
                    {FEATURED_SERVICE.points.map((pt, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 rounded-full bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white/85 text-sm">{pt}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-black text-2xl">85%+</div>
                    <div className="text-white/60 text-xs">Average efficiency gain for clients</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Secondary service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {SERVICES.map((service, i) => (
            <SmallCard key={service.title} service={service} i={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm mb-6">
            Not sure which service fits? Let's figure it out together.
          </p>
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 text-white font-bold px-9 py-4 rounded-xl text-sm overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%)",
              boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
            }}
          >
            <CalendarDays className="w-4 h-4" />
            Book Free Strategy Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
