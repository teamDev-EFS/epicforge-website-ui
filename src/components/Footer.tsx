import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  ExternalLink,
  MessageCircle,
  Linkedin,
  Instagram,
  Home,
  Briefcase,
  Bot,
  Phone,
  Shield,
} from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";
import EpicForgeLogo from "../assets/images/Epicforgesoftware_main_logo.png";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsAppClick = () => {
    const message =
      "Hi! I'm interested in EpicForge Software's services. Can you help me get started?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/epicforge-software-886336383/",
      "_blank"
    );
  };

  const handleInstagramClick = () => {
    window.open(
      "https://www.instagram.com/epicforgesoftware?igsh=dmc5dWQyeXl0b29o",
      "_blank"
    );
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo and Contact */}
            <div className="sm:col-span-2 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-3 mb-6"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <img
                    src={EpicForgeLogo}
                    alt="EpicForge Software"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <motion.span
                    className="text-2xl font-bold cursor-pointer inline-block"
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 transition-all duration-300">
                      EpicForge Software
                    </span>
                  </motion.span>
                  <div className="text-sm text-blue-400 font-medium">
                    {t("footer.tagline")}
                  </div>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-400 mb-6 max-w-md leading-relaxed"
              >
                {t("hero.subheadline")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>contact@epicforgesoftware.com</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-purple-400 mt-1" />
                  <div className="text-sm">
                    <div className="font-medium text-white mb-1">
                      Our Branches:
                    </div>
                    <div>Indore | Bhopal | Hyderabad | Visakhapatnam</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">
                Quick Links
              </h3>
              <div className="space-y-3">
                {[
                  { key: "home", section: "hero", icon: Home },
                  { key: "services", section: "features", icon: Briefcase },
                  { key: "ai-tools", section: "features", icon: Bot },
                  { key: "contact", section: "contact", icon: Phone },
                  { key: "privacy", section: "privacy", icon: Shield },
                ].map((item) => (
                  <motion.button
                    key={item.key}
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(item.section)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-left"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="capitalize">
                      {item.key.replace("-", " ")}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Social Media & Connect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white">
                Connect With Us
              </h3>
              <div className="space-y-4">
                <LanguageDropdown />

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleWhatsAppClick}
                    className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLinkedInClick}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleInstagramClick}
                    className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                <motion.a
                  whileHover={{ x: 5 }}
                  href="https://forgeorion.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span>ForgeOrion Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
              © 2025 EpicForge Software. All Rights Reserved.
            </p>

            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  window.open(
                    "https://calendly.com/team-dev-epicforgesoftware/30min",
                    "_blank"
                  )
                }
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
              >
                Book a Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
