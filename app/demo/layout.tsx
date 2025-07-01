"use client";
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81]">
      <header className="flex items-center justify-between px-6 py-4 bg-white/10 border-b border-cyan-400/10 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Jarvis Logo" className="w-8 h-8 rounded-full" />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-cyan-400 to-purple-500">Jarvis Demo</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
} 