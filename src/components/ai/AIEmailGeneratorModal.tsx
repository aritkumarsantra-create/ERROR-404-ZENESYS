import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Copy,
  Check,
  RefreshCw,
  Mail,
  Linkedin,
  PhoneCall,
  MessageSquare,
  ExternalLink,
  PlusCircle,
  FileCheck2,
  DollarSign,
  TrendingUp,
  Target
} from 'lucide-react';
import { useAI } from '../../context/AIContext';
import { useCustomer } from '../../context/CustomerContext';
import { useToast } from '../../context/ToastContext';
import { aiService, EmailPitchParams } from '../../services/aiService';
import { Customer } from '../../types';

export const AIEmailGeneratorModal: React.FC = () => {
  const { isEmailGenOpen, closeEmailGenerator, emailCustomer, emailInitialObjective } = useAI();
  const { activeCustomer, updateCustomer } = useCustomer();
  const { success, info } = useToast();

  const targetCustomer: Customer = emailCustomer || activeCustomer;

  const [objective, setObjective] = useState<EmailPitchParams['objective']>(
    emailInitialObjective || (targetCustomer.healthStatus === 'At Risk' ? 'churn_rescue' : 'upsell')
  );
  const [tone, setTone] = useState<EmailPitchParams['tone']>('executive');
  const [channel, setChannel] = useState<EmailPitchParams['channel']>('email');
  const [customNotes, setCustomNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSubject, setGeneratedSubject] = useState('');
  const [generatedBody, setGeneratedBody] = useState('');
  const [talkingPoints, setTalkingPoints] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isEmailGenOpen) {
      if (emailInitialObjective) {
        setObjective(emailInitialObjective);
      } else if (targetCustomer.healthStatus === 'At Risk') {
        setObjective('churn_rescue');
      } else {
        setObjective('upsell');
      }
      handleGenerate();
    }
  }, [isEmailGenOpen, targetCustomer.id]);

  if (!isEmailGenOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await aiService.generateEmailPitch({
        customer: targetCustomer,
        objective,
        tone,
        channel,
        customNotes
      });
      setGeneratedSubject(res.subject);
      setGeneratedBody(res.body);
      setTalkingPoints(res.keyTalkingPoints);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    const fullText = channel === 'email' ? `Subject: ${generatedSubject}\n\n${generatedBody}` : generatedBody;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    success('Copied to Clipboard', 'Pitch copied to your clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenMailClient = () => {
    const mailto = `mailto:${targetCustomer.email}?subject=${encodeURIComponent(
      generatedSubject
    )}&body=${encodeURIComponent(generatedBody)}`;
    window.open(mailto, '_blank');
    success('Mail Client Opened', `Drafted email to ${targetCustomer.email}`);
  };

  const handleLogToTimeline = () => {
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'email' as const,
      title: `AI Outreach Drafted (${objective.toUpperCase()})`,
      description: `Subject: "${generatedSubject}". Outreach customized via AI Copilot.`,
      timestamp: 'Just now',
      sentiment: 'positive' as const,
      author: {
        name: targetCustomer.assignedRep.name
      }
    };

    updateCustomer(targetCustomer.id, {
      timeline: [newActivity, ...targetCustomer.timeline]
    });

    success('Logged to Timeline', 'Outreach interaction appended to Customer 360 Activity Timeline.');
    closeEmailGenerator();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card-light dark:bg-card-dark w-full max-w-4xl max-h-[92vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-white border border-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-outfit">
                  AI Smart Outreach & Pitch Generator
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-brand-500/20 text-brand-200 border border-brand-500/30">
                  Real-Time Personalization
                </span>
              </div>
              <p className="text-xs text-indigo-200">
                Crafts hyper-personalized emails, InMails, and call playbooks powered by live ad spend & ROAS metrics.
              </p>
            </div>
          </div>

          <button
            onClick={closeEmailGenerator}
            className="p-2 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Mini Bar */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={targetCustomer.avatar}
              alt={targetCustomer.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
            />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">
                {targetCustomer.name}
              </span>
              <span className="text-slate-400 ml-1.5">• {targetCustomer.role} at {targetCustomer.company}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
              Ad Spend: ${(targetCustomer.adSpendLTV / 1000).toFixed(0)}k
            </span>
            <span className="px-2.5 py-0.5 rounded-md font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              ROAS: {targetCustomer.roas}x
            </span>
          </div>
        </div>

        {/* Main Workspace Layout */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
          {/* Left Column: Config Controls */}
          <div className="lg:col-span-5 space-y-4">
            {/* Objective Selector */}
            <div>
              <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-1.5">
                Sales Campaign Objective:
              </label>
              <select
                value={objective}
                onChange={e => setObjective(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              >
                <option value="upsell">Enterprise Renewal & ARR Expansion (+$50k)</option>
                <option value="churn_rescue">Emergency Churn Rescue & SLA Credit</option>
                <option value="qbr_review">Quarterly Business Review & ROAS Dossier</option>
                <option value="demo_followup">High-Intent Demo Follow-up</option>
                <option value="roas_scale">Cross-Channel ROAS Scaling Partnership</option>
              </select>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-1.5">
                Communication Tone:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'executive', label: 'Executive C-Level' },
                  { id: 'consultative', label: 'Consultative Advisor' },
                  { id: 'urgent', label: 'Urgent & Direct' },
                  { id: 'relational', label: 'Warm & Relational' }
                ].map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id as any)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                      tone === t.id
                        ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Channel Selector */}
            <div>
              <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-1.5">
                Channel / Format:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'email', label: 'Email', icon: Mail },
                  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
                  { id: 'call_script', label: 'Call Script', icon: PhoneCall }
                ].map(c => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setChannel(c.id as any)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs transition-all ${
                        channel === c.id
                          ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Custom Notes */}
            <div>
              <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-1.5">
                Additional Instructions / Custom Focus:
              </label>
              <textarea
                rows={2}
                value={customNotes}
                onChange={e => setCustomNotes(e.target.value)}
                placeholder="e.g., Mention Sarah's keynote next week or offer free proof of concept..."
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Regenerate Trigger */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-md shadow-brand-500/25 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Synthesizing with AI...' : 'Regenerate Pitch with AI'}</span>
            </button>
          </div>

          {/* Right Column: Output Preview Editor */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60 dark:border-slate-800/60">
              <span className="font-bold text-slate-900 dark:text-white font-outfit text-sm">
                Generated Outreach Content
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Subject Line (if applicable) */}
            {channel === 'email' && (
              <div>
                <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                  Subject Line:
                </label>
                <input
                  type="text"
                  value={generatedSubject}
                  onChange={e => setGeneratedSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                />
              </div>
            )}

            {/* Body Editor */}
            <div className="flex-1 flex flex-col">
              <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-1">
                Body Content (Editable):
              </label>
              <textarea
                rows={10}
                value={generatedBody}
                onChange={e => setGeneratedBody(e.target.value)}
                className="w-full flex-1 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs leading-relaxed focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>

            {/* Key Talking Points */}
            {talkingPoints.length > 0 && (
              <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-900/40 space-y-1">
                <span className="font-bold text-indigo-900 dark:text-indigo-300 text-[10px] uppercase tracking-wider">
                  AI Talking Points Embedded:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-300 text-[11px]">
                  {talkingPoints.map((tp, idx) => (
                    <li key={idx}>{tp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={closeEmailGenerator}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {channel === 'email' && (
              <button
                onClick={handleOpenMailClient}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Email App</span>
              </button>
            )}

            <button
              onClick={handleLogToTimeline}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Log to Activity Timeline</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
