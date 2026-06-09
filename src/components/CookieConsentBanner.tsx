import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, Settings, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────
interface ConsentState {
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "epicforge_consent_v2";

// ── Helpers ───────────────────────────────────────────────────────
function updateGtagConsent(c: ConsentState) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("consent", "update", {
      analytics_storage:       c.analytics  ? "granted" : "denied",
      ad_storage:              c.marketing  ? "granted" : "denied",
      ad_user_data:            c.marketing  ? "granted" : "denied",
      ad_personalization:      c.marketing  ? "granted" : "denied",
      functionality_storage:   c.functional ? "granted" : "denied",
      personalization_storage: c.functional ? "granted" : "denied",
    });
  }
}

function saveConsent(c: ConsentState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch (_) {}
  updateGtagConsent(c);
}

function loadConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

// ── Component ─────────────────────────────────────────────────────
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>({
    analytics: false,
    functional: true,
    marketing: false,
  });

  useEffect(() => {
    const stored = loadConsent();
    if (!stored) {
      // Small delay so the page renders before banner appears
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    const c: ConsentState = { analytics: true, functional: true, marketing: true };
    saveConsent(c);
    setVisible(false);
  };

  const acceptNecessary = () => {
    const c: ConsentState = { analytics: false, functional: true, marketing: false };
    saveConsent(c);
    setVisible(false);
  };

  const savePreferences = () => {
    saveConsent(prefs);
    setVisible(false);
  };

  const toggle = (key: keyof ConsentState) => {
    if (key === "functional") return; // always on
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Dark overlay when preferences are open */}
          {showPrefs && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
              onClick={() => setShowPrefs(false)}
            />
          )}

          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-[480px] z-[9999]"
            role="dialog"
            aria-label="Cookie consent banner"
          >
            <div
              style={{
                background: "rgba(10,15,26,0.97)",
                border: "1px solid rgba(99,102,241,0.25)",
                boxShadow: "0 8px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.08)",
                backdropFilter: "blur(20px)",
                borderRadius: "16px",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-5 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      borderRadius: "10px",
                      padding: "8px",
                      flexShrink: 0,
                    }}
                  >
                    <Cookie size={18} color="#fff" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-[15px] leading-tight">
                      Cookie Preferences
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5">
                      We respect your privacy.
                    </p>
                  </div>
                </div>
                <button
                  onClick={acceptNecessary}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "4px",
                    cursor: "pointer",
                    color: "#94a3b8",
                    flexShrink: 0,
                  }}
                  aria-label="Dismiss — accept necessary only"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 pb-2">
                <p className="text-slate-400 text-[13px] leading-relaxed">
                  We use cookies to understand how you use our site and improve
                  your experience. We serve clients in the{" "}
                  <span className="text-slate-300">USA, UK&nbsp;&amp;&nbsp;Canada</span>{" "}
                  and comply with GDPR, PIPEDA, and applicable data laws.
                </p>

                {/* Manage preferences (expandable) */}
                <AnimatePresence>
                  {showPrefs && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="mt-4 space-y-2.5">
                        {[
                          {
                            key: "functional" as const,
                            label: "Strictly Necessary",
                            desc: "Required for the site to function. Cannot be disabled.",
                            locked: true,
                          },
                          {
                            key: "analytics" as const,
                            label: "Analytics",
                            desc: "Google Analytics 4 — helps us understand traffic and improve the site.",
                            locked: false,
                          },
                          {
                            key: "marketing" as const,
                            label: "Marketing & Ads",
                            desc: "Google Ads conversion tracking and remarketing cookies.",
                            locked: false,
                          },
                        ].map(({ key, label, desc, locked }) => (
                          <div
                            key={key}
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.06)",
                              borderRadius: "10px",
                              padding: "12px 14px",
                            }}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-slate-200 text-[13px] font-medium">
                                {label}
                              </span>
                              {/* Toggle */}
                              <button
                                onClick={() => toggle(key)}
                                disabled={locked}
                                style={{
                                  width: "38px",
                                  height: "22px",
                                  borderRadius: "11px",
                                  border: "none",
                                  cursor: locked ? "default" : "pointer",
                                  position: "relative",
                                  transition: "background 0.2s",
                                  background:
                                    locked || prefs[key]
                                      ? locked
                                        ? "rgba(99,102,241,0.4)"
                                        : "linear-gradient(135deg,#4f46e5,#7c3aed)"
                                      : "rgba(255,255,255,0.12)",
                                  flexShrink: 0,
                                }}
                                aria-checked={prefs[key]}
                                role="switch"
                              >
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "3px",
                                    left: locked || prefs[key] ? "18px" : "3px",
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "50%",
                                    background: "#fff",
                                    transition: "left 0.2s",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                                  }}
                                />
                              </button>
                            </div>
                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              {desc}
                            </p>
                          </div>
                        ))}
                      </div>

                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 mt-3 text-indigo-400 hover:text-indigo-300 text-[11px] transition-colors"
                      >
                        Privacy Policy <ExternalLink size={10} />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Toggle preferences link */}
                <button
                  onClick={() => setShowPrefs((s) => !s)}
                  className="flex items-center gap-1 mt-3 text-slate-500 hover:text-slate-300 text-[12px] transition-colors"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <Settings size={12} />
                  {showPrefs ? "Hide preferences" : "Manage preferences"}
                  {showPrefs ? (
                    <ChevronUp size={12} />
                  ) : (
                    <ChevronDown size={12} />
                  )}
                </button>
              </div>

              {/* Action buttons */}
              <div className="p-5 pt-3 flex gap-2.5">
                {showPrefs ? (
                  <button
                    onClick={savePreferences}
                    style={{
                      flex: 1,
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "10px",
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      letterSpacing: "0.01em",
                    }}
                  >
                    Save My Preferences
                  </button>
                ) : (
                  <>
                    <button
                      onClick={acceptNecessary}
                      style={{
                        flex: 1,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        borderRadius: "10px",
                        padding: "10px",
                        color: "#94a3b8",
                        fontSize: "13px",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "background 0.2s, color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(255,255,255,0.10)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
                      }}
                    >
                      Necessary Only
                    </button>
                    <button
                      onClick={acceptAll}
                      style={{
                        flex: 1,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px",
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        letterSpacing: "0.01em",
                        boxShadow: "0 4px 16px rgba(99,102,241,0.35)",
                      }}
                    >
                      Accept All
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
