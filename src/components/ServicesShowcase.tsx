import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Brain, Globe, Smartphone, Zap, BarChart3, ShieldCheck,
  ArrowRight, CalendarDays, Sparkles, Check,
} from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

const SERVICES = [
  {
    id: 1, num: "01",
    icon: Brain,
    title: "AI & Intelligent Automation",
    subtitle: "Replace manual workflows with intelligent pipelines",
    description: "Custom LLM integrations, GPT-4o chatbots, RAG systems, and end-to-end workflow automation that cuts operational costs by 80%+.",
    points: ["Custom AI agents & pipelines", "GPT-4o / Claude integrations", "RAG on private knowledge bases"],
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    glow: "rgba(99,102,241,0.25)",
    accent: "#818cf8",
    stat: "80%", statLabel: "Efficiency Gain",
    tags: ["GPT-4o", "LangChain", "RAG", "Agents"],
    featured: true,
  },
  {
    id: 2, num: "02",
    icon: Globe,
    title: "Enterprise Web Applications",
    subtitle: "Scalable SaaS and B2B platforms",
    description: "Full-stack React/Next.js platforms with real-time features, multi-tenant architecture, and global CDN delivery — from MVP to enterprise.",
    points: ["React / Next.js / TypeScript", "Real-time & multi-tenant", "Payment & auth integrations"],
    gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
    glow: "rgba(8,145,178,0.2)",
    accent: "#22d3ee",
    stat: "99.9%", statLabel: "Uptime SLA",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"],
    featured: false,
  },
  {
    id: 3, num: "03",
    icon: Smartphone,
    title: "Cross-Platform Mobile",
    subtitle: "iOS & Android apps that users love",
    description: "React Native and Flutter apps with offline support, push notifications, biometric auth, and seamless backend integration. Shipped to both stores.",
    points: ["React Native & Flutter", "Offline-first architecture", "App Store & Play Store"],
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    glow: "rgba(5,150,105,0.2)",
    accent: "#34d399",
    stat: "4.8★", statLabel: "Avg. Rating",
    tags: ["React Native", "Flutter", "Expo", "Firebase"],
    featured: false,
  },
  {
    id: 4, num: "04",
    icon: BarChart3,
    title: "AI SEO & Digital Growth",
    subtitle: "Rank on Google AND AI search engines",
    description: "GEO + traditional SEO — we make your brand visible on ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot where your buyers now search.",
    points: ["GEO / AEO optimization", "Technical SEO & schema", "AI citation architecture"],
    gradient: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
    glow: "rgba(217,119,6,0.2)",
    accent: "#fbbf24",
    stat: "3–5×", statLabel: "Traffic Growth",
    tags: ["AEO", "GEO", "Schema", "Technical SEO"],
    featured: false,
  },
  {
    id: 5, num: "05",
    icon: Zap,
    title: "Enterprise Automation",
    subtitle: "CRM, ERP, HRM — intelligently connected",
    description: "End-to-end business process automation: REST/GraphQL APIs, webhooks, microservices, and real-time data sync — zero silos, full operational clarity.",
    points: ["ERP / CRM integration", "REST & GraphQL APIs", "Real-time data pipelines"],
    gradient: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
    glow: "rgba(124,58,237,0.2)",
    accent: "#a78bfa",
    stat: "200+", statLabel: "APIs Delivered",
    tags: ["REST", "GraphQL", "Webhooks", "AWS"],
    featured: false,
  },
  {
    id: 6, num: "06",
    icon: ShieldCheck,
    title: "Cybersecurity & Compliance",
    subtitle: "Enterprise-grade security from day one",
    description: "Pen testing, OWASP hardening, GDPR/HIPAA compliance, role-based access, and encrypted pipelines — security you can audit, trust, and prove.",
    points: ["OWASP & pen testing", "GDPR / HIPAA compliance", "Zero Trust architecture"],
    gradient: "linear-gradient(135deg, #334155 0%, #475569 100%)",
    glow: "rgba(71,85,105,0.2)",
    accent: "#94a3b8",
    stat: "ISO", statLabel: "27001-Ready",
    tags: ["OWASP", "GDPR", "HIPAA", "SSO"],
    featured: false,
  },
];

const ServiceCard: React.FC<{ service: typeof SERVICES[0]; index: number }> = ({ service, index }) => {
  const { openModal } = useCalendly();
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-80, 80], [10, -10]);
  const rotY = useTransform(mx, [-80, 80], [-10, 10]);

  const row = Math.floor(index / 3);
  const col = index % 3;
  const delay = row * 0.15 + col * 0.1;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: 35, scale: 0.82 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: "1200px" }}
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
          boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)`,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative rounded-3xl overflow-hidden flex flex-col h-full"
      >
        {/* Gradient header zone */}
        <div
          className="relative h-28 flex-shrink-0 flex items-center px-7 overflow-hidden"
          style={{ background: service.gradient }}
        >
          {/* Radial light leak */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.18) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />

          {/* Number */}
          <div className="absolute top-3 right-5 font-black text-[3.5rem] leading-none text-white/10 select-none pointer-events-none">
            {service.num}
          </div>

          {/* Icon */}
          <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0" style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)" }}>
            <service.icon className="w-7 h-7 text-white" />
          </div>

          {/* Title in header */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">{service.num} — Service</div>
            <h3 className="text-white font-black text-base leading-tight">{service.title}</h3>
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-grow p-6 pt-5" style={{ background: "rgba(15, 23, 42, 0.95)" }}>
          {/* Ambient hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
            style={{ background: `radial-gradient(circle at 50% 0%, ${service.glow} 0%, transparent 60%)` }}
          />

          <p className="text-slate-400 text-sm leading-relaxed mb-5 relative z-10">
            {service.description}
          </p>

          {/* Bullet points */}
          <ul className="space-y-2 mb-5 relative z-10">
            {service.points.map((pt, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3 + i * 0.07 }}
                className="flex items-center gap-2.5"
              >
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${service.accent}20` }}
                >
                  <Check className="w-2.5 h-2.5" style={{ color: service.accent }} />
                </div>
                <span className="text-slate-300 text-xs">{pt}</span>
              </motion.li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `${service.accent}12`, color: service.accent, border: `1px solid ${service.accent}25` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stat + CTA */}
          <div className="flex items-center justify-between mt-auto pt-4 relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div className="text-2xl font-black leading-none" style={{ color: service.accent }}>{service.stat}</div>
              <div className="text-[10px] text-slate-600 mt-0.5">{service.statLabel}</div>
            </div>
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.06, x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-[11px] font-bold px-4 py-2 rounded-xl text-white"
              style={{ background: service.gradient }}
            >
              Discuss <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesShowcase: React.FC = () => {
  const { openModal } = useCalendly();

  return (
    <section id="services-showcase" className="relative py-32 overflow-hidden" style={{ background: "#0a0f1a" }}>
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(at 10% 30%, rgba(79,70,229,0.08) 0%, transparent 50%),
            radial-gradient(at 90% 70%, rgba(124,58,237,0.07) 0%, transparent 50%)
          `,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-7" style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">What We Build</span>
          </div>

          <h2
            className="font-black leading-tight tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", color: "white" }}
          >
            Six Ways We Transform
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 60%, #e879f9 100%)" }}
            >
              Your Business
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            From AI automation to enterprise security — every service delivers measurable ROI
            backed by real client outcomes.
          </p>
        </motion.div>

        {/* 3D Layered Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm mb-6">
            Not sure which service fits? One free call covers it all.
          </p>
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 text-white font-bold px-10 py-4 rounded-xl text-sm overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%)",
              boxShadow: "0 8px 40px rgba(99,102,241,0.45)",
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

export default ServicesShowcase;
