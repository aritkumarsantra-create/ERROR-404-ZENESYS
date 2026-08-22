import React from 'react';
import {
  Zap,
  Flame,
  TrendingUp,
  ShieldCheck,
  Target,
  Sparkles,
  Users,
  Building2,
  DollarSign,
  ArrowUpRight,
  HeartHandshake
} from 'lucide-react';

export const HeroShowcase: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      {/* Background ambient glowing orbs */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Elevated Glass Card */}
      <div className="relative rounded-3xl p-6 sm:p-7 bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800/80 shadow-2xl space-y-5">
        {/* Top Header of Simulated Mini-Dashboard */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-cyan-400 flex items-center justify-center text-white shadow-glow-indigo">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="text-xs font-black text-white tracking-wide font-outfit">
                CUSTOMER 360 AI ENGINE
              </div>
              <div className="text-[10px] text-slate-300 dark:text-slate-400 font-medium">
                Live Sales & Ad Attribution Feed
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>94.2% AI Accuracy</span>
          </div>
        </div>

        {/* Live Hot Lead Highlight Card */}
        <div className="p-4 rounded-2xl bg-white/10 dark:bg-slate-800/80 border border-white/15 dark:border-slate-700/60 backdrop-blur-md space-y-3 transform transition-transform hover:scale-[1.02] duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-200 font-bold text-xs">
                AC
              </div>
              <div>
                <div className="text-xs font-bold text-white">ApexCloud Technologies</div>
                <div className="text-[10px] text-slate-300">Cloud Infrastructure SaaS</div>
              </div>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold">
              <Flame className="w-3 h-3 text-emerald-400" />
              <span>Score: 94 (Hot Lead)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div className="p-2 rounded-xl bg-black/20 text-slate-200">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Ad ROAS Attributed</span>
              <span className="font-extrabold text-emerald-400 text-xs font-outfit">5.2x ROAS</span>
            </div>
            <div className="p-2 rounded-xl bg-black/20 text-slate-200">
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Expansion Opportunity</span>
              <span className="font-extrabold text-white text-xs font-outfit">+$180,000 ARR</span>
            </div>
          </div>
        </div>

        {/* Health & Sentiment Visual Signal (README Feature Preview) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-white">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Customer Health & Sentiment Meter</span>
            </div>
            <span className="text-emerald-400 font-extrabold">92/100 (Good)</span>
          </div>

          {/* Color-coded Meter Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex gap-1 p-0.5">
            <div className="h-full w-1/4 bg-rose-500/40 rounded-l-full" title="<60 Red At-Risk" />
            <div className="h-full w-1/4 bg-amber-500/40" title="60-79 Yellow Neutral" />
            <div className="h-full w-2/4 bg-emerald-500 rounded-r-full shadow-glow-emerald" title="80+ Green Healthy" />
          </div>

          <p className="text-[10px] text-slate-300 leading-snug">
            AI scanned 28 emails & 14 tickets: High satisfaction with Q3 Multi-touch attribution (+38% ROAS).
          </p>
        </div>

        {/* Bottom Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[9px] uppercase font-bold text-slate-300 block">Total Pipeline</span>
            <div className="text-sm font-extrabold text-white font-outfit mt-0.5">$4.82M</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[9px] uppercase font-bold text-slate-300 block">Active Leads</span>
            <div className="text-sm font-extrabold text-indigo-300 font-outfit mt-0.5">3,842</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[9px] uppercase font-bold text-slate-300 block">Blended ROAS</span>
            <div className="text-sm font-extrabold text-emerald-400 font-outfit mt-0.5">4.6x</div>
          </div>
        </div>
      </div>

      {/* Floating Trust Pill Badge */}
      <div className="absolute -bottom-5 right-4 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-slate-200 border border-slate-700/80 shadow-xl flex items-center gap-2 text-xs font-semibold backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Enterprise Sales Readiness</span>
      </div>
    </div>
  );
};
