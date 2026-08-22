import React, { useState } from 'react';
import {
  Globe,
  ShoppingCart,
  Megaphone,
  PhoneCall,
  MousePointerClick,
  LifeBuoy,
  Mail,
  Plus,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { ActivityEvent, ActivityType } from '../../types';
import { useToast } from '../../context/ToastContext';

interface TimelineViewProps {
  timeline: ActivityEvent[];
  customerName: string;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ timeline, customerName }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [newLogTitle, setNewLogTitle] = useState('');
  const [newLogDesc, setNewLogDesc] = useState('');
  const [newLogType, setNewLogType] = useState<ActivityType>('sales_call');

  const { success } = useToast();

  const [events, setEvents] = useState<ActivityEvent[]>(timeline);

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'website_visit':
        return <Globe className="w-4 h-4 text-cyan-500" />;
      case 'purchase':
        return <ShoppingCart className="w-4 h-4 text-emerald-500" />;
      case 'marketing_interaction':
        return <Megaphone className="w-4 h-4 text-purple-500" />;
      case 'sales_call':
        return <PhoneCall className="w-4 h-4 text-indigo-500" />;
      case 'ad_click':
        return <MousePointerClick className="w-4 h-4 text-amber-500" />;
      case 'support_ticket':
        return <LifeBuoy className="w-4 h-4 text-rose-500" />;
      case 'email':
        return <Mail className="w-4 h-4 text-blue-500" />;
      default:
        return <Globe className="w-4 h-4 text-slate-500" />;
    }
  };

  const filteredEvents = events.filter(e => {
    if (filterType === 'all') return true;
    return e.type === filterType;
  });

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTitle) return;

    const newEvent: ActivityEvent = {
      id: `act-${Date.now()}`,
      type: newLogType,
      title: newLogTitle,
      description: newLogDesc || 'Logged by sales representative.',
      timestamp: 'Just now',
      sentiment: 'positive'
    };

    setEvents([newEvent, ...events]);
    success('Activity Logged', `Recorded "${newLogTitle}" on ${customerName}'s timeline.`);
    setIsLogModalOpen(false);
    setNewLogTitle('');
    setNewLogDesc('');
  };

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-card space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">
            Multi-Touch Activity Timeline
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Chronological cross-channel touchpoints across Web, Ads, CRM Calls, and Support.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Filter */}
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Touchpoints</option>
            <option value="website_visit">🌐 Website Visits</option>
            <option value="ad_click">🎯 Ad Engagements</option>
            <option value="sales_call">📞 Sales Calls</option>
            <option value="purchase">💰 Purchases</option>
            <option value="marketing_interaction">📢 Marketing Interactivity</option>
            <option value="support_ticket">🎫 Support Tickets</option>
          </select>

          <button
            onClick={() => setIsLogModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Touchpoint</span>
          </button>
        </div>
      </div>

      {/* Log Activity Modal Form */}
      {isLogModalOpen && (
        <form onSubmit={handleAddLog} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 animate-slide-up text-xs">
          <div className="font-bold text-slate-900 dark:text-white">Record New Interaction</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Interaction Type</label>
              <select
                value={newLogType}
                onChange={e => setNewLogType(e.target.value as ActivityType)}
                className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              >
                <option value="sales_call">Sales Call / Meeting</option>
                <option value="marketing_interaction">Marketing Email / Demo</option>
                <option value="purchase">Ad Budget / Subscription Purchase</option>
                <option value="website_visit">Website Visit Note</option>
                <option value="ad_click">Ad Click Attribution</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Title / Headline *</label>
              <input
                type="text"
                required
                placeholder="e.g. Discussed Q4 Ad Budget Expansion"
                value={newLogTitle}
                onChange={e => setNewLogTitle(e.target.value)}
                className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Details & Outcomes</label>
            <textarea
              rows={2}
              placeholder="Add conversation notes, next steps, or customer feedback..."
              value={newLogDesc}
              onChange={e => setNewLogDesc(e.target.value)}
              className="w-full p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsLogModalOpen(false)}
              className="px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold"
            >
              Save Touchpoint
            </button>
          </div>
        </form>
      )}

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {filteredEvents.map(event => (
          <div key={event.id} className="relative group">
            {/* Timeline Dot Icon */}
            <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white dark:bg-card-dark border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
              {getActivityIcon(event.type)}
            </div>

            {/* Event Card */}
            <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/40 transition-colors space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {event.title}
                  </span>
                  {event.channel && (
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {event.channel}
                    </span>
                  )}
                  {event.metric && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {event.metric}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{event.timestamp}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {event.description}
              </p>

              {event.author && (
                <div className="pt-1 text-[11px] text-slate-400 font-medium">
                  Logged by <strong className="text-slate-700 dark:text-slate-300">{event.author.name}</strong>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
