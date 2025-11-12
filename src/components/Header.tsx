import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

// Import company logo
import companyLogo from "../assets/images/Epicforgesoftware_logo.png";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  interface NavItem {
    key: string;
    path: string;
    section?: string;
    label?: string;
  }

  const handleNavigation = (path: string, sectionId?: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== path) {
      navigate(path);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems: NavItem[] = [
    { key: "home", path: "/", section: "hero" },
    { key: "about", path: "/about" },
    // { key: "company", path: "/company/epicforge-software" }, // Hidden from users - for GEO/AEO purposes only
    { key: "services", path: "/", section: "features" },
    { key: "portfolio", path: "/portfolio" },
    { key: "contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-teal-500/20 transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Premium Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigation("/", "hero")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-teal-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src={companyLogo}
                  alt="EpicForge"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <motion.span
                className="text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-indigo-400 transition-all duration-300 cursor-pointer inline-block"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 25px rgba(20, 184, 166, 0.6)",
                }}
                transition={{ duration: 0.3 }}
              >
                EpicForge Software
              </motion.span>
              <div className="text-xs text-teal-400 font-medium flex items-center space-x-1 group-hover:text-teal-300 transition-colors duration-300">
                <Sparkles className="w-3 h-3 group-hover:animate-spin transition-transform duration-300" />
                <span>Forging the Future Of Innovation</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigation(item.path, item.section)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 group ${
                  (item.key === "home" &&
                    location.pathname === "/" &&
                    !location.hash) ||
                  (item.key === "services" &&
                    location.pathname === "/" &&
                    location.hash === "#features") ||
                  (item.key !== "home" &&
                    item.key !== "services" &&
                    location.pathname === item.path) ||
                  (item.key === "company" &&
                    location.pathname.startsWith("/company"))
                    ? "text-teal-400"
                    : "text-white hover:text-teal-400"
                }`}
              >
                {item.label || t(`nav.${item.key}`)}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-teal-500 to-indigo-500 transition-all duration-300 ${
                    (item.key === "home" &&
                      location.pathname === "/" &&
                      !location.hash) ||
                    (item.key === "services" &&
                      location.pathname === "/" &&
                      location.hash === "#features") ||
                    (item.key !== "home" &&
                      item.key !== "services" &&
                      location.pathname === item.path) ||
                    (item.key === "company" &&
                      location.pathname.startsWith("/company"))
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </motion.button>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation("/contact")}
              className="ml-4 relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-gradient-to-r from-teal-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl">
                {t("nav.getStarted")}
              </div>
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-teal-400 p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-slate-900/98 backdrop-blur-xl border-t border-teal-500/20 rounded-b-2xl"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 10 }}
                    onClick={() => handleNavigation(item.path, item.section)}
                    className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 font-medium border ${
                      (item.key === "home" &&
                        location.pathname === "/" &&
                        !location.hash) ||
                      (item.key === "services" &&
                        location.pathname === "/" &&
                        location.hash === "#features") ||
                      (item.key !== "home" &&
                        item.key !== "services" &&
                        location.pathname === item.path) ||
                      (item.key === "company" &&
                        location.pathname.startsWith("/company"))
                        ? "text-teal-400 bg-gradient-to-r from-teal-600/20 to-indigo-600/20 border-teal-500/30"
                        : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-teal-600/20 hover:to-indigo-600/20 border-transparent hover:border-teal-500/30"
                    }`}
                  >
                    {item.label || t(`nav.${item.key}`)}
                  </motion.button>
                ))}

                {/* Mobile CTA */}
                <motion.button
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  onClick={() => handleNavigation("/contact")}
                  className="w-full mt-4 bg-gradient-to-r from-teal-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  {t("nav.getStarted")}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
