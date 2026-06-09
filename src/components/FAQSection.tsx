import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

const FAQS = [
  {
    q: "What services does EpicForge Software provide?",
    a: "We build AI-powered web applications, mobile apps (iOS & Android), enterprise automation systems, blockchain integrations, AI chatbots, EdTech platforms, CRM/ERP systems, and provide full digital transformation consulting — for startups and enterprises worldwide.",
  },
  {
    q: "Does EpicForge work with international clients?",
    a: "Absolutely. We've delivered 33+ projects for 15+ international clients across 5+ countries. We work across time zones, communicate in English, and handle international project requirements including multi-currency, compliance, and cross-border data.",
  },
  {
    q: "How long does it take to build a custom software project?",
    a: "Timelines depend on scope: a web app typically takes 6–12 weeks, a mobile app 8–16 weeks, and enterprise automation 12–20 weeks. All timelines are agreed upon during the Project Discovery call so there are no surprises.",
  },
  {
    q: "How do I get started? What happens after I book a call?",
    a: "Pick a free call type (30-min strategy, 45-min discovery, or 1-hr enterprise). We listen first — understand your goals, constraints, and vision. After the call you get a clear proposal with scope, timeline, and investment — no pressure, no commitment.",
  },
  {
    q: "What technologies does EpicForge specialize in?",
    a: "Our core stack is React, Next.js, TypeScript, Node.js, Python, React Native, Flutter, PostgreSQL, MongoDB, AWS/GCP, and blockchain (Solidity, Ethereum). We also work with WordPress, Webflow, Framer, and leading AI/ML frameworks.",
  },
  {
    q: "Can EpicForge help with AI SEO and ranking on ChatGPT / Perplexity?",
    a: "Yes — we specialize in both traditional SEO and AEO/GEO (Answer Engine Optimization + Generative Engine Optimization). We optimize content, schema markup, and site structure so your brand appears in AI-generated answers on ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot.",
  },
];

const FAQItem: React.FC<{ q: string; a: string; index: number }> = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl overflow-hidden"
      style={{
        background: open ? "rgba(17, 24, 39, 0.95)" : "rgba(17, 24, 39, 0.7)",
        border: open ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200"
        style={{ background: "transparent" }}
        onMouseEnter={(e) => { if (!open) (e.currentTarget.parentElement as HTMLElement).style.background = "rgba(17,24,39,0.9)"; }}
        onMouseLeave={(e) => { if (!open) (e.currentTarget.parentElement as HTMLElement).style.background = "rgba(17,24,39,0.7)"; }}
      >
        <span className="text-white font-semibold text-sm sm:text-base pr-4 leading-snug">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: open ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.07)" }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: open ? "#818cf8" : "#64748b" }} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection: React.FC = () => {
  const { openModal } = useCalendly();

  return (
    <section id="faq" className="relative py-24 overflow-hidden" style={{ background: "#0a0f1a" }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-6"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">Frequently Asked Questions</span>
          </div>
          <h2
            className="font-black text-white mb-4 leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            Everything You Need to{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #c084fc 60%, #e879f9 100%)" }}
            >
              Know
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Clear answers to the questions we hear most from clients around the world.
          </p>
        </motion.div>

        {/* FAQ list */}
        <div className="space-y-3 mb-12">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-slate-500 text-sm mb-4">Still have questions? Let's talk.</p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}
          >
            Book a Free Call
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
