import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Send, AlertCircle, X } from "lucide-react";
import { toast } from "react-toastify";

const QuotationCalculator: React.FC = () => {
  const [projectType, setProjectType] = useState("");
  const [pages, setPages] = useState(5);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateWhatsAppNumber = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Project type validation
    if (!projectType) {
      newErrors.projectType = "Please select a project type";
      showValidationError("Please select a project type");
    }

    // WhatsApp number validation
    if (!whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
      showValidationError("WhatsApp number is required");
    } else if (!validateWhatsAppNumber(whatsappNumber)) {
      newErrors.whatsappNumber = "Please enter a valid WhatsApp number";
      showValidationError("Please enter a valid WhatsApp number");
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

  // Toast notification functions
  const showValidationError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showSuccessMessage = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showInfoMessage = (message: string) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsappNumber(e.target.value);
    clearError("whatsappNumber");
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    showInfoMessage("Preparing your quotation... Please wait.");

    try {
      // Format budget in INR
      const formatBudget = (amount: number): string => {
        if (amount >= 10000000) {
          return `₹${(amount / 10000000).toFixed(1)} Crores`;
        } else if (amount >= 100000) {
          return `₹${(amount / 100000).toFixed(1)} Lakhs`;
        } else if (amount >= 1000) {
          return `₹${(amount / 1000).toFixed(1)}K`;
        } else {
          return `₹${amount.toLocaleString()}`;
        }
      };

      // Calculate cost breakdown for WhatsApp message
      const baseCost = BASE_PROJECT_SETUP;
      const pagesCost = pages * PER_PAGE_COST;
      let projectSpecificCost = 0;
      let additionalCosts = 0;

      if (projectType === "Mobile App") {
        projectSpecificCost = MOBILE_APP_COST;
      }
      if (projectType === "AI Automation" || projectType === "CRM") {
        projectSpecificCost = AI_INTEGRATION_COST;
      }

      additionalServices.forEach((service) => {
        if (service === "chatbot") {
          additionalCosts += CHATBOT_VOICE_COST;
        } else if (service === "automation") {
          additionalCosts += AI_INTEGRATION_COST;
        }
      });

      const subtotal =
        baseCost + pagesCost + projectSpecificCost + additionalCosts;
      const expressSurcharge = additionalServices.includes("express")
        ? subtotal * EXPRESS_DELIVERY_SURCHARGE
        : 0;
      const premiumSurcharge = additionalServices.includes("premium")
        ? subtotal * PREMIUM_UI_SURCHARGE
        : 0;

      // Format the detailed quotation message
      const quotationMessage =
        `*Quotation Request - EpicForge Software*\n\n` +
        `*Project Details:*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `*WhatsApp Number:* ${whatsappNumber}\n` +
        `*Project Type:* ${
          projectTypes.find((p) => p.value === projectType)?.label
        }\n` +
        `*Pages/Modules:* ${pages}\n` +
        `*Additional Services:* ${
          additionalServices
            .map((s) => services.find((sv) => sv.value === s)?.label)
            .join(", ") || "None"
        }\n\n` +
        `*COST BREAKDOWN:*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `• Base Setup: ₹${baseCost.toLocaleString()}\n` +
        `• Pages (${pages} × ₹${PER_PAGE_COST}): ₹${pagesCost.toLocaleString()}\n` +
        `${
          projectSpecificCost > 0
            ? `• ${projectType} Integration: ₹${projectSpecificCost.toLocaleString()}\n`
            : ""
        }` +
        `${
          additionalCosts > 0
            ? `• Additional Services: ₹${additionalCosts.toLocaleString()}\n`
            : ""
        }` +
        `${
          expressSurcharge > 0
            ? `• Express Delivery (+20%): ₹${expressSurcharge.toLocaleString()}\n`
            : ""
        }` +
        `${
          premiumSurcharge > 0
            ? `• Premium UI (+10%): ₹${premiumSurcharge.toLocaleString()}\n`
            : ""
        }` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `• *TOTAL ESTIMATED COST:* ${formatBudget(estimatedCost)}\n\n` +
        `*Please send me a detailed quotation with:*\n` +
        `• Project timeline\n` +
        `• Payment terms\n` +
        `• Next steps\n\n` +
        `Thank you!`;

      // Open WhatsApp directly with the custom quotation message
      // Use business WhatsApp number from environment variable (not user's number)
      const encodedMessage = encodeURIComponent(quotationMessage);
      const businessWhatsAppNumber =
        import.meta.env.VITE_WHATSAPP_NUMBER || "919201046787";
      const cleanNumber = businessWhatsAppNumber.replace(/[\s\+\-\(\)]/g, "");
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      // Show success message
      showSuccessMessage(
        "Quotation request sent successfully! WhatsApp will open with your detailed quote."
      );
      console.log("Quotation request sent successfully via WhatsApp");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      showValidationError("Failed to open WhatsApp. Please try again.");
    } finally {
      setIsSubmitting(false);
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

      {/* Project Type Dropdown */}
      <div className="mb-6">
        <select
          value={projectType}
          onChange={handleProjectTypeChange}
          className={`w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 focus:outline-none transition-all appearance-none cursor-pointer ${
            errors.projectType
              ? "border-red-500 focus:border-red-500"
              : "border-cyan-500/30 focus:border-cyan-500"
          }`}
        >
          <option value="">Select a project type</option>
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
          onChange={(e) => setPages(parseInt(e.target.value))}
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

      {/* WhatsApp Number Input */}
      <div className="mb-6">
        <input
          type="tel"
          value={whatsappNumber}
          onChange={handleWhatsAppChange}
          placeholder="Enter your WhatsApp Number*"
          className={`w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 focus:outline-none transition-all placeholder-gray-500 ${
            errors.whatsappNumber
              ? "border-red-500 focus:border-red-500"
              : "border-cyan-500/30 focus:border-cyan-500"
          }`}
        />
        {errors.whatsappNumber && (
          <div className="flex items-center mt-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>{errors.whatsappNumber}</span>
            <button
              type="button"
              onClick={() => clearError("whatsappNumber")}
              className="ml-2 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={
          !projectType ||
          !whatsappNumber ||
          Object.keys(errors).some((key) => errors[key]) ||
          isSubmitting
        }
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
      >
        <span>
          {isSubmitting ? "Preparing Quote..." : "Get Free Quote on WhatsApp"}
        </span>
        <Send className="w-5 h-5" />
      </motion.button>

      <p className="text-gray-500 text-xs text-center mt-4">
        💬 Receive detailed quotation with pricing breakdown via WhatsApp
      </p>
    </motion.div>
  );
};

export default QuotationCalculator;
