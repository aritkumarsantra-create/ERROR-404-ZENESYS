import React, { useState, useEffect } from 'react';
import { Zap, Sparkles, ShieldCheck, CheckCircle2, Bot, Layers, ArrowRight } from 'lucide-react';

interface StartupSplashScreenProps {
  onComplete: () => void;
}

export const StartupSplashScreen: React.FC<StartupSplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const statusMessages = [
    'Booting ZenAI Neural Intelligence Core v4.2...',
    'Establishing Multi-Touch Ad Pipelines (Google, Meta, LinkedIn)...',
    'Calibrating Real-Time Customer Health & NLP Gauges...',
    'Synchronizing Enterprise Accounts & Deal Telemetry...',
    'System Calibrated. Welcome to Customer 360.'
  ];

  useEffect(() => {
    // Listen for Escape key to skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishSplash();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Progress counter
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => finishSplash(), 400);
          return 100;
        }
        const increment = prev < 30 ? 6 : prev < 70 ? 8 : 12;
        const next = Math.min(100, prev + increment);
        
        // Update status text milestone
        if (next > 20 && next <= 45) setStatusIndex(1);
        else if (next > 45 && next <= 70) setStatusIndex(2);
        else if (next > 70 && next <= 90) setStatusIndex(3);
        else if (next > 90) setStatusIndex(4);

        return next;
      });
    }, 90);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const finishSplash = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden transition-all duration-700 select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* High-tech ambient grid background */}
      <div className="absolute inset-0 startup-grid-bg opacity-30 pointer-events-none" />

      {/* Radial Gradient Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-600/30 via-indigo-600/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Top Skip Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={finishSplash}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-300 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
        >
          <span>Skip Intro</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white/10 rounded">ESC</kbd>
        </button>
      </div>

      {/* Central Logo & Animation */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md px-6 space-y-8">
        {/* Animated 3D Logo Orb with Orbiting Rings */}
        <div className="relative flex items-center justify-center">
          {/* Outer Orbit Ring */}
          <div className="absolute w-36 h-36 rounded-full border border-dashed border-indigo-500/40 animate-orbit-slow pointer-events-none" />
          
          {/* Inner Counter-Orbit Ring */}
          <div className="absolute w-28 h-28 rounded-full border border-cyan-400/30 animate-orbit-fast pointer-events-none" />

          {/* Central Logo Shield */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-cyan-400 p-0.5 shadow-2xl animate-logo-glow flex items-center justify-center">
            <div className="w-full h-full rounded-[14px] bg-slate-950/80 backdrop-blur-md flex items-center justify-center">
              <Zap className="w-10 h-10 text-cyan-400 fill-cyan-400/20 transform -rotate-12 transition-transform" />
            </div>
            
            {/* Sparkle badge */}
            <span className="absolute -top-2 -right-2 p-1.5 rounded-full bg-brand-500 text-white shadow-lg animate-bounce">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Brand Text */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-extrabold uppercase tracking-widest text-cyan-300 backdrop-blur-md">
            <span>Team ERROR_404</span>
            <span className="w-1 h-1 rounded-full bg-cyan-300" />
            <span>AI Sales Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-outfit tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
            CUSTOMER 360
          </h1>

          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Multi-Touch Ad Attribution & Real-Time Sentiment Telemetry Platform
          </p>
        </div>

        {/* Progressive Loading Bar & Status */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="truncate pr-2">{statusMessages[statusIndex]}</span>
            <span className="font-bold text-cyan-400 shrink-0">{progress}%</span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800/80 p-0.5 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-600 via-indigo-500 to-cyan-400 shadow-glow-indigo transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Security & System Readiness Badge */}
        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium pt-2">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Sync</span>
          </span>
          <span className="flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>Neural Engine Active</span>
          </span>
        </div>
      </div>
    </div>
  );
};
