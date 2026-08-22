import React from 'react';
import { Sparkles, Bot, Zap } from 'lucide-react';
import { useAI } from '../../context/AIContext';

export const AIFloatingTrigger: React.FC = () => {
  const { isCopilotOpen, setIsCopilotOpen } = useAI();

  if (isCopilotOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Floating Tooltip Pill */}
      <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-800/90 text-white text-xs font-semibold shadow-xl border border-slate-700/80 backdrop-blur-md animate-fade-in pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin-slow" />
        <span>ZenAI Copilot</span>
        <kbd className="ml-1 px-1.5 py-0.5 text-[9px] font-mono bg-white/10 rounded border border-white/20">
          Ctrl+J
        </kbd>
      </div>

      {/* Main Floating Glowing Trigger Button */}
      <button
        onClick={() => setIsCopilotOpen(true)}
        className="relative group p-3.5 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 hover:from-brand-500 hover:via-indigo-500 hover:to-cyan-400 text-white shadow-glow-indigo transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        title="Open ZenAI Sales Copilot (Ctrl+J)"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute -inset-1 rounded-2xl bg-brand-500/30 blur-md group-hover:bg-brand-500/50 transition-all animate-pulse pointer-events-none" />
        
        {/* Icon */}
        <div className="relative flex items-center justify-center">
          <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
        </div>
      </button>
    </div>
  );
};
