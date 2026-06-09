import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  ArrowRight,
  Check,
  Zap,
  LayoutGrid,
  Building2,
  CalendarDays,
} from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const MEETINGS = [
  {
    id: "strategy",
    title: "AI & Software Strategy Call",
    duration: "30 min",
    tag: "Quick Start",
    ideal: "Quick assessment, tech stack review, roadmap",
    url: "https://calendly.com/adityavardhan-epicforgesoftware/30min",
    Icon: Zap,
    gradient: "from-cyan-500 to-blue-500",
    borderColor: "border-cyan-500/30 hover:border-cyan-500/60",
    topBar: "bg-gradient-to-r from-cyan-500 to-blue-500",
    checkColor: "#22d3ee",
    points: [
      "Tech stack & opportunity assessment",
      "Quick wins & priority actions",
      "Custom roadmap overview",
    ],
  },
  {
    id: "discovery",
    title: "Project Discovery & Solution Architecture",
    duration: "45 min",
    tag: "Most Popular",
    ideal: "You have a project to scope and architect",
    url: "https://calendly.com/adityavardhan-epicforgesoftware/project-discovery-solution-architecture",
    Icon: LayoutGrid,
    gradient: "from-violet-500 to-purple-600",
    borderColor: "border-violet-500/50 hover:border-violet-400/80",
    topBar: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    checkColor: "#a78bfa",
    points: [
      "Full requirements & scope analysis",
      "Architecture, tech stack & integrations",
      "Timeline, milestones & investment estimate",
    ],
    featured: true,
  },
  {
    id: "enterprise",
    title: "Enterprise AI & Digital Transformation",
    duration: "1 hr",
    tag: "Enterprise",
    ideal: "Large-scale AI adoption or full digital transformation",
    url: "https://calendly.com/adityavardhan-epicforgesoftware/enterprise-ai-digital-transformation-consultation",
    Icon: Building2,
    gradient: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
    topBar: "bg-gradient-to-r from-amber-500 to-orange-500",
    checkColor: "#f59e0b",
    points: [
      "Enterprise AI transformation roadmap",
      "Legacy system integration strategy",
      "ROI projections & business impact model",
    ],
  },
];

const openCalendly = (url: string, closeModal: () => void) => {
  closeModal();
  setTimeout(() => {
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    // GA4 event tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "calendly_open", {
        event_category: "booking",
        event_label: url,
      });
    }
  }, 280);
};

const CalendlyModal: React.FC = () => {
  const { isOpen, closeModal } = useCalendly();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closeModal}
            className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-md"
          />

          {/* Panel */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl border border-white/[0.09] rounded-2xl shadow-2xl overflow-hidden my-auto"
              style={{ background: "#050d20" }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.07] bg-white/[0.02]">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                    <CalendarDays className="w-4.5 h-4.5 text-white w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Book a Free Consultation
                    </h2>
                    <p className="text-gray-500 text-xs mt-0.5">
                      Select the call that best matches your stage
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center transition-all hover:border-white/20"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Cards */}
              <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {MEETINGS.map((m, i) => (
                  <motion.button
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => openCalendly(m.url, closeModal)}
                    className={`relative flex flex-col text-left bg-white/[0.04] border ${m.borderColor} rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07] hover:shadow-xl w-full group`}
                  >
                    {/* Top color bar */}
                    <div className={`h-0.5 w-full ${m.topBar}`} />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Icon + duration */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${m.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                        >
                          <m.Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-1 bg-white/[0.06] border border-white/10 rounded-full px-2.5 py-1.5">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-300 text-xs font-semibold">
                            {m.duration}
                          </span>
                        </div>
                      </div>

                      {/* Tag */}
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-widest mb-1.5 text-transparent bg-clip-text bg-gradient-to-r ${m.gradient}`}
                      >
                        {m.tag}
                      </span>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                        {m.title}
                      </h3>

                      {/* Ideal for */}
                      <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                        Ideal for: {m.ideal}
                      </p>

                      {/* Points */}
                      <ul className="space-y-1.5 mb-5 flex-1">
                        {m.points.map((pt, j) => (
                          <li key={j} className="flex items-start space-x-2">
                            <span
                              className="mt-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${m.checkColor}1a` }}
                            >
                              <Check
                                className="w-2 h-2"
                                style={{ color: m.checkColor }}
                              />
                            </span>
                            <span className="text-gray-400 text-xs leading-relaxed">
                              {pt}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA row */}
                      <div
                        className={`flex items-center justify-between w-full py-2.5 px-4 bg-gradient-to-r ${m.gradient} text-white text-xs font-bold rounded-lg`}
                      >
                        <span>Book this call</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-8 py-4 border-t border-white/[0.07] bg-white/[0.01]">
                <p className="text-gray-600 text-xs text-center tracking-wide">
                  All calls are <span className="text-gray-400">free</span> ·
                  No commitment required · Powered by{" "}
                  <span className="text-gray-400">Calendly</span>
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CalendlyModal;
