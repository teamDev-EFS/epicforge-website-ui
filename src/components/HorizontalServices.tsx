import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Brain, Globe, Smartphone, Zap, BarChart3, ShieldCheck, ArrowRight, Sparkles,
} from "lucide-react";

const SERVICES = [
  {
    id: 1, label: "01 — AI Systems",
    title: "AI-Powered Automation",
    subtitle: "Replace manual work with intelligent pipelines",
    description:
      "Custom LLM integrations, workflow automation, AI chatbots, and predictive systems that cut operational costs by 60–80% — built for real business scale.",
    icon: Brain,
    gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    accent: "#6366f1",
    tags: ["GPT-4o", "LangChain", "RAG", "Fine-tuning", "Agents"],
    stat: "80%", statLabel: "Cost Reduction",
  },
  {
    id: 2, label: "02 — Web Platforms",
    title: "Enterprise Web Applications",
    subtitle: "Scalable SaaS and B2B platforms",
    description:
      "Full-stack React/Next.js web applications with real-time features, multi-tenant architecture, payment integrations, and global CDN delivery.",
    icon: Globe,
    gradient: "linear-gradient(135deg, #0891b2 0%, #0e7490 100%)",
    accent: "#22d3ee",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    stat: "99.9%", statLabel: "Uptime SLA",
  },
  {
    id: 3, label: "03 — Mobile Apps",
    title: "Cross-Platform Mobile",
    subtitle: "iOS & Android apps that users love",
    description:
      "React Native and Flutter mobile apps with offline support, push notifications, biometric auth, and seamless backend integration.",
    icon: Smartphone,
    gradient: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
    accent: "#34d399",
    tags: ["React Native", "Flutter", "Expo", "Firebase", "Stripe"],
    stat: "4.8★", statLabel: "Avg. App Rating",
  },
  {
    id: 4, label: "04 — Growth & SEO",
    title: "AI SEO & Digital Growth",
    subtitle: "Rank on Google and AI search engines",
    description:
      "GEO + traditional SEO to make your brand visible on ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot — where buyers search now.",
    icon: BarChart3,
    gradient: "linear-gradient(135deg, #d97706 0%, #ea580c 100%)",
    accent: "#fbbf24",
    tags: ["AEO", "GEO", "Schema", "Technical SEO", "AI Citations"],
    stat: "3–5×", statLabel: "Traffic Growth",
  },
  {
    id: 5, label: "05 — Integrations",
    title: "Systems & API Integration",
    subtitle: "Connect your entire tech stack",
    description:
      "ERP/CRM integration, REST/GraphQL APIs, webhook pipelines, real-time data sync, and microservices architecture — zero data silos.",
    icon: Zap,
    gradient: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
    accent: "#a78bfa",
    tags: ["REST", "GraphQL", "Webhooks", "AWS", "Zapier"],
    stat: "200+", statLabel: "API Integrations",
  },
  {
    id: 6, label: "06 — Security",
    title: "Cybersecurity & Compliance",
    subtitle: "Enterprise-grade security from day one",
    description:
      "Pen testing, OWASP hardening, GDPR/HIPAA compliance architecture, RBAC, and encrypted data pipelines — security you can audit.",
    icon: ShieldCheck,
    gradient: "linear-gradient(135deg, #334155 0%, #475569 100%)",
    accent: "#94a3b8",
    tags: ["OWASP", "GDPR", "HIPAA", "SSO", "Zero Trust"],
    stat: "ISO", statLabel: "27001-Ready",
  },
];

const ServicePanel: React.FC<{ service: typeof SERVICES[0] }> = ({ service }) => {
  const Icon = service.icon;
  return (
    <div
      className="relative flex-shrink-0 flex flex-col overflow-hidden rounded-3xl border"
      style={{
        width: "clamp(300px, 38vw, 520px)",
        height: "calc(100vh - 200px)",
        background: "rgba(30, 41, 59, 0.6)",
        borderColor: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Gradient top bar */}
      <div className="h-1 flex-shrink-0 rounded-t-3xl" style={{ background: service.gradient }} />

      {/* Inner glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none rounded-full"
        style={{ background: `radial-gradient(circle at 100% 0%, ${service.accent}12 0%, transparent 70%)` }}
      />

      <div className="relative flex flex-col h-full p-8 overflow-hidden">
        {/* Label */}
        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
          {service.label}
        </div>

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-2xl flex-shrink-0"
          style={{ background: service.gradient }}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-black text-white mb-2 leading-tight">
          {service.title}
        </h3>
        <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: service.accent }}>
          {service.subtitle}
        </p>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border"
              style={{
                background: `${service.accent}12`,
                borderColor: `${service.accent}30`,
                color: service.accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stat + CTA */}
        <div className="flex items-end justify-between pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div>
            <div className="text-3xl font-black leading-none" style={{ color: service.accent }}>
              {service.stat}
            </div>
            <div className="text-xs text-slate-500 mt-1">{service.statLabel}</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, x: 3 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white"
            style={{ background: service.gradient }}
          >
            Learn More <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const HorizontalServices: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 25, restDelta: 0.0001 });

  // Total scroll width = (N-1) cards × (card width + gap)
  const CARD_WIDTH_VW = 39;
  const GAP_VW = 2.5;
  const totalShift = (SERVICES.length - 1) * (CARD_WIDTH_VW + GAP_VW);

  const x = useTransform(smoothProgress, [0, 1], [`0vw`, `-${totalShift}vw`]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Which card index is "active"
  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(Math.round(v * (SERVICES.length - 1)), SERVICES.length - 1)
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${SERVICES.length * 100 + 50}vh` }}
    >
      {/* STICKY VIEWPORT */}
      <div
        className="sticky top-0 h-screen overflow-hidden flex flex-col"
        style={{ background: "#0f172a" }}
      >
        {/* Ambient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(79,70,229,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.05) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* ── HEADER ROW ── */}
        <div className="relative z-10 flex-shrink-0 flex items-center justify-between px-8 lg:px-16 pt-8 pb-0">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-500/15 border border-indigo-400/25 rounded-full px-4 py-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Services</span>
            </div>
            <h2
              className="font-black text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
            >
              Scroll to Explore{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)" }}
              >
                Every Service
              </span>
            </h2>
          </div>

          {/* Card counter */}
          <div className="hidden md:flex items-center gap-3">
            {SERVICES.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: useTransform(activeIndex, (ai) => ai === i ? "24px" : "8px") as any,
                  height: "8px",
                  background: useTransform(
                    activeIndex,
                    (ai) => ai === i ? "linear-gradient(90deg, #4f46e5, #7c3aed)" : "rgba(255,255,255,0.15)"
                  ) as any,
                }}
              />
            ))}
          </div>

          <p className="hidden lg:block text-slate-500 text-sm max-w-xs text-right">
            Scroll down to navigate through all{" "}
            <span className="text-slate-300 font-semibold">{SERVICES.length} services</span>
          </p>
        </div>

        {/* ── CARDS AREA ── */}
        <div className="relative flex-1 flex items-center overflow-hidden min-h-0 py-6">
          <motion.div
            style={{ x }}
            className="flex gap-6 pl-8 lg:pl-16 absolute"
          >
            {SERVICES.map((service) => (
              <ServicePanel key={service.id} service={service} />
            ))}

            {/* Final CTA card */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center rounded-3xl border p-10"
              style={{
                width: "clamp(260px, 30vw, 420px)",
                height: "calc(100vh - 200px)",
                background: "rgba(30, 41, 59, 0.4)",
                borderColor: "rgba(99,102,241,0.25)",
                borderStyle: "dashed",
              }}
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
                style={{ background: "linear-gradient(135deg, #4f46e5, #9333ea)" }}
              >
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-black text-white mb-3 text-center">
                Ready to build something extraordinary?
              </h3>
              <p className="text-slate-400 text-sm text-center mb-8">
                All services start with a free strategy call — zero pressure.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  window.open("https://calendly.com/adityavardhan-epicforgesoftware/30min", "_blank")
                }
                className="text-white font-bold px-8 py-3.5 rounded-2xl text-sm flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #9333ea)",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.4)",
                }}
              >
                Book Free Call <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="relative z-10 flex-shrink-0 px-8 lg:px-16 pb-8 pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Navigate Services
            </span>
            <motion.span className="text-xs font-bold text-slate-400">
              {SERVICES.length} Total
            </motion.span>
          </div>
          <div className="h-0.5 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: progressWidth,
                background: "linear-gradient(90deg, #4f46e5, #7c3aed, #9333ea)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalServices;
