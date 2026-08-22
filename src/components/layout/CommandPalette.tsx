import React, { useState, useEffect } from 'react';
import { Search, User, BarChart2, Zap, Settings, ArrowRight, X, Sparkles, Bot, Mail, Swords, Lightbulb } from 'lucide-react';
import { useCustomer, NavigationTab } from '../../context/CustomerContext';
import { useAI } from '../../context/AIContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { customers, selectCustomer, setActiveTab, activeCustomer } = useCustomer();
  const {
    setIsCopilotOpen,
    sendCopilotMessage,
    openEmailGenerator,
    openSentimentInspector,
    openAdOptimizer
  } = useAI();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle or open
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredCustomers = query.trim() === ''
    ? customers.slice(0, 4)
    : customers.filter(
        c =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.company.toLowerCase().includes(query.toLowerCase()) ||
          c.industry.toLowerCase().includes(query.toLowerCase())
      );

  const quickPages: { label: string; tab: NavigationTab; icon: any }[] = [
    { label: 'View Dashboard & Executive KPIs', tab: 'dashboard', icon: BarChart2 },
    { label: 'Explore Lead Intelligence & Scoring', tab: 'leads', icon: Zap },
    { label: 'Ad Sales Attribution & ROI Analytics', tab: 'analytics', icon: BarChart2 },
    { label: 'Platform & Ad Integration Settings', tab: 'settings', icon: Settings }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      {/* Palette Box */}
      <div className="relative w-full max-w-xl bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden animate-slide-up">
        {/* Search Input */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Search customers, companies, leads, or jump to page... (ESC to exit)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* AI Query Trigger Item */}
          {query.trim() && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-500 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Ask ZenAI Sales Copilot</span>
              </div>
              <button
                onClick={() => {
                  setIsCopilotOpen(true);
                  sendCopilotMessage(query);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-brand-500/10 to-indigo-500/10 hover:from-brand-500/20 hover:to-indigo-500/20 border border-brand-500/20 text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-500">
                      "{query}"
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Ask ZenAI to analyze, draft outreach, or simulate ROAS
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400">
                  <span>Ask AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          )}

          {/* Quick AI Tools Section */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              AI Sales Intelligence Tools
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  openEmailGenerator(activeCustomer);
                  onClose();
                }}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                <Mail className="w-4 h-4 text-brand-500" />
                <span>AI Pitch Generator</span>
              </button>

              <button
                onClick={() => {
                  openSentimentInspector(activeCustomer);
                  onClose();
                }}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>NLP Sentiment Inspector</span>
              </button>

              <button
                onClick={() => {
                  openAdOptimizer();
                  onClose();
                }}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                <BarChart2 className="w-4 h-4 text-cyan-500" />
                <span>AI Ad Budget Optimizer</span>
              </button>

              <button
                onClick={() => {
                  setIsCopilotOpen(true);
                  onClose();
                }}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors text-xs font-medium text-slate-700 dark:text-slate-200"
              >
                <Bot className="w-4 h-4 text-indigo-500" />
                <span>Open ZenAI Copilot (Ctrl+J)</span>
              </button>
            </div>
          </div>

          {/* Customers section */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Customers & Accounts ({filteredCustomers.length})
            </div>
            <div className="space-y-1">
              {filteredCustomers.map(cust => (
                <button
                  key={cust.id}
                  onClick={() => {
                    selectCustomer(cust.id, true);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={cust.avatar}
                      alt={cust.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-500">
                        {cust.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {cust.company} • {cust.industry}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        cust.leadTier === 'Hot'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : cust.leadTier === 'Warm'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-rose-500/10 text-rose-500'
                      }`}
                    >
                      {cust.leadScore} pts
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick navigation */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Quick Navigation
            </div>
            <div className="space-y-1">
              {quickPages.map((page, idx) => {
                const Icon = page.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTab(page.tab);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-500"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{page.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">↓</kbd></span>
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded font-mono">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
