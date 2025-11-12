import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Phone,
  MapPin,
  Clock,
  Send,
  Mail,
  Calendar,
  AlertCircle,
  X,
} from "lucide-react";
import QuotationCalculator from "../components/QuotationCalculator";
import { openWhatsApp, openDemoBooking } from "../utils/whatsapp";

const ContactPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    budget: "",
    problem: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
  };

  const formatBudget = (amount: string): string => {
    const num = parseFloat(amount);
    if (isNaN(num)) return "";

    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(1)} Crores`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(1)} Lakhs`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1)}K`;
    } else {
      return `₹${num.toLocaleString()}`;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name =
        "Name must be at least 2 characters and contain only letters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but if provided, must be valid)
    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Company validation (optional but if provided, must be valid)
    if (formData.company.trim() && formData.company.trim().length < 2) {
      newErrors.company = "Company name must be at least 2 characters";
    }

    // Source validation
    if (!formData.source) {
      newErrors.source = "Please select how you found us";
    }

    // Budget validation
    if (!formData.budget) {
      newErrors.budget = "Please enter your budget";
    } else if (parseFloat(formData.budget) < 1000) {
      newErrors.budget = "Minimum budget should be ₹1,000";
    }

    // Problem validation
    if (!formData.problem.trim()) {
      newErrors.problem = "Please describe your project or problem";
    } else if (formData.problem.trim().length < 10) {
      newErrors.problem =
        "Please provide more details (at least 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const clearError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Format budget for WhatsApp message
      const formattedBudget = formData.budget
        ? formatBudget(formData.budget)
        : formData.budget;

      // Open WhatsApp with formatted message
      openWhatsApp({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        source: formData.source,
        budget: formattedBudget,
        problem: formData.problem,
        projectType: "Free Audit Request",
      });

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "",
        budget: "",
        problem: "",
      });

      // Show success message
      console.log("WhatsApp opened successfully with form details");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-6">
            {t("contactPage.title")}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("contactPage.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Contact Info & Quick Connect */}
          <div className="space-y-8">
            {/* Contact Information Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-1">
                      {t("contactPage.phone")}
                    </h3>
                    <p className="text-white text-lg">+1 (555) 123-4567</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-1">
                      {t("contactPage.location")}
                    </h3>
                    <p className="text-white text-lg">
                      "301, Atulya IT Park, Bhawarkua Main Road, Indore, M.P.
                      452010,India"
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-1">
                      {t("contactPage.businessHours")}
                    </h3>
                    <p className="text-white text-lg">
                      {t("contactPage.businessHoursText")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Connect Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-xl p-8 rounded-3xl border border-indigo-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                {t("contactPage.quickConnect")}
              </h3>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-indigo-500/50 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5" />
                    <span>{t("contactPage.getFreeAudit")}</span>
                  </div>
                  <span className="text-xs text-indigo-200">
                    {t("hero.ctaAISubtext")}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openDemoBooking()}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-green-500/50 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5" />
                    <span>{t("contactPage.bookDemo")}</span>
                  </div>
                  <span className="text-xs text-green-200">
                    {t("hero.ctaCallSubtext")}
                  </span>
                </motion.button>
              </div>

              <div className="mt-8 bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-indigo-500/20">
                <h4 className="text-cyan-400 font-semibold mb-4 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  <span>{t("contactPage.freeStrategyCall")}</span>
                </h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">•</span>
                    <span>{t("contactPage.bottleneckAnalysis")}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">•</span>
                    <span>{t("contactPage.customRecommendations")}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">•</span>
                    <span>{t("contactPage.projectScope")}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400">•</span>
                    <span>{t("contactPage.pricingDiscussion")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Forms */}
          <div className="space-y-8">
            {/* Quotation Calculator */}
            <QuotationCalculator />

            {/* Traditional Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-cyan-500/20"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("contactPage.sendDetails")}
              </h3>
              <p className="text-gray-400 mb-6">
                {t("contactPage.sendDetailsSubtitle")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("contactPage.fullName")}
                      className={`bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 focus:outline-none transition-all placeholder-gray-500 ${
                        errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "border-cyan-500/30 focus:border-cyan-500"
                      }`}
                    />
                    {errors.name && (
                      <div className="flex items-center mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{errors.name}</span>
                        <button
                          type="button"
                          onClick={() => clearError("name")}
                          className="ml-2 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("contactPage.email")}
                      className={`bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 focus:outline-none transition-all placeholder-gray-500 ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-cyan-500/30 focus:border-cyan-500"
                      }`}
                    />
                    {errors.email && (
                      <div className="flex items-center mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{errors.email}</span>
                        <button
                          type="button"
                          onClick={() => clearError("email")}
                          className="ml-2 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t("contactPage.phone")}
                      className={`bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 focus:outline-none transition-all placeholder-gray-500 ${
                        errors.phone
                          ? "border-red-500 focus:border-red-500"
                          : "border-cyan-500/30 focus:border-cyan-500"
                      }`}
                    />
                    {errors.phone && (
                      <div className="flex items-center mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{errors.phone}</span>
                        <button
                          type="button"
                          onClick={() => clearError("phone")}
                          className="ml-2 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t("contactPage.company")}
                      className={`bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 focus:outline-none transition-all placeholder-gray-500 ${
                        errors.company
                          ? "border-red-500 focus:border-red-500"
                          : "border-cyan-500/30 focus:border-cyan-500"
                      }`}
                    />
                    {errors.company && (
                      <div className="flex items-center mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{errors.company}</span>
                        <button
                          type="button"
                          onClick={() => clearError("company")}
                          className="ml-2 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className={`bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 focus:outline-none transition-all appearance-none ${
                        errors.source
                          ? "border-red-500 focus:border-red-500"
                          : "border-cyan-500/30 focus:border-cyan-500"
                      }`}
                    >
                      <option value="">
                        {t("contactPage.howDidYouFindUs")}
                      </option>
                      <option value="google">
                        {t("contactPage.googleSearch")}
                      </option>
                      <option value="chatgpt">
                        {t("contactPage.chatgpt")}
                      </option>
                      <option value="social">
                        {t("contactPage.socialMedia")}
                      </option>
                      <option value="referral">
                        {t("contactPage.referral")}
                      </option>
                    </select>
                    {errors.source && (
                      <div className="flex items-center mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{errors.source}</span>
                        <button
                          type="button"
                          onClick={() => clearError("source")}
                          className="ml-2 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder={t("contactPage.enterBudget")}
                      className={`bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${
                        errors.budget
                          ? "border-red-500 focus:border-red-500"
                          : "border-cyan-500/30 focus:border-cyan-500"
                      }`}
                    />
                    {formData.budget && (
                      <div className="mt-2 text-sm text-cyan-400">
                        {formatBudget(formData.budget)}
                      </div>
                    )}
                    {errors.budget && (
                      <div className="flex items-center mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <span>{errors.budget}</span>
                        <button
                          type="button"
                          onClick={() => clearError("budget")}
                          className="ml-2 hover:text-red-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder={t("contactPage.describeProject")}
                    rows={4}
                    className={`w-full bg-slate-900/50 backdrop-blur-sm text-white px-4 py-3 rounded-xl border-2 focus:outline-none transition-all placeholder-gray-500 resize-none ${
                      errors.problem
                        ? "border-red-500 focus:border-red-500"
                        : "border-cyan-500/30 focus:border-cyan-500"
                    }`}
                  />
                  {errors.problem && (
                    <div className="flex items-center mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>{errors.problem}</span>
                      <button
                        type="button"
                        onClick={() => clearError("problem")}
                        className="ml-2 hover:text-red-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    Object.keys(errors).some((key) => errors[key])
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {isSubmitting
                      ? t("contactPage.submitting")
                      : t("contactPage.getMyFreeAudit")}
                  </span>
                  <Send className="w-5 h-5" />
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{t("contactPage.thankYou")}</span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{t("contactPage.somethingWentWrong")}</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
