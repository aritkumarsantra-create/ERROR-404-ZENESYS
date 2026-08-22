import React from 'react';
import { ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';

export const AdCampaignTable: React.FC = () => {
  const campaigns = [
    {
      name: 'Google Ads - Enterprise Search "CRM & Ad Intelligence"',
      channel: 'Google Ads',
      spend: '$54,200',
      impressions: '184,000',
      clicks: '12,400',
      cpc: '$4.37',
      conversions: 340,
      cpl: '$159',
      revenue: '$420,000',
      roas: '7.7x',
      status: 'Active'
    },
    {
      name: 'LinkedIn - B2B VP Growth & CMO Sponsored InMail',
      channel: 'LinkedIn Ads',
      spend: '$48,000',
      impressions: '92,000',
      clicks: '3,800',
      cpc: '$12.63',
      conversions: 194,
      cpl: '$247',
      revenue: '$310,000',
      roas: '6.4x',
      status: 'Active'
    },
    {
      name: 'Meta - DTC & E-Commerce Retargeting Lookalike',
      channel: 'Meta Ads',
      spend: '$32,000',
      impressions: '420,000',
      clicks: '18,900',
      cpc: '$1.69',
      conversions: 410,
      cpl: '$78',
      revenue: '$185,000',
      roas: '5.8x',
      status: 'Active'
    },
    {
      name: 'YouTube - Customer 360 AI Bidding Showcase Video',
      channel: 'YouTube Ads',
      spend: '$14,500',
      impressions: '84,000',
      clicks: '2,900',
      cpc: '$5.00',
      conversions: 78,
      cpl: '$185',
      revenue: '$62,000',
      roas: '4.3x',
      status: 'Optimizing'
    }
  ];

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-card overflow-hidden">
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
            Ad Campaign Attribution & ROI Breakdown
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Real-time campaign performance across active multi-channel programmatic ad engines.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <th className="p-4">Campaign Name</th>
              <th className="py-4 px-3">Channel</th>
              <th className="py-4 px-3">Ad Spend</th>
              <th className="py-4 px-3">Impressions</th>
              <th className="py-4 px-3">Clicks (CPC)</th>
              <th className="py-4 px-3">Leads (CPL)</th>
              <th className="py-4 px-3">Closed Revenue</th>
              <th className="py-4 px-4 text-right">ROAS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {campaigns.map((camp, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-slate-900 dark:text-white">
                  {camp.name}
                </td>
                <td className="py-4 px-3">
                  <span className="font-semibold text-brand-600 dark:text-brand-400">
                    {camp.channel}
                  </span>
                </td>
                <td className="py-4 px-3 font-semibold text-slate-700 dark:text-slate-200">
                  {camp.spend}
                </td>
                <td className="py-4 px-3 text-slate-500 dark:text-slate-400">
                  {camp.impressions}
                </td>
                <td className="py-4 px-3 text-slate-500 dark:text-slate-400">
                  {camp.clicks} ({camp.cpc})
                </td>
                <td className="py-4 px-3">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {camp.conversions}
                  </span>{' '}
                  <span className="text-slate-400">({camp.cpl})</span>
                </td>
                <td className="py-4 px-3 font-bold text-slate-900 dark:text-white">
                  {camp.revenue}
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="inline-flex items-center text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg font-outfit">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    {camp.roas}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
