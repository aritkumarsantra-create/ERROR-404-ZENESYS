import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Zap,
  CheckCircle2,
  FileText,
  TrendingDown,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Flame
} from 'lucide-react';
import { useAI } from '../../context/AIContext';
import { useCustomer } from '../../context/CustomerContext';
import { useToast } from '../../context/ToastContext';
import { aiService, SentimentAnalysisResult } from '../../services/aiService';
import { Customer } from '../../types';

export const AISentimentInspectorModal: React.FC = () => {
  const { isSentimentInspectorOpen, closeSentimentInspector, sentimentCustomer } = useAI();
  const { activeCustomer, customers, updateCustomer, selectCustomer } = useCustomer();
  const { success, info } = useToast();

  const targetCustomer: Customer = sentimentCustomer || activeCustomer;

  const samplePresets = [
    {
      id: 'angry_escalation',
      title: '🔴 Critical Escalation: Ad Tracking Tag Discrepancy',
      snippet: `Marcus, we just audited our Meta & Google ad conversions for July and there is a 34% data discrepancy between Customer 360 and our backend Snowflake warehouse. My CMO is furious. If this tracking latency is not patched by Thursday, we are cancelling our Enterprise renewal and evaluating Demandbase.`,
      type: 'critical'
    },
    {
      id: 'delight_expansion',
      title: '🟢 Delight & Expansion: Q3 ROAS (+42%) Milestone',
      snippet: `Hey Marcus! The new AI Multi-Touch Attribution report you helped us set up is fantastic. Our blended ROAS jumped from 3.2x to 4.8x this past month. Our executive team approved an additional $50k monthly budget for Google Search and we want to upgrade to the Real-Time Bidding API add-on ASAP. Let's schedule a call this Friday!`,
      type: 'positive'
    },
    {
      id: 'hesitant_eval',
      title: '🟡 Guarded Inquiry: Evaluating Salesforce Native Add-on',
      snippet: `Hi team, we received a proposal from Salesforce offering their native Data Cloud attribution for free bundled into our CRM contract. How does Customer 360's real-time pixel telemetry differentiate from Salesforce's scheduled sync? We need a clear comparison before our board meeting.`,
      type: 'neutral'
    },
    {
      id: 'billing_friction',
      title: '🟠 Friction: Invoicing Currency & Seat License Confusion',
      snippet: `Support team, our finance department noticed two separate charges on our corporate card for the 20-seat expansion pack. Can someone please clarify the billing terms and provide an updated consolidated VAT invoice?`,
      type: 'warning'
    }
  ];

  const [customText, setCustomText] = useState(samplePresets[0].snippet);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SentimentAnalysisResult | null>(null);

  if (!isSentimentInspectorOpen) return null;

  const handleRunAnalysis = async () => {
    if (!customText.trim()) return;
    setIsAnalyzing(true);
    info('AI NLP Engine Running', `Analyzing communication signals for ${targetCustomer.name}...`);

    try {
      const result = await aiService.analyzeCustomerText(customText, targetCustomer);
      setAnalysisResult(result);
      success('NLP Analysis Complete', `Sentiment calibrated: ${result.sentimentLabel} (${result.sentimentScore}/100)`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyToProfile = () => {
    if (!analysisResult) return;

    const newHealthScore = Math.max(10, Math.min(99, targetCustomer.healthScore + analysisResult.healthScoreShift));
    const newHealthStatus = newHealthScore >= 80 ? 'Good' : newHealthScore >= 60 ? 'Neutral' : 'At Risk';

    updateCustomer(targetCustomer.id, {
      healthScore: newHealthScore,
      healthStatus: newHealthStatus,
      sentimentScore: analysisResult.sentimentScore,
      sentimentLabel: analysisResult.sentimentLabel,
      sentimentSummary: analysisResult.summary,
      sentimentTriggers: [
        {
          source: 'AI NLP Sentiment Inspector',
          text: analysisResult.keySignals[0]?.quote || customText.slice(0, 90) + '...',
          type: analysisResult.healthScoreShift >= 0 ? 'positive' : 'warning',
          date: 'Just now'
        },
        ...targetCustomer.sentimentTriggers
      ]
    });

    success(
      'Profile Recalibrated',
      `Updated ${targetCustomer.name}'s Health Index to ${newHealthScore}/100 (${newHealthStatus}).`
    );
    closeSentimentInspector();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-card-light dark:bg-card-dark w-full max-w-4xl max-h-[90vh] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-outfit">
                  AI Natural Language Sentiment & Health Inspector
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Feature Spotlight
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Paste customer emails, tickets, or Slack transcripts to extract emotional tone, churn probability, and recalibrate health gauges.
              </p>
            </div>
          </div>

          <button
            onClick={closeSentimentInspector}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Context Sub-header */}
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
              <span className="text-slate-400 ml-1.5">• {targetCustomer.company}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500 dark:text-slate-400">
              Current Health Index: <strong className="text-slate-900 dark:text-white">{targetCustomer.healthScore}/100</strong> ({targetCustomer.healthStatus})
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Preset Buttons */}
          <div>
            <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-2">
              Select Sample Communication Scenario:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {samplePresets.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setCustomText(preset.snippet);
                    setAnalysisResult(null);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    customText === preset.snippet
                      ? 'border-brand-500 bg-brand-500/10 text-brand-700 dark:text-brand-300 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="font-semibold text-xs">{preset.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Raw Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                Raw Customer Communication Text / Transcript:
              </label>
              <span className="text-[10px] text-slate-400">{customText.length} characters</span>
            </div>
            <textarea
              rows={4}
              value={customText}
              onChange={e => {
                setCustomText(e.target.value);
                setAnalysisResult(null);
              }}
              placeholder="Paste email body, Zendesk ticket message, Zoom meeting transcription..."
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-sans text-xs focus:ring-2 focus:ring-brand-500 focus:outline-hidden"
            />
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Scans for churn triggers, tone polarity, and executive sentiment.
            </span>
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing || !customText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-md shadow-brand-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Processing NLP Signals...' : 'Run AI Sentiment Analysis'}</span>
            </button>
          </div>

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-5 animate-slide-up">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white font-outfit">
                    AI Sentiment Calibration Results
                  </h4>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    analysisResult.urgencyLevel === 'Critical'
                      ? 'bg-rose-500 text-white animate-pulse'
                      : analysisResult.urgencyLevel === 'High'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {analysisResult.urgencyLevel} Urgency
                </span>
              </div>

              {/* 3 Metric Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sentiment Score</span>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-outfit mt-0.5">
                    {analysisResult.sentimentScore}%
                  </div>
                  <span className="text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                    {analysisResult.sentimentLabel}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Health Score Shift</span>
                  <div
                    className={`text-xl font-black font-outfit mt-0.5 ${
                      analysisResult.healthScoreShift >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {analysisResult.healthScoreShift >= 0 ? `+${analysisResult.healthScoreShift}` : analysisResult.healthScoreShift} pts
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Projected: {Math.max(10, Math.min(99, targetCustomer.healthScore + analysisResult.healthScoreShift))}/100
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Predicted Churn Probability</span>
                  <div
                    className={`text-xl font-black font-outfit mt-0.5 ${
                      analysisResult.churnProbability > 50 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {analysisResult.churnProbability}%
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {analysisResult.churnProbability > 50 ? 'High Churn Risk' : 'Low Risk Retention'}
                  </span>
                </div>
              </div>

              {/* Emotion Intensity Progress Bars */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px] block">
                  Detected Emotional Drivers:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysisResult.emotions.map((emotion, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-slate-600 dark:text-slate-300">
                        <span>{emotion.name}</span>
                        <span className="font-bold">{emotion.intensity}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${emotion.intensity}%`,
                            backgroundColor: emotion.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary & Recommendation */}
              <div className="space-y-2 p-3.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 text-xs">
                  Executive AI Summary:
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                  {analysisResult.summary}
                </p>

                <div className="pt-2 border-t border-indigo-200/40 dark:border-indigo-900/40">
                  <span className="font-bold text-indigo-900 dark:text-indigo-300 text-[11px] block mb-0.5">
                    Recommended Action:
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">
                    {analysisResult.recommendedAction}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <button
            onClick={closeSentimentInspector}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>

          {analysisResult && (
            <button
              onClick={handleApplyToProfile}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <span>Apply Recalibration to Live Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
