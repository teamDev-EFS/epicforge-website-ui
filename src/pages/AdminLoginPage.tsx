import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Production: Uses VITE_API_BASE_URL from environment variables (Render backend)
// Development: Falls back to localhost:5000/api if not set
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Login failed");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // After login, go to Admin dashboard
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-1">Admin Login</h1>
          <p className="text-slate-300 mb-6">
            Sign in to manage leads and content.
          </p>
          {error && (
            <div className="mb-4 text-rose-300 bg-rose-900/30 border border-rose-700 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl font-semibold bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-xl hover:shadow-2xl disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <div className="text-xs text-slate-400 text-center">
              API: {API_URL}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLoginPage;
