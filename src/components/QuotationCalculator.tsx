import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calculator, Send } from 'lucide-react';

const QuotationCalculator: React.FC = () => {
  const { t } = useTranslation();
  const [projectType, setProjectType] = useState('');
  const [pages, setPages] = useState(5);
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(0);

  const projectTypes = [
    { value: 'website', label: 'Business Website', baseCost: 3000 },
    { value: 'ecommerce', label: 'E-Commerce Platform', baseCost: 8000 },
    { value: 'webapp', label: 'Web Application', baseCost: 12000 },
    { value: 'mobile', label: 'Mobile App (iOS/Android)', baseCost: 15000 },
    { value: 'enterprise', label: 'Enterprise Solution', baseCost: 25000 },
    { value: 'ai-integration', label: 'AI Integration', baseCost: 10000 }
  ];

  const services = [
    { value: 'ai-seo', label: 'AI SEO Optimization', cost: 2000 },
    { value: 'chatbot', label: 'AI Chatbot + Voice', cost: 3000 },
    { value: 'cms', label: 'Content Management System', cost: 2500 },
    { value: 'analytics', label: 'Advanced Analytics', cost: 1500 },
    { value: 'automation', label: 'Workflow Automation', cost: 4000 },
    { value: 'api', label: 'API Development', cost: 3500 },
    { value: 'multilingual', label: 'Multi-language Support', cost: 2000 },
    { value: 'maintenance', label: '6 Months Maintenance', cost: 1200 }
  ];

  React.useEffect(() => {
    calculateCost();
  }, [projectType, pages, additionalServices]);

  const calculateCost = () => {
    const selectedProject = projectTypes.find(p => p.value === projectType);
    if (!selectedProject) {
      setEstimatedCost(0);
      return;
    }

    let cost = selectedProject.baseCost;

    // Add page cost (after base 5 pages)
    if (pages > 5) {
      cost += (pages - 5) * 200;
    }

    // Add additional services
    additionalServices.forEach(service => {
      const selectedService = services.find(s => s.value === service);
      if (selectedService) {
        cost += selectedService.cost;
      }
    });

    setEstimatedCost(cost);
  };

  const toggleService = (serviceValue: string) => {
    if (additionalServices.includes(serviceValue)) {
      setAdditionalServices(additionalServices.filter(s => s !== serviceValue));
    } else {
      setAdditionalServices([...additionalServices, serviceValue]);
    }
  };

  const handleSubmit = () => {
    const message = `Hi! I'm interested in:\n\n` +
      `Project Type: ${projectTypes.find(p => p.value === projectType)?.label}\n` +
      `Pages: ${pages}\n` +
      `Additional Services: ${additionalServices.map(s => services.find(sv => sv.value === s)?.label).join(', ') || 'None'}\n\n` +
      `Estimated Cost: $${estimatedCost.toLocaleString()}\n\n` +
      `Please send me a detailed quote!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
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
          onChange={(e) => setProjectType(e.target.value)}
          className="w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all appearance-none cursor-pointer"
        >
          <option value="">-Select a project type-</option>
          {projectTypes.map(type => (
            <option key={type.value} value={type.value} className="bg-slate-900">
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Pages Slider */}
      <div className="mb-6">
        <label className="text-gray-300 text-sm font-medium mb-3 block">
          Approx. Number of Pages: <span className="text-cyan-400 font-bold">{pages}</span>
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={pages}
          onChange={(e) => setPages(parseInt(e.target.value))}
          className="w-full h-2 bg-cyan-900/30 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #0891b2 0%, #0891b2 ${(pages / 50) * 100}%, rgba(6, 182, 212, 0.2) ${(pages / 50) * 100}%, rgba(6, 182, 212, 0.2) 100%)`
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
              e.target.value = '';
            }
          }}
          className="w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all appearance-none cursor-pointer"
        >
          <option value="">-Select Additional Services-</option>
          {services.map(service => (
            <option
              key={service.value}
              value={service.value}
              disabled={additionalServices.includes(service.value)}
              className="bg-slate-900"
            >
              {service.label} (+${service.cost})
            </option>
          ))}
        </select>

        {/* Selected Services */}
        {additionalServices.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {additionalServices.map(serviceValue => {
              const service = services.find(s => s.value === serviceValue);
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
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder="Enter your WhatsApp Number*"
          className="w-full bg-slate-900/50 backdrop-blur-sm text-white px-6 py-4 rounded-xl border-2 border-cyan-500/30 focus:border-cyan-500 focus:outline-none transition-all placeholder-gray-500"
        />
      </div>

      {/* Estimated Cost Display */}
      {estimatedCost > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/30"
        >
          <div className="text-gray-400 text-sm mb-1">Estimated Project Cost:</div>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            ${estimatedCost.toLocaleString()}
          </div>
          <div className="text-gray-500 text-xs mt-1">*Final cost may vary based on requirements</div>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={!projectType || !whatsappNumber}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-2xl hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
      >
        <span>Get quote on Whatsapp</span>
        <Send className="w-5 h-5" />
      </motion.button>

      <p className="text-gray-500 text-xs text-center mt-4">
        💬 Get instant quote via WhatsApp
      </p>
    </motion.div>
  );
};

export default QuotationCalculator;
