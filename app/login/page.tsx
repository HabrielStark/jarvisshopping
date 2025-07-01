"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DEMO_EMAIL = "demo@jarvis.ai";
const DEMO_PASS = "demo123";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // No auto-redirect to /demo
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (
        (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASS) ||
        (email.trim().toLowerCase() === "guest" && password === "guest")
      ) {
        localStorage.setItem("jarvis-auth", "1");
        router.replace("/demo");
      } else {
        setError("Invalid email or password. Try demo@jarvis.ai / demo123 or guest / guest.");
        setLoading(false);
      }
    }, 900);
  };

  const handleGuest = () => {
    setEmail("guest");
    setPassword("guest");
    setTimeout(() => {
      localStorage.setItem("jarvis-auth", "1");
      router.replace("/demo");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] relative overflow-hidden">
      {/* Animated Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-purple-500/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-yellow-400/20 to-cyan-400/10 rounded-full blur-2xl animate-pulse z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 to-transparent rounded-full blur-2xl z-0" />
      <div className="relative z-10 w-full max-w-md mx-auto">
        <form
          onSubmit={handleLogin}
          className="glass-card p-10 rounded-3xl shadow-2xl border border-cyan-400/20 backdrop-blur-2xl bg-white/10 flex flex-col items-center"
        >
          <div className="mb-8 flex flex-col items-center">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-xl mb-3 animate-spin-slow">
              <Image src="/logo.png" alt="Jarvis Logo" width={48} height={48} className="rounded-full" />
            </div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-cyan-400 to-purple-500 mb-1">Sign in to Jarvis</h1>
            <p className="text-gray-300 text-sm">AI Shopping Negotiator</p>
          </div>
          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Email (demo@jarvis.ai or guest)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 mb-3 transition-all"
              autoFocus
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password (demo123 or guest)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-cyan-400/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 transition-all"
              disabled={loading}
            />
          </div>
          {error && <div className="w-full text-center text-red-400 mb-3 text-sm animate-pulse">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform mb-3 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-cyan-400 text-gray-900 font-bold text-lg shadow-lg hover:scale-105 transition-transform mb-1 disabled:opacity-60"
            onClick={handleGuest}
            disabled={loading}
          >
            Sign in as Guest
          </button>
          <div className="text-xs text-gray-400 mt-4 text-center">
            <span>Demo: demo@jarvis.ai / demo123<br />or guest / guest</span>
          </div>
        </form>
      </div>
    </div>
  );
} 