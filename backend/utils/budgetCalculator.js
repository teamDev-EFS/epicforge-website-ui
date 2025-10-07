/**
 * Budget calculation and formatting utilities
 */

const formatBudget = (amount) => {
  const num = parseFloat(amount);
  if (isNaN(num)) return { formatted: "", category: "invalid" };

  let formatted, category, priority;

  if (num >= 10000000) {
    formatted = `₹${(num / 10000000).toFixed(1)} Crores`;
    category = "enterprise";
    priority = "high";
  } else if (num >= 100000) {
    formatted = `₹${(num / 100000).toFixed(1)} Lakhs`;
    category = "large";
    priority = "high";
  } else if (num >= 10000) {
    formatted = `₹${(num / 1000).toFixed(1)}K`;
    category = "medium";
    priority = "medium";
  } else if (num >= 1000) {
    formatted = `₹${(num / 1000).toFixed(1)}K`;
    category = "small";
    priority = "low";
  } else {
    formatted = `₹${num.toLocaleString()}`;
    category = "micro";
    priority = "low";
  }

  return {
    formatted,
    category,
    priority,
    amount: num,
  };
};

const calculateProjectEstimate = (budget, projectType, businessType) => {
  const budgetInfo = formatBudget(budget);

  // Base project estimates based on budget and project type
  let estimatedDuration = "";
  let estimatedFeatures = [];
  let recommendedServices = [];

  if (budgetInfo.category === "enterprise") {
    estimatedDuration = "6-12 months";
    estimatedFeatures = [
      "Custom Enterprise Solution",
      "Advanced AI Integration",
      "Blockchain Implementation",
      "Multi-tenant Architecture",
      "24/7 Support",
      "Dedicated Project Manager",
    ];
    recommendedServices = [
      "Full-stack Development",
      "AI & Machine Learning",
      "Blockchain Development",
      "DevOps & Cloud Infrastructure",
      "Security Implementation",
    ];
  } else if (budgetInfo.category === "large") {
    estimatedDuration = "3-6 months";
    estimatedFeatures = [
      "Custom Web Application",
      "AI Features",
      "Mobile App (iOS/Android)",
      "Database Design",
      "API Integration",
      "6 months Support",
    ];
    recommendedServices = [
      "Web Development",
      "Mobile App Development",
      "AI Integration",
      "Database Design",
      "API Development",
    ];
  } else if (budgetInfo.category === "medium") {
    estimatedDuration = "2-4 months";
    estimatedFeatures = [
      "Custom Website",
      "Basic AI Features",
      "Responsive Design",
      "CMS Integration",
      "SEO Optimization",
      "3 months Support",
    ];
    recommendedServices = [
      "Web Development",
      "UI/UX Design",
      "SEO Services",
      "Content Management",
      "Basic AI Integration",
    ];
  } else {
    estimatedDuration = "1-2 months";
    estimatedFeatures = [
      "Professional Website",
      "Responsive Design",
      "Basic SEO",
      "Contact Forms",
      "1 month Support",
    ];
    recommendedServices = [
      "Web Development",
      "UI/UX Design",
      "Basic SEO",
      "Content Creation",
    ];
  }

  return {
    duration: estimatedDuration,
    features: estimatedFeatures,
    services: recommendedServices,
    budgetInfo,
  };
};

module.exports = {
  formatBudget,
  calculateProjectEstimate,
};
