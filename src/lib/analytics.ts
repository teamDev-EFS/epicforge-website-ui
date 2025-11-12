// Analytics tracking utility (local only - no backend)
// Get or create session ID
function getSessionId(): string {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
}

// Track page visitor (called on page load) - local tracking only
export function trackVisitor(): void {
  const sessionId = getSessionId();
  // Store in localStorage for local analytics
  const visits = JSON.parse(localStorage.getItem("visits") || "[]");
  visits.push({
    timestamp: Date.now(),
    path: window.location.pathname,
    sessionId,
  });
  // Keep only last 100 visits
  if (visits.length > 100) {
    visits.shift();
  }
  localStorage.setItem("visits", JSON.stringify(visits));
}

