import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Bot,
  Code,
  Zap,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Features: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Bot,
      title: t("features.aiAssistants.title"),
      description: t("features.aiAssistants.description"),
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      icon: Code,
      title: t("features.customSoftware.title"),
      description: t("features.customSoftware.description"),
      gradient: "from-purple-500 to-pink-500",
      delay: 0.2,
    },
    {
      icon: Zap,
      title: t("features.forgeOrion.title"),
      description: t("features.forgeOrion.description"),
      gradient: "from-yellow-500 to-orange-500",
      delay: 0.3,
    },
    {
      icon: TrendingUp,
      title: t("features.guarantee.title"),
      description: t("features.guarantee.description"),
      gradient: "from-green-500 to-emerald-500",
      delay: 0.4,
    },
    {
      icon: Bot,
      title: "AI & Blockchain Integration",
      description:
        "Cutting-edge AI and blockchain technology solutions delivering innovative enterprise-grade applications with smart contracts and decentralized systems.",
      gradient: "from-indigo-500 to-purple-500",
      delay: 0.5,
    },
    {
      icon: Code,
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile applications built with modern frameworks, delivering seamless user experiences across iOS and Android devices.",
      gradient: "from-emerald-500 to-teal-500",
      delay: 0.6,
    },
    {
      icon: Zap,
      title: "Web Applications & Portals",
      description:
        "Custom web applications and enterprise portals designed for scalability, security, and optimal performance across all devices and browsers.",
      gradient: "from-rose-500 to-pink-500",
      delay: 0.7,
    },
    {
      icon: TrendingUp,
      title: "CRM & Enterprise Tools",
      description:
        "Comprehensive customer relationship management and enterprise tools that streamline operations and drive business growth through automation.",
      gradient: "from-orange-500 to-red-500",
      delay: 0.8,
    },
    {
      icon: ArrowRight,
      title: "Omnichannel Brand Systems",
      description:
        "Integrated brand systems that deliver consistent experiences across all touchpoints, from digital platforms to physical interactions.",
      gradient: "from-amber-500 to-yellow-500",
      delay: 0.9,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide = 4;
  const totalSlides = Math.ceil(features.length / cardsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  const getCurrentSlideFeatures = () => {
    const startIndex = currentSlide * cardsPerSlide;
    return features.slice(startIndex, startIndex + cardsPerSlide);
  };

  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            <span>Why Choose Us</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t("features.title")}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              currentSlide === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50 hover:scale-110"
            }`}
            whileHover={{ scale: currentSlide === 0 ? 1 : 1.1 }}
            whileTap={{ scale: currentSlide === 0 ? 1 : 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
              currentSlide === totalSlides - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50 hover:scale-110"
            }`}
            whileHover={{ scale: currentSlide === totalSlides - 1 ? 1 : 1.1 }}
            whileTap={{ scale: currentSlide === totalSlides - 1 ? 1 : 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </motion.button>

          {/* Carousel Content */}
          <div className="overflow-hidden mx-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {getCurrentSlideFeatures().map((feature, index) => (
                  <motion.div
                    key={`${currentSlide}-${index}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative p-8 h-full">
                      <div className="flex flex-col h-full">
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                          {feature.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed flex-grow mb-6">
                          {feature.description}
                        </p>

                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors duration-300"
                        >
                          <span className="text-sm">Learn More</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <span>Start Your Project Today</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
