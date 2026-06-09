import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ArrowRightCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCalendly } from "../contexts/CalendlyContext";
import companyLogo from "../assets/images/Epicforgesoftware_logo.png";

const NAV_ITEMS = [
  { label: "Home",      path: "/",          section: "hero" },
  { label: "About",     path: "/about" },
  { label: "Services",  path: "/",          section: "features" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact",   path: "/contact" },
];

const Header: React.FC = () => {
  const navigate    = useNavigate();
  const location    = useLocation();
  const { openModal } = useCalendly();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close on route change + lock body scroll when open
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = (path: string, section?: string) => {
    setMenuOpen(false);
    if (location.pathname !== path) {
      navigate(path);
      if (section) setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" }), 120);
    } else if (section) {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const active = (item: typeof NAV_ITEMS[0]) =>
    (item.label === "Home"     && location.pathname === "/" && !location.hash) ||
    (item.label === "Services" && location.pathname === "/" && location.hash === "#features") ||
    (item.label !== "Home"     && item.label !== "Services" && location.pathname === item.path);

  return (
    <>
      {/* ── HEADER BAR ─────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:   scrolled ? "rgba(10,15,26,0.95)" : "rgba(10,15,26,0.6)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          boxShadow:    scrolled ? "0 1px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between relative">

          {/* LEFT — Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => go("/", "hero")}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <img src={companyLogo} alt="EpicForge" className="w-5 h-5 object-contain" />
              </div>
            </div>
            <div className="hidden sm:block">
              <div
                className="text-[15px] font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                EpicForge Software
              </div>
              <div className="text-[10px] text-indigo-500 font-semibold tracking-wider uppercase">
                Forging the Future
              </div>
            </div>
          </motion.div>

          {/* CENTER — Nav links (desktop, absolutely centred) */}
          <nav className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => go(item.path, item.section)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                style={{
                  color:      active(item) ? "#818cf8" : "#94a3b8",
                  background: active(item) ? "rgba(99,102,241,0.10)" : "transparent",
                  opacity:    active(item) ? 1 : 0.85,
                  fontFamily: "var(--font-body)",
                }}
                onMouseEnter={(e) => {
                  if (!active(item)) {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                    (e.currentTarget as HTMLButtonElement).style.color   = "#e2e8f0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active(item)) {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                    (e.currentTarget as HTMLButtonElement).style.color   = "#94a3b8";
                  }
                }}
              >
                {item.label}
                {active(item) && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400" />
                )}
              </motion.button>
            ))}
          </nav>

          {/* RIGHT — Action buttons (desktop) */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            <LanguageSwitcher />

            {/* Get Free Audit — solid indigo pill */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => go("/contact")}
              className="text-white text-sm font-semibold"
              style={{
                background:   "linear-gradient(135deg, #4f46e5, #7c3aed)",
                borderRadius: "50px",
                padding:      "9px 20px",
                border:       "none",
                cursor:       "pointer",
                boxShadow:    "0 4px 16px rgba(99,102,241,0.35)",
                fontFamily:   "var(--font-body)",
              }}
            >
              Get Free Audit
            </motion.button>

            {/* Book a Call — glass pill */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={openModal}
              className="text-slate-300 text-sm font-semibold"
              style={{
                background:     "rgba(255,255,255,0.07)",
                borderRadius:   "50px",
                padding:        "9px 20px",
                border:         "1px solid rgba(255,255,255,0.12)",
                cursor:         "pointer",
                backdropFilter: "blur(8px)",
                fontFamily:     "var(--font-body)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background    = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLButtonElement).style.borderColor   = "rgba(255,255,255,0.22)";
                (e.currentTarget as HTMLButtonElement).style.color         = "#e2e8f0";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background    = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLButtonElement).style.borderColor   = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLButtonElement).style.color         = "#cbd5e1";
              }}
            >
              Book a Call
            </motion.button>
          </div>

          {/* MOBILE — hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE RIGHT-SIDE SHEET ─────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(10,15,26,0.65)", backdropFilter: "blur(4px)" }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sheet panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed right-0 top-0 z-[70] flex flex-col"
              style={{
                width:      "min(88vw, 360px)",
                height:     "100dvh",
                background: "rgba(10,15,26,0.98)",
                boxShadow:  "-12px 0 48px rgba(0,0,0,0.5)",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Sheet header */}
              <div className="flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                    <img src={companyLogo} alt="EpicForge" className="w-5 h-5 object-contain" />
                  </div>
                  <span
                    className="text-sm font-bold text-white"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    EpicForge Software
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  aria-label="Close menu"
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "0 24px" }} />

              {/* Nav links with stagger */}
              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {NAV_ITEMS.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => go(item.path, item.section)}
                    className="block w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      color:      active(item) ? "#818cf8" : "#94a3b8",
                      background: active(item) ? "rgba(99,102,241,0.12)" : "transparent",
                      fontFamily: "var(--font-body)",
                    }}
                    onMouseEnter={(e) => {
                      if (!active(item)) {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                        (e.currentTarget as HTMLButtonElement).style.color      = "#e2e8f0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active(item)) {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color      = "#94a3b8";
                      }
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Bottom CTAs */}
              <div className="px-6 pb-8 space-y-3">
                <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "20px" }} />

                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.56 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => go("/contact")}
                  className="w-full flex items-center justify-between text-white font-semibold text-sm px-6 py-3.5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    boxShadow:  "0 4px 16px rgba(99,102,241,0.3)",
                    border:     "none",
                    cursor:     "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Get Free Audit
                  <ArrowRightCircle size={16} />
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.63 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMenuOpen(false); openModal(); }}
                  className="w-full text-slate-300 font-semibold text-sm py-3.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border:     "1px solid rgba(255,255,255,0.12)",
                    cursor:     "pointer",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Book a Free Call
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
