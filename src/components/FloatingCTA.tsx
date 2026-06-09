import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useCalendly } from "../contexts/CalendlyContext";

const FloatingCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { openModal } = useCalendly();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center space-x-2.5 bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-5 py-3.5 rounded-full font-semibold text-sm shadow-2xl shadow-violet-500/30 overflow-hidden group"
          >
            {/* Pulse ring */}
            <motion.span
              animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 blur-sm pointer-events-none"
            />
            <CalendarDays className="relative z-10 w-4 h-4" />
            <span className="relative z-10">Book a Call</span>
            {/* Shine sweep */}
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
