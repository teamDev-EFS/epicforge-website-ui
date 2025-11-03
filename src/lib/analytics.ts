// Analytics tracking utility
// Production: Uses VITE_API_BASE_URL from environment variables (Render backend)
// Development: Falls back to localhost:5000/api if not set
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

// Track analytics event
export async function trackEvent(
  type: "visitor" | "footfall" | "cookie" | "audit_request" | "whatsapp_click",
  metadata?: Record<string, any>
): Promise<void> {
  try {
    const sessionId = getSessionId();
    await fetch(`${API_URL}/analytics/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        sessionId,
        path: window.location.pathname,
        metadata: metadata || {},
      }),
    });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    // Silently fail - don't block user experience
  }
}

// Track page visitor (called on page load)
export function trackVisitor(): void {
  trackEvent("visitor");
}

// Track footfall (interaction event)
export function trackFootfall(action: string, metadata?: Record<string, any>): void {
  trackEvent("footfall", { action, ...metadata });
}

// Track cookie acceptance
export function trackCookieAcceptance(): void {
  trackEvent("cookie");
}

// Track audit request
export function trackAuditRequest(data: Record<string, any>): void {
  trackEvent("audit_request", data);
}

// Track WhatsApp click
export function trackWhatsAppClick(data: Record<string, any>): void {
  trackEvent("whatsapp_click", data);
}

