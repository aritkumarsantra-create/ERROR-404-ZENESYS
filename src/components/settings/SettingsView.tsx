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
  Plus
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const SettingsView: React.FC = () => {
  const { success } = useToast();

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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-card">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
            <Settings className="w-4 h-4" />
          </span>
          <h2 className="text-lg font-bold font-outfit">
            Platform Settings & Ad Integrations
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Manage connected advertising channels, calibrate AI lead scoring thresholds, and configure team workspace roles.
        </p>
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-xs"
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

      {/* Lead Scoring Weights Configurator */}
      <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
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
              className="px-5 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all active:scale-95"
            >
              Save & Recalibrate Leads
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
