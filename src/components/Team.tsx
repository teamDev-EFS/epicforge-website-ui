import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { User, Linkedin, Twitter, Mail } from "lucide-react";

const TeamCard: React.FC<{
  member: { name: string; title: string; description: string; gradient: string; accent: string; delay: number };
  index: number;
}> = ({ member, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-80, 80], [8, -8]);
  const rotY = useTransform(mx, [-80, 80], [-8, 8]);

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: member.delay }}
      style={{ perspective: "800px" }}
      onMouseMove={handleMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="group"
    >
      <motion.div
        style={{
          rotateX: rotX, rotateY: rotY,
          background: "rgba(17, 24, 39, 0.9)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="relative rounded-2xl p-8 text-center h-full flex flex-col overflow-hidden"
      >
        {/* Hover bg glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${member.accent}15 0%, transparent 65%)` }}
        />

        {/* Top accent stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 group-hover:h-1 transition-all duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${member.accent}, transparent)` }}
        />

        <div className="relative">
          <div
            className={`w-20 h-20 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl`}
          >
            <User className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
          <p className="font-bold mb-4 text-sm uppercase tracking-wider" style={{ color: member.accent }}>
            {member.title}
          </p>
          <p className="text-slate-400 leading-relaxed text-sm flex-grow mb-6">{member.description}</p>

          {/* Social (visible on hover) */}
          <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[
              { icon: Linkedin, bg: "#0077B5" },
              { icon: Twitter, bg: "#475569" },
              { icon: Mail, bg: "#059669" },
            ].map(({ icon: Icon, bg }, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all"
                style={{ background: bg }}
              >
                <Icon className="w-4 h-4" />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Team: React.FC = () => {
  const { t } = useTranslation();

  const teamMembers = [
    { name: t("team.ceo.name"), title: t("team.ceo.title"), description: t("team.ceo.description"), gradient: "from-indigo-500 to-violet-600", accent: "#818cf8", delay: 0.1 },
    { name: t("team.cto.name"), title: t("team.cto.title"), description: t("team.cto.description"), gradient: "from-violet-500 to-purple-600", accent: "#a78bfa", delay: 0.2 },
    { name: t("team.coo.name"), title: t("team.coo.title"), description: t("team.coo.description"), gradient: "from-emerald-500 to-teal-600", accent: "#34d399", delay: 0.3 },
  ];

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#0f172a" }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Ambient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <User className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-300">Meet Our Team</span>
          </div>
          <h2
            className="font-black text-white mb-5 leading-tight tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)" }}
          >
            {t("team.title")}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t("team.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
