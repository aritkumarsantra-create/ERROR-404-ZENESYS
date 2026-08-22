import React from 'react';
import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Flame
} from 'lucide-react';
import { useCustomer, NavigationTab } from '../../context/CustomerContext';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const { activeTab, setActiveTab, customers } = useCustomer();

  const hotLeadsCount = customers.filter(c => c.leadTier === 'Hot').length;

  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'customers' as NavigationTab,
      label: 'Customers',
      icon: Users,
      badge: customers.length
    },
    {
      id: 'leads' as NavigationTab,
      label: 'Lead Intelligence',
      icon: BrainCircuit,
      badge: `${hotLeadsCount} Hot`,
      badgeColor: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
    },
    {
      id: 'analytics' as NavigationTab,
      label: 'Analytics',
      icon: BarChart3,
      badge: 'ROAS 4.6x'
    },
    {
      id: 'settings' as NavigationTab,
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    setActiveTab(tabId);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-sidebar-light dark:bg-sidebar-dark border-r border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 select-none">
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between p-4 h-16 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-glow-indigo shrink-0">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white font-outfit tracking-tight">
                    Customer 360
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    Pro
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium truncate">
                  Ad Sales Intelligence
                </span>
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-1.5">
          {!isCollapsed && (
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Main Menu
            </div>
          )}

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/25'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white hover:translate-x-1'
                } ${isCollapsed ? 'justify-center px-2 hover:translate-x-0' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                {/* Active left indicator bar */}
                {isActive && !isCollapsed && (
                  <span className="absolute left-1 top-2 bottom-2 w-1 rounded-full bg-white shadow-xs animate-pulse" />
                )}

                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                    isActive ? 'text-white scale-110' : 'text-slate-400 group-hover:text-brand-500 group-hover:scale-110'
                  }`}
                />

                {!isCollapsed && (
                  <>
                    <span className="truncate flex-1 text-left font-medium">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeColor || 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-300 dark:group-hover:bg-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Banner / System Status */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80">
        {!isCollapsed ? (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Team ERROR_404
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Live Sync
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              AI Sentiment Engine & Ad Attribution active.
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed top-0 left-0 bottom-0 z-30 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
          />
          <div className="relative w-64 max-w-[80vw] h-full z-10 animate-slide-up">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
