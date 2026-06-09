import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import companyLogo from "../assets/images/Epicforgesoftware_logo.png";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavigation = (path: string, sectionId?: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== path) {
      navigate(path);
      if (sectionId) setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { key: "home", path: "/", section: "hero" },
    { key: "about", path: "/about" },
    { key: "services", path: "/", section: "features" },
    { key: "portfolio", path: "/portfolio" },
    { key: "contact", path: "/contact" },
  ];

  const isActive = (item: typeof navItems[0]) =>
    (item.key === "home" && location.pathname === "/" && !location.hash) ||
    (item.key === "services" && location.pathname === "/" && location.hash === "#features") ||
    (item.key !== "home" && item.key !== "services" && location.pathname === item.path);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10, 15, 26, 0.95)"
          : "rgba(10, 15, 26, 0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 30px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigation("/", "hero")}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <img src={companyLogo} alt="EpicForge" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                EpicForge Software
              </div>
              <div className="text-xs text-indigo-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Forging the Future Of Innovation
              </div>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavigation(item.path, item.section)}
                className="relative px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg"
                style={{
                  color: isActive(item) ? "#818cf8" : "#94a3b8",
                  background: isActive(item) ? "rgba(99,102,241,0.12)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item)) e.currentTarget.style.color = "#c7d2fe";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item)) e.currentTarget.style.color = "#94a3b8";
                }}
              >
                {t(`nav.${item.key}`)}
                {isActive(item) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400" />
                )}
              </motion.button>
            ))}

            <LanguageSwitcher />

            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavigation("/contact")}
              className="ml-3 relative group px-5 py-2.5 rounded-xl font-bold text-sm text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
              }}
            >
              <span className="relative z-10">{t("nav.getStarted")}</span>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.button>
          </nav>

          {/* Mobile */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-white p-2 rounded-lg transition-all"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden rounded-b-2xl"
              style={{ background: "rgba(10,15,26,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            >
              <div className="px-4 py-5 space-y-1.5">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavigation(item.path, item.section)}
                    className="block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      color: isActive(item) ? "#818cf8" : "#94a3b8",
                      background: isActive(item) ? "rgba(99,102,241,0.12)" : "transparent",
                    }}
                  >
                    {t(`nav.${item.key}`)}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ x: -24, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  onClick={() => handleNavigation("/contact")}
                  className="w-full mt-3 text-white px-6 py-3 rounded-xl font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
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
