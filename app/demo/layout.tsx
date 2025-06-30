"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("jarvis-auth") !== "1") {
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("jarvis-auth");
    router.replace("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81]">
      <header className="flex items-center justify-between px-6 py-4 bg-white/10 border-b border-cyan-400/10 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Jarvis Logo" className="w-8 h-8 rounded-full" />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-cyan-400 to-purple-500">Jarvis Demo</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold shadow hover:scale-105 transition-transform"
        >
          Выйти
        </button>
      </header>
      <main>{children}</main>
    </div>
  );
} 