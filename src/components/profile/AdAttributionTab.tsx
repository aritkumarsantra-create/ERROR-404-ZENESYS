import React from 'react';
import { Megaphone, TrendingUp, Target, DollarSign, MousePointer, Eye, ArrowUpRight } from 'lucide-react';
import { AdAttribution } from '../../types';

interface AdAttributionTabProps {
  attributions: AdAttribution[];
}

export const AdAttributionTab: React.FC<AdAttributionTabProps> = ({ attributions }) => {
  if (attributions.length === 0) {
    return (
      <div className="p-8 text-center bg-card-light dark:bg-card-dark rounded-2xl border border-slate-200/80 dark:border-slate-800">
        <Megaphone className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
          No Direct Paid Ad Touchpoints
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          This account came via Organic search / direct referral channels.
        </p>
      </div>
    );
  }

  const totalAdSpend = attributions.reduce((acc, curr) => acc + curr.adSpend, 0);
  const totalConversions = attributions.reduce((acc, curr) => acc + curr.conversions, 0);
  const avgRoas = (
    attributions.reduce((acc, curr) => acc + curr.roas, 0) / attributions.length
  ).toFixed(1);

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
      {/* Top Aggregates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Attributed Ad Spend</span>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-outfit mt-1">
            ${totalAdSpend.toLocaleString()}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400">Average Campaign ROAS</span>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-outfit mt-1">
            {avgRoas}x Return
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400">Tracked Conversions</span>
          <div className="text-xl font-bold text-brand-600 dark:text-brand-400 font-outfit mt-1">
            {totalConversions} Events
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Multi-Touch Campaign Breakdown
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase text-slate-400">
                <th className="py-2.5 px-3">Campaign Name & Channel</th>
                <th className="py-2.5 px-3">Spend</th>
                <th className="py-2.5 px-3">Impressions</th>
                <th className="py-2.5 px-3">Clicks (CPC)</th>
                <th className="py-2.5 px-3">Conversions</th>
                <th className="py-2.5 px-3 text-right">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {attributions.map(attr => (
                <tr key={attr.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 dark:text-white">
                      {attr.campaignName}
                    </div>
                    <div className="text-[11px] text-brand-500 font-medium">
                      {attr.platform} • {attr.date}
                    </div>
                  </td>

                  <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                    ${attr.adSpend.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                    {attr.impressions.toLocaleString()}
                  </td>

                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                    {attr.clicks.toLocaleString()} (${attr.cpc.toFixed(2)})
                  </td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                      {attr.conversions}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-outfit">
                      {attr.roas}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
