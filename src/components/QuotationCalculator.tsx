import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, AlertCircle, X, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { saveLead, Lead } from "../lib/api";
import { WHATSAPP_BASE_URL } from "../lib/constants";
import { trackWhatsAppClick } from "../lib/analytics";

const QuotationCalculator: React.FC = () => {
  const { i18n } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("");
  const [pages, setPages] = useState(5);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    return name.trim().length >= 2;
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Name validation (required, ≥2 chars)
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(name)) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation (required, valid email)
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (required, must be valid E.164)
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number (E.164 format)";
    }

    // Project type validation (required)
    if (!projectType) {
      newErrors.projectType = "Please select a project type";
    }

    // Pages validation (required, 1-50)
    if (!pages || pages < 1 || pages > 50) {
      newErrors.pages = "Pages must be between 1 and 50";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: "",
      });
    }
  };


  // Pricing formula as specified: Base ₹25,000 + Per Page ₹2,000 + Additional Services
  const BASE_PROJECT_SETUP = 25000;
  const PER_PAGE_COST = 2000;
  const AI_INTEGRATION_COST = 10000;
  const CHATBOT_VOICE_COST = 25000;
  const MOBILE_APP_COST = 50000;
  const EXPRESS_DELIVERY_SURCHARGE = 0.2; // 20%
  const PREMIUM_UI_SURCHARGE = 0.1; // 10%

  const projectTypes = [
    { value: "Website", label: "Website" },
    { value: "Mobile App", label: "Mobile App" },
    { value: "AI Automation", label: "AI Automation" },
    { value: "CRM", label: "CRM" },
    { value: "Blockchain App", label: "Blockchain App" },
  ];

  const services = [
    { value: "chatbot", label: "AI Chatbot + Voice" },
    { value: "automation", label: "AI Automation" },
    { value: "express", label: "Express Delivery" },
    { value: "premium", label: "Premium Custom UI" },
  ];

  React.useEffect(() => {
    calculateCost();
  }, [projectType, pages, additionalServices]);

  const calculateCost = () => {
    if (!projectType) {
      setEstimatedCost(0);
      return;
    }

    // Base project setup cost
    let cost = BASE_PROJECT_SETUP;

    // Add cost per page/module
    cost += pages * PER_PAGE_COST;

    // Add project-specific costs
    if (projectType === "Mobile App") {
      cost += MOBILE_APP_COST;
    }

    // Check for AI/CRM/Automation integration
    if (projectType === "AI Automation" || projectType === "CRM") {
      cost += AI_INTEGRATION_COST;
    }

    // Add additional services
    additionalServices.forEach((service) => {
      if (service === "chatbot") {
        cost += CHATBOT_VOICE_COST;
      } else if (service === "automation") {
        cost += AI_INTEGRATION_COST;
      }
    });

    // Calculate subtotal for surcharges
    const subtotal = cost;

    // Apply surcharges
    if (additionalServices.includes("express")) {
      cost += subtotal * EXPRESS_DELIVERY_SURCHARGE;
    }

    if (additionalServices.includes("premium")) {
      cost += subtotal * PREMIUM_UI_SURCHARGE;
    }

    setEstimatedCost(cost);
  };

  const toggleService = (serviceValue: string) => {
    if (additionalServices.includes(serviceValue)) {
      setAdditionalServices(
        additionalServices.filter((s) => s !== serviceValue)
      );
    } else {
      setAdditionalServices([...additionalServices, serviceValue]);
    }
  };

  const handleProjectTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectType(e.target.value);
    clearError("projectType");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    clearError("name");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    clearError("email");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    clearError("phone");
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const formatAddOns = (): string => {
    if (additionalServices.length === 0) return "None";
    return additionalServices
      .map((s) => services.find((sv) => sv.value === s)?.label)
      .join(", ");
  };

  const handleConnectWhatsApp = () => {
    // Validate form before opening WhatsApp
    if (!validateForm()) {
      return;
    }

    // Format the message according to specified format
    const whatsappMessage =
      `Hi Team EpicForge\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone.trim() || "-"}\n` +
      `Project: ${projectType}\n` +
      `Pages/Modules: ${pages}\n` +
      `Add-ons: ${formatAddOns()}\n` +
      `Message: ${message.trim() || "-"}\n\n` +
      `Please connect me with the team. Thanks!`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Track WhatsApp click
    trackWhatsAppClick({ 
      source: "quotation_calculator", 
      name, 
      email,
      phone,
      projectType,
      pages,
      additionalServices: additionalServices.join(", "),
      message 
    });

    // Open WhatsApp with EpicForge's business number
    window.open(`${WHATSAPP_BASE_URL}?text=${encodedMessage}`, "_blank");

    // Optionally save lead data
    try {
      const leadData: Lead = {
        name: name,
        email: email,
        phone: phone || "",
        whatsapp: phone || "",
        businessType: projectType,
        projectType: projectType,
        budget: estimatedCost,
        problem: `WhatsApp Quotation Request: ${message || "No additional message"}`,
        language: i18n.language,
        source: "quotation_calculator",
        additionalServices: additionalServices,
        pages: pages,
      };

      saveLead(leadData).catch((error) => {
        console.error("Error saving lead:", error);
      });
    } catch (error) {
      console.error("Error preparing lead data:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-cyan-500/20 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Calculate Cost Of</h3>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Development
          </h3>
        </div>
      </div>

      {/* Project Type Dropdown (Required) */}
      <div className="mb-6">
        <select
          value={projectType}
          onChange={handleProjectTypeChange}
          required
          className={`w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 focus:outline-none transition-all appearance-none cursor-pointer ${
            errors.projectType
              ? "border-red-500 focus:border-red-500"
              : "border-cyan-500/30 focus:border-cyan-500"
          }`}
        >
          <option value="">Select a project type*</option>
          {projectTypes.map((type) => (
            <option
              key={type.value}
              value={type.value}
              className="bg-slate-900"
            >
              {type.label}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <div className="flex items-center mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>{errors.projectType}</span>
            <button
              type="button"
              onClick={() => clearError("projectType")}
              className="ml-2 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Pages Slider */}
      <div className="mb-6">
        <label className="text-gray-300 text-sm font-medium mb-3 block">
          Approx. Number of Pages:{" "}
          <span className="text-cyan-400 font-bold">{pages}</span>
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={pages}
          onChange={(e) => {
            setPages(parseInt(e.target.value));
            clearError("pages");
          }}
          className="w-full h-2 bg-cyan-900/30 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #0891b2 0%, #0891b2 ${
              (pages / 50) * 100
            }%, rgba(6, 182, 212, 0.2) ${
              (pages / 50) * 100
            }%, rgba(6, 182, 212, 0.2) 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1</span>
          <span>50</span>
        </div>
        {errors.pages && (
          <div className="flex items-center mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>{errors.pages}</span>
            <button
              type="button"
              onClick={() => clearError("pages")}
              className="ml-2 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Additional Services Dropdown */}
      <div className="mb-6">
        <select
          onChange={(e) => {
            if (e.target.value) {
              toggleService(e.target.value);
              e.target.value = "";
            }
          }}
          className="w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all appearance-none cursor-pointer"
        >
          <option value="">Select Additional Services</option>
          {services.map((service) => (
            <option
              key={service.value}
              value={service.value}
              disabled={additionalServices.includes(service.value)}
              className="bg-slate-900"
            >
              {service.label}
            </option>
          ))}
        </select>

        {/* Selected Services */}
        {additionalServices.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {additionalServices.map((serviceValue) => {
              const service = services.find((s) => s.value === serviceValue);
              return service ? (
                <span
                  key={serviceValue}
                  className="bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded-full text-sm flex items-center space-x-2 border border-cyan-500/30"
                >
                  <span>{service.label}</span>
                  <button
                    onClick={() => toggleService(serviceValue)}
                    className="hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Name Input (Required) */}
      <div className="mb-6">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Your Name*"
          required
          className={`w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 focus:outline-none transition-all placeholder-gray-500 ${
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

      {/* Email Input (Required) */}
      <div className="mb-6">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Your Email*"
          required
          className={`w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 focus:outline-none transition-all placeholder-gray-500 ${
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

      {/* Phone Input (Required) */}
      <div className="mb-6">
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Your Phone* (E.164 format)"
          required
          className={`w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 focus:outline-none transition-all placeholder-gray-500 ${
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

      {/* Message Input (Optional) */}
      <div className="mb-6">
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Additional Message (Optional)"
          rows={3}
          className="w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all placeholder-gray-500 resize-none"
        />
      </div>

      {/* Connect on WhatsApp Button */}
      <motion.button
        onClick={handleConnectWhatsApp}
        disabled={
          !name ||
          !email ||
          !phone ||
          !projectType ||
          !pages ||
          Object.keys(errors).some((key) => errors[key])
        }
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-green-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Connect on WhatsApp</span>
      </motion.button>

      {/* Consent Note */}
      <p className="text-gray-400 text-xs text-center mt-3">
        By clicking, you agree to be contacted on WhatsApp by EpicForge.
      </p>
    </motion.div>
  );
};

export default QuotationCalculator;
