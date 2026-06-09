import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

// ── REPLACE these with real client quotes ─────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "EpicForge automated our entire invoicing and CRM workflow. What used to take our team 3 days now runs in under 2 hours — fully hands-free. The ROI was visible within the first month.",
    name: "Avinash Kumar",
    title: "CEO, ForgeOrion",
    company: "ForgeOrion",
    country: "India · South Korea",
    rating: 5,
    gradient: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    initials: "AK",
  },
  {
    quote:
      "We needed a full EdTech platform built from scratch — multi-tenant, multi-language, payment-integrated — in 10 weeks. EpicForge shipped it on time, on budget, and the product is live with 2,000+ learners today.",
    name: "Sravan Kumar",
    title: "Founder, EximGTH",
    company: "EximGTH Global Trade House",
    country: "India · International",
    rating: 5,
    gradient: "linear-gradient(135deg, #059669, #0d9488)",
    initials: "SK",
  },
  {
    quote:
      "The team at EpicForge completely rebuilt our export management portal. The new system handles 5,000+ orders across 25 countries with zero manual intervention. Absolutely world-class execution.",
    name: "Rahul Verma",
    title: "Director, NamasteExim",
    company: "NamasteExim Ventures",
    country: "India",
    rating: 5,
    gradient: "linear-gradient(135deg, #d97706, #ea580c)",
    initials: "RV",
  },
];

const StarRow: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex items-center gap-0.5 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      className="relative py-24 overflow-hidden"
      style={{ background: "#0a0f1a" }}
    >
      {/* Grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-6"
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.25)",
            }}
          >
            <Quote className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">
              Client Stories
            </span>
          </div>
          <h2
            className="font-black text-white leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Don't take our word for it.
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
              }}
            >
              Hear from our clients.
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Real outcomes from real businesses across the USA, UK, Canada, and
            beyond — no cherry-picked stats, just verified results.
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative rounded-3xl p-10 sm:p-14"
                style={{
                  background: "rgba(17,24,39,0.9)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 8px 48px rgba(0,0,0,0.4)",
                }}
              >
                {/* Big quote mark */}
                <div
                  className="absolute top-8 right-10 text-[120px] leading-none font-black select-none pointer-events-none"
                  style={{ color: "rgba(99,102,241,0.06)", fontFamily: "serif" }}
                >
                  "
                </div>

                {/* Top: stars */}
                <StarRow count={t.rating} />

                {/* Quote */}
                <blockquote className="text-slate-200 text-lg sm:text-xl font-medium leading-relaxed mb-10 relative z-10 max-w-3xl">
                  "{t.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-lg shadow-lg"
                    style={{ background: t.gradient }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-bold text-base">
                      {t.name}
                    </div>
                    <div className="text-slate-400 text-sm">{t.title}</div>
                    <div
                      className="text-[11px] font-semibold mt-0.5"
                      style={{ color: "rgba(129,140,248,0.8)" }}
                    >
                      {t.country}
                    </div>
                  </div>

                  {/* Company badge */}
                  <div className="ml-auto hidden sm:block">
                    <div
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  style={{
                    width: i === current ? "28px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background:
                      i === current
                        ? "linear-gradient(135deg, #4f46e5, #7c3aed)"
                        : "rgba(255,255,255,0.15)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(99,102,241,0.3)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#818cf8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => go(1)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(99,102,241,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(99,102,241,0.3)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#818cf8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Social proof bar below carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {[
            { value: "4.9 / 5", label: "Average client rating" },
            { value: "100%", label: "On-time delivery" },
            { value: "0", label: "Projects abandoned" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="text-center py-5 px-4 rounded-2xl"
              style={{
                background: "rgba(17,24,39,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="text-2xl font-black mb-1"
                style={{
                  background:
                    "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {value}
              </div>
              <div className="text-slate-500 text-xs font-medium">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
