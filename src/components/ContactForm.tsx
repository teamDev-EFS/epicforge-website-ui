import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, Bot, Calendar, CheckCircle, AlertCircle, X, ArrowRight } from "lucide-react";
import { openWhatsApp } from "../utils/whatsapp";

const ContactForm: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "",
    businessType: "", budget: "", problem: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v: string) => /^[\+]?[1-9][\d]{0,15}$/.test(v.replace(/[\s\-\(\)]/g, ""));
  const validateName = (v: string) => v.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(v.trim());

  const formatBudget = (amount: string): string => {
    const num = parseFloat(amount);
    if (isNaN(num)) return "";
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Crores`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)} Lakhs`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num.toLocaleString()}`;
  };

  const validateForm = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim() || !validateName(formData.name)) e.name = "Name must be at least 2 characters (letters only)";
    if (!formData.email.trim() || !validateEmail(formData.email)) e.email = "Please enter a valid email address";
    if (formData.phone.trim() && !validatePhone(formData.phone)) e.phone = "Please enter a valid phone number";
    if (!formData.businessType) e.businessType = "Please select a business type";
    if (!formData.budget) e.budget = "Please enter your budget";
    else if (parseFloat(formData.budget) < 1000) e.budget = "Minimum budget should be ₹1,000";
    if (!formData.problem.trim() || formData.problem.trim().length < 10) e.problem = "Please describe your project (at least 10 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      openWhatsApp({
        name: formData.name, email: formData.email, phone: formData.phone,
        company: formData.company, businessType: formData.businessType,
        budget: formData.budget ? formatBudget(formData.budget) : formData.budget,
        problem: formData.problem, projectType: "Custom Software",
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", businessType: "", budget: "", problem: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const clearError = (field: string) => setErrors(p => ({ ...p, [field]: "" }));

  const inputCls = (field: string) =>
    `w-full px-4 py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm ${
      errors[field]
        ? "border-red-500/50 focus:ring-red-500/50"
        : "focus:ring-indigo-500/50"
    }`;

  const inputStyle = (field: string): React.CSSProperties => ({
    background: "rgba(15, 23, 42, 0.8)",
    border: `1px solid ${errors[field] ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.08)"}`,
  });

  const ErrorMsg: React.FC<{ field: string }> = ({ field }) =>
    errors[field] ? (
      <div className="flex items-center mt-1.5 text-red-400 text-xs gap-1">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        <span>{errors[field]}</span>
        <button type="button" onClick={() => clearError(field)} className="ml-auto hover:text-red-300">
          <X className="w-3 h-3" />
        </button>
      </div>
    ) : null;

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: "#0f172a" }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Ambient */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(99,102,241,0.10)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(139,92,246,0.10)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <Send className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">Get In Touch</span>
          </div>
          <h2
            className="font-black text-white mb-5 leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
          >
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Get your custom AI solution or software build. Choose your preferred way to connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Quick actions */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Quick Connect</h3>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer"
            >
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }} />
              <div className="relative text-white p-6 flex items-center gap-4">
                <Bot className="w-8 h-8 flex-shrink-0" />
                <div>
                  <div className="text-lg font-bold">{t("hero.ctaAI")}</div>
                  <div className="text-sm text-white/80">{t("hero.ctaAISubtext")}</div>
                </div>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => window.open("https://calendly.com/adityavardhan-epicforgesoftware/30min", "_blank")}
              className="w-full p-6 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-4 text-left group"
              style={{
                background: "rgba(17, 24, 39, 0.9)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <Calendar className="w-8 h-8 text-indigo-400 flex-shrink-0" />
              <div>
                <div className="text-lg font-bold text-white">{t("hero.ctaCall")}</div>
                <div className="text-sm text-slate-400">{t("hero.ctaCallSubtext")}</div>
              </div>
            </motion.button>

            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(17,24,39,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h4 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Free Strategy Call Includes:
              </h4>
              <ul className="space-y-3">
                {[
                  { text: "Bottleneck analysis for your business", color: "#818cf8" },
                  { text: "Custom AI/software recommendations", color: "#a78bfa" },
                  { text: "Clear project scope and timeline", color: "#34d399" },
                  { text: "Transparent pricing discussion", color: "#fbbf24" },
                ].map(({ text, color }, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="rounded-2xl p-8"
              style={{ background: "rgba(17,24,39,0.9)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Send Us Details</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                      placeholder={t("form.name")} required className={inputCls("name")} style={inputStyle("name")} />
                    <ErrorMsg field="name" />
                  </div>
                  <div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder={t("form.email")} required className={inputCls("email")} style={inputStyle("email")} />
                    <ErrorMsg field="email" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder={t("form.phone")} className={inputCls("phone")} style={inputStyle("phone")} />
                    <ErrorMsg field="phone" />
                  </div>
                  <div>
                    <input type="text" name="company" value={formData.company} onChange={handleChange}
                      placeholder={t("form.company")} className={inputCls("company")} style={inputStyle("company")} />
                    <ErrorMsg field="company" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <select name="businessType" value={formData.businessType} onChange={handleChange}
                      className={inputCls("businessType")} style={inputStyle("businessType")}>
                      <option value="" style={{ background: "#0f172a" }}>{t("form.businessType")}</option>
                      {["health","saas","legal","retail","auto","logistics","other"].map(v => (
                        <option key={v} value={v} style={{ background: "#0f172a" }}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
                      ))}
                    </select>
                    <ErrorMsg field="businessType" />
                  </div>
                  <div>
                    <input type="number" name="budget" value={formData.budget} onChange={handleChange}
                      placeholder="Budget (e.g. 50000)" className={inputCls("budget")} style={inputStyle("budget")} />
                    {formData.budget && (
                      <div className="mt-1.5 text-xs font-semibold text-indigo-400">{formatBudget(formData.budget)}</div>
                    )}
                    <ErrorMsg field="budget" />
                  </div>
                </div>

                <div>
                  <textarea name="problem" value={formData.problem} onChange={handleChange}
                    placeholder={t("form.problem")} rows={4}
                    className={`${inputCls("problem")} resize-none`} style={inputStyle("problem")} />
                  <ErrorMsg field="problem" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative"
                  style={{
                    background: "linear-gradient(135deg, #059669 0%, #0891b2 100%)",
                    boxShadow: "0 6px 24px rgba(5,150,105,0.25)",
                  }}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? t("form.submitting") : t("form.submit")}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-emerald-400 p-3.5 rounded-xl border text-sm font-medium"
                    style={{ background: "rgba(5,150,105,0.12)", borderColor: "rgba(5,150,105,0.25)" }}>
                    <CheckCircle className="w-4 h-4" /> {t("form.success")}
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 p-3.5 rounded-xl border text-sm font-medium"
                    style={{ background: "rgba(239,68,68,0.12)", borderColor: "rgba(239,68,68,0.25)" }}>
                    <AlertCircle className="w-4 h-4" /> {t("form.error")}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
