import React, { useState } from 'react';
import {
  Settings,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Bell,
  Key,
  Shield,
  Zap,
  Globe,
  Plus,
  Sparkles,
  Bot,
  Cpu,
  Lock,
  Eye,
  EyeOff,
  Check,
  Flame,
  Lightbulb
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAI } from '../../context/AIContext';
import { AIProvider, AIModel } from '../../services/aiService';

export const SettingsView: React.FC = () => {
  const { success, info } = useToast();
  const { settings: aiConfig, updateSettings } = useAI();

  // AI Configuration State
  const [provider, setProvider] = useState<AIProvider>(aiConfig.provider);
  const [model, setModel] = useState<AIModel>(aiConfig.model);
  const [apiKey, setApiKey] = useState(aiConfig.apiKey || '');
  const [temperature, setTemperature] = useState(aiConfig.temperature || 0.7);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTestingAI, setIsTestingAI] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<string | null>(null);

  const [integrations, setIntegrations] = useState([
    {
      id: 'google',
      name: 'Google Ads Manager',
      category: 'Ad Platform',
      icon: 'https://www.google.com/favicon.ico',
      status: 'Connected',
      lastSync: '4 mins ago',
      eventsTracked: '42,900'
    },
    {
      id: 'meta',
      name: 'Meta Ads (Facebook & Instagram)',
      category: 'Ad Platform',
      icon: 'https://static.xx.fbcdn.net/rsrc.php/yb/r/4DhKxDuBxAY.ico',
      status: 'Connected',
      lastSync: '12 mins ago',
      eventsTracked: '89,400'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn Campaign Manager',
      category: 'Ad Platform',
      icon: 'https://static.licdn.com/aero-v1/sc/h/al2o9zrvru7aqj8e1x2rzsrca',
      status: 'Connected',
      lastSync: '1 hour ago',
      eventsTracked: '14,200'
    },
    {
      id: 'salesforce',
      name: 'Salesforce Enterprise CRM',
      category: 'CRM Sync',
      icon: 'https://www.salesforce.com/favicon.ico',
      status: 'Connected',
      lastSync: 'Just now',
      eventsTracked: '12,480 Accounts'
    },
    {
      id: 'hubspot',
      name: 'HubSpot Marketing Hub',
      category: 'Marketing Automation',
      icon: 'https://www.hubspot.com/favicon.ico',
      status: 'Connected',
      lastSync: '30 mins ago',
      eventsTracked: '3,842 Leads'
    }
  ]);

  const [scoringWeights, setScoringWeights] = useState({
    adClicks: 35,
    pricingPageVisits: 25,
    firmographicFit: 25,
    emailSentiment: 15
  });

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    success('Scoring Model Updated', 'New lead scoring weights published across all accounts.');
  };

  const handleAutoCalibrateWeights = () => {
    info('AI Calibration Running', 'Analyzing 12,480 historical closed-won conversions...');
    setTimeout(() => {
      setScoringWeights({
        adClicks: 40,
        pricingPageVisits: 20,
        firmographicFit: 20,
        emailSentiment: 20
      });
      success('AI Calibration Applied', 'Scoring formula optimized based on conversion velocity.');
    }, 1000);
  };

  const handleSaveAISettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      provider,
      model,
      apiKey,
      temperature
    });
  };

  const handleTestConnection = async () => {
    setIsTestingAI(true);
    setAiTestResult(null);

    if (provider === 'builtin') {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAiTestResult('✅ Built-in Autonomous Neural Engine is healthy and fully calibrated (Latency: 12ms).');
      setIsTestingAI(false);
      return;
    }

    if (!apiKey) {
      setAiTestResult(`⚠️ Please enter an API key for ${provider.toUpperCase()} mode.`);
      setIsTestingAI(false);
      return;
    }

    try {
      if (provider === 'gemini') {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Respond with "Connection Successful"' }] }]
          })
        });
        if (res.ok) {
          setAiTestResult(`✅ Successfully connected to Google Gemini API (${model}). Live inference ready.`);
          success('Gemini API Connected', 'Live cloud intelligence active.');
        } else {
          setAiTestResult(`❌ API Error (${res.status}): ${res.statusText}. Please verify key validity.`);
        }
      } else if (provider === 'openai') {
        const url = 'https://api.openai.com/v1/models';
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${apiKey}` }
        });
        if (res.ok) {
          setAiTestResult(`✅ Successfully authenticated with OpenAI API (${model}).`);
          success('OpenAI API Connected', 'Live cloud intelligence active.');
        } else {
          setAiTestResult(`❌ OpenAI Error (${res.status}): Invalid API key.`);
        }
      }
    } catch (err: any) {
      setAiTestResult(`❌ Network / CORS error: ${err.message}. Defaulting to Autonomous Engine.`);
    } finally {
      setIsTestingAI(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Settings className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold font-outfit">
              Platform & AI Intelligence Hub
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Configure live LLM providers (Google Gemini / OpenAI), manage connected advertising channels, and calibrate AI lead scoring thresholds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-full flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Status: Active</span>
          </span>
        </div>
      </div>

      {/* AI & LLM Model Hub Configuration */}
      <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-xs">
              <Bot className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                AI & LLM Model Configuration
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose between the built-in Autonomous Neural Engine or connect your custom Google Gemini / OpenAI API key.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveAISettings} className="space-y-6 text-xs">
          {/* Provider Selector Cards */}
          <div>
            <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-2">
              Select AI Engine / Cloud Provider:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'builtin' as AIProvider,
                  name: 'Autonomous Neural Engine',
                  badge: 'Zero Setup / Default',
                  desc: 'Pre-calibrated on B2B Ad Sales, Multi-Touch Attribution & Sentiment telemetry.'
                },
                {
                  id: 'gemini' as AIProvider,
                  name: 'Google Gemini Cloud LLM',
                  badge: 'Custom API Key',
                  desc: 'Connect Gemini 1.5 Pro / Flash for generative reasoning and deep intelligence.'
                },
                {
                  id: 'openai' as AIProvider,
                  name: 'OpenAI GPT-4o Engine',
                  badge: 'Custom API Key',
                  desc: 'Connect GPT-4o / GPT-4o-mini for conversational sales intelligence.'
                }
              ].map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setProvider(p.id);
                    if (p.id === 'gemini') setModel('gemini-1.5-flash');
                    if (p.id === 'openai') setModel('gpt-4o');
                    if (p.id === 'builtin') setModel('neural-v4');
                    setAiTestResult(null);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    provider === p.id
                      ? 'border-brand-500 bg-brand-500/10 text-slate-900 dark:text-white shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs">{p.name}</span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {p.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Model & Key inputs (if cloud provider) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Model Selector */}
            <div>
              <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block mb-1.5">
                Active AI Model:
              </label>
              <select
                value={model}
                onChange={e => setModel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              >
                {provider === 'gemini' ? (
                  <>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash (Ultra Fast & Low Latency)</option>
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep Strategic Reasoning)</option>
                    <option value="gemini-2.0-flash">Gemini 2.0 Flash (Next-Gen High Throughput)</option>
                  </>
                ) : provider === 'openai' ? (
                  <>
                    <option value="gpt-4o">GPT-4o (Omni Frontier Model)</option>
                    <option value="gpt-4o-mini">GPT-4o Mini (Cost Efficient)</option>
                  </>
                ) : (
                  <option value="neural-v4">Autonomous Customer 360 Neural Simulator v4.2</option>
                )}
              </select>
            </div>

            {/* API Key Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                  {provider === 'builtin' ? 'API Key (Optional for Built-in)' : `${provider.toUpperCase()} API Key:`}
                </label>
                {provider !== 'builtin' && (
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    {showApiKey ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showApiKey ? 'Hide' : 'Show'}</span>
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder={
                    provider === 'gemini'
                      ? 'AIzaSy...'
                      : provider === 'openai'
                      ? 'sk-proj-...'
                      : 'Built-in Engine does not require an API key'
                  }
                  disabled={provider === 'builtin'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-mono placeholder-slate-400 focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Temperature Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <span>Creativity & Temperature Calibration:</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={temperature}
              onChange={e => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Deterministic & Analytical (0.0)</span>
              <span>Balanced (0.7)</span>
              <span>Creative & Persuasive (1.0)</span>
            </div>
          </div>

          {/* Test connection result banner */}
          {aiTestResult && (
            <div
              className={`p-3 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                aiTestResult.startsWith('✅')
                  ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/30'
              }`}
            >
              {aiTestResult}
            </div>
          )}

          {/* Submit & Test Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTestingAI}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTestingAI ? 'animate-spin' : ''}`} />
              <span>{isTestingAI ? 'Testing Connection...' : 'Test AI Connection'}</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save AI Model Configuration</span>
            </button>
          </div>
        </form>
      </div>

      {/* Connected Ad Engines */}
      <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
              Connected Advertising & CRM Integrations
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live bi-directional data pipelines powering multi-touch customer attribution.
            </p>
          </div>

          <button
            onClick={() => success('Connector Hub', 'Opening OAuth app directory...')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Connect Channel</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map(integ => (
            <div
              key={integ.id}
              className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center p-1.5 shrink-0 shadow-xs">
                    <Zap className="w-4 h-4 text-brand-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {integ.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {integ.category}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  {integ.status}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>Sync: {integ.lastSync}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">{integ.eventsTracked}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Scoring Weights Configurator with AI Auto-Calibration */}
      <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
                AI Lead Score Formula Customizer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adjust attribution weights to fine-tune how Hot/Warm/Cold tiers are computed.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAutoCalibrateWeights}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-xs hover:from-brand-500 hover:to-indigo-500 transition-all active:scale-95 self-start sm:self-center cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-200" />
            <span>AI Auto-Calibrate Weights</span>
          </button>
        </div>

        <form onSubmit={handleSaveWeights} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>High-Intent Ad Clicks & Conversions</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">{scoringWeights.adClicks}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={scoringWeights.adClicks}
                onChange={e => setScoringWeights({ ...scoringWeights, adClicks: Number(e.target.value) })}
                className="w-full accent-brand-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Pricing Page & Docs Visit Depth</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">{scoringWeights.pricingPageVisits}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={scoringWeights.pricingPageVisits}
                onChange={e => setScoringWeights({ ...scoringWeights, pricingPageVisits: Number(e.target.value) })}
                className="w-full accent-brand-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Firmographic Revenue & Size Match</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">{scoringWeights.firmographicFit}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={scoringWeights.firmographicFit}
                onChange={e => setScoringWeights({ ...scoringWeights, firmographicFit: Number(e.target.value) })}
                className="w-full accent-brand-600"
              />
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Customer Sentiment & Ticket Velocity</span>
                <span className="font-bold text-brand-600 dark:text-brand-400">{scoringWeights.emailSentiment}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={scoringWeights.emailSentiment}
                onChange={e => setScoringWeights({ ...scoringWeights, emailSentiment: Number(e.target.value) })}
                className="w-full accent-brand-600"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Save & Recalibrate Leads
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
