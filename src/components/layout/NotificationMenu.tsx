import React, { useState } from 'react';
import { Bell, Flame, ShieldAlert, CheckCircle2, TrendingUp, Check, X } from 'lucide-react';
import { NOTIFICATION_ALERTS } from '../../data/mockData';
import { useCustomer } from '../../context/CustomerContext';

interface NotificationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationMenu: React.FC<NotificationMenuProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(NOTIFICATION_ALERTS);
  const { selectCustomer, setActiveTab } = useCustomer();

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'hot_lead':
        return <Flame className="w-4 h-4 text-emerald-500" />;
      case 'health_warning':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      case 'ad_success':
        return <TrendingUp className="w-4 h-4 text-indigo-500" />;
      case 'deal_won':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-brand-500" />;
    }
  };

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-40" />

      <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
              Notifications & Alerts
            </h4>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-brand-500 text-white rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-400"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Alerts List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {notifications.map(item => (
            <div
              key={item.id}
              onClick={() => {
                if (item.type === 'health_warning') {
                  selectCustomer('cust-002', true);
                } else if (item.type === 'hot_lead') {
                  selectCustomer('cust-001', true);
                } else {
                  setActiveTab('analytics');
                }
                onClose();
              }}
              className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
                !item.read ? 'bg-indigo-50/30 dark:bg-indigo-950/20' : ''
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.message}
                </p>
              </div>
              {!item.read && (
                <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-2.5 text-center bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              setActiveTab('leads');
              onClose();
            }}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
          >
            View all intelligence triggers &rarr;
          </button>
        </div>
      </div>
    </>
  );
};
