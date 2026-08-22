import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  ChevronRight,
  Zap,
  ArrowRight,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sliders,
  Flame,
  ShieldAlert,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { useAI } from '../../context/AIContext';
import { useCustomer } from '../../context/CustomerContext';
import { useToast } from '../../context/ToastContext';

export const AICopilotDrawer: React.FC = () => {
  const {
    isCopilotOpen,
    setIsCopilotOpen,
    copilotMessages,
    isCopilotLoading,
    sendCopilotMessage,
    clearCopilotHistory,
    settings,
    openEmailGenerator,
    openSentimentInspector,
    openAdOptimizer
  } = useAI();

  const { activeCustomer, setActiveTab, selectCustomer, rescanSentiment } = useCustomer();
  const { success } = useToast();

  const [inputQuery, setInputQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isCopilotOpen) {
      scrollToBottom();
    }
  }, [copilotMessages, isCopilotOpen, isCopilotLoading]);

  if (!isCopilotOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isCopilotLoading) return;
    const query = inputQuery;
    setInputQuery('');
    sendCopilotMessage(query);
  };

  const handleActionClick = (action: { label: string; actionType: string; payload?: any }) => {
    switch (action.actionType) {
      case 'navigate':
        setActiveTab(action.payload || 'leads');
        break;
      case 'open_email_gen':
        openEmailGenerator(activeCustomer, action.payload?.objective);
        break;
      case 'open_inspector':
        openSentimentInspector(activeCustomer);
        break;
      case 'rescan_sentiment':
        rescanSentiment(activeCustomer.id);
        break;
      case 'apply_recalibration':
        openAdOptimizer();
        break;
      default:
        break;
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    success('Copied to Clipboard', 'Text copied to clipboard.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    `Analyze ${activeCustomer.name}'s churn risk`,
    `Draft Q4 ARR expansion email for ${activeCustomer.company}`,
    `Identify top 3 leads ready to close today`,
    `Optimize Google vs Meta ad spend allocation`
  ];

  return (
    <>
      {/* Backdrop for Mobile / Focus */}
      <div
        onClick={() => setIsCopilotOpen(false)}
        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs transition-opacity lg:hidden"
      />

      {/* Drawer Container */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 bg-card-light dark:bg-card-dark border-l border-slate-200/80 dark:border-slate-800/80 shadow-2xl flex flex-col transition-all duration-300 ${
          isExpanded ? 'w-full lg:w-[680px]' : 'w-full sm:w-[460px]'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-glow-indigo">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
                  ZenAI Sales Copilot
                </h3>
                <span className="px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                  {settings.provider === 'builtin' ? 'Neural Engine' : settings.provider.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Customer 360 & Ad Attribution Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={clearCopilotHistory}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="Clear conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden sm:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsCopilotOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="Close Copilot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Customer Context Strip */}
        <div className="px-4 py-2 bg-brand-500/5 dark:bg-brand-500/10 border-b border-brand-500/10 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-brand-600 dark:text-brand-400 text-[11px] uppercase tracking-wider">
              Active Context:
            </span>
            <span className="font-bold text-slate-900 dark:text-white truncate">
              {activeCustomer.name}
            </span>
            <span className="text-slate-400 truncate">({activeCustomer.company})</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              ROAS: {activeCustomer.roas}x
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Health: {activeCustomer.healthScore}
            </span>
          </div>
        </div>

        {/* Chat Message History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed">
          {copilotMessages.map(msg => {
            const isAI = msg.sender === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAI ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    isAI
                      ? 'bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {isAI ? <Sparkles className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                {/* Bubble Container */}
                <div className={`max-w-[85%] space-y-2 ${isAI ? '' : 'text-right'}`}>
                  <div
                    className={`p-3.5 rounded-2xl ${
                      isAI
                        ? 'bg-slate-100/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800/80 shadow-xs'
                        : 'bg-brand-600 text-white shadow-md rounded-tr-none'
                    }`}
                  >
                    {/* Render Content with Light Markdown Formatting */}
                    <div className="space-y-2 whitespace-pre-line text-left font-sans">
                      {msg.content}
                    </div>

                    {/* Copy action for AI messages */}
                    {isAI && (
                      <div className="pt-2 mt-2 border-t border-slate-200/40 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                        <span>{msg.timestamp}</span>
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="hover:text-brand-500 inline-flex items-center gap-1 transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-500">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Dynamic Action Buttons */}
                  {isAI && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedActions.map((action, actIdx) => (
                        <button
                          key={actIdx}
                          onClick={() => handleActionClick(action)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-semibold bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 border border-brand-500/20 hover:bg-brand-50 dark:hover:bg-slate-700/80 shadow-xs transition-all active:scale-95"
                        >
                          <span>{action.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isCopilotLoading && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse delay-100" />
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse delay-200" />
                <span className="text-[11px] font-medium ml-1">ZenAI analyzing multi-touch telemetry...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Strip */}
        <div className="p-2 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                sendCopilotMessage(prompt);
              }}
              className="px-2.5 py-1 text-[10px] font-medium rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400 whitespace-nowrap transition-all shadow-xs shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-card-dark flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder={`Ask ZenAI about ${activeCustomer.name}, churn risk, ROAS...`}
            disabled={isCopilotLoading}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500 transition-all disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isCopilotLoading}
            className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white shadow-sm transition-all active:scale-95 flex items-center justify-center shrink-0 cursor-pointer"
            title="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </aside>
    </>
  );
};
