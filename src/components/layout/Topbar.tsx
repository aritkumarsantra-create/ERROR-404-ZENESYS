import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  Plus,
  Layers,
  Sparkles,
  ChevronDown,
  User,
  LogOut,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCustomer } from '../../context/CustomerContext';
import { useAuth } from '../../context/AuthContext';
import { NotificationMenu } from './NotificationMenu';
import { CommandPalette } from './CommandPalette';

interface TopbarProps {
  onOpenMobileMenu: () => void;
  onOpenAddCustomer: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenMobileMenu,
  onOpenAddCustomer
}) => {
  const { theme, toggleTheme } = useTheme();
  const {
    activeTab,
    isLoadingDemo,
    setIsLoadingDemo,
    activeCustomer,
    selectCustomer
  } = useCustomer();

  const { logout } = useAuth();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Executive Overview & Sales KPIs';
      case 'customers':
        return 'Customer Directory & Accounts';
      case 'profile':
        return `Customer 360: ${activeCustomer.name} (${activeCustomer.company})`;
      case 'leads':
        return 'AI Lead Scoring & Intelligence';
      case 'analytics':
        return 'Ad Attribution & Revenue Analytics';
      case 'settings':
        return 'Platform & Scoring Configuration';
      default:
        return 'Ad Sales Intelligence';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 h-16 bg-white/80 dark:bg-card-dark/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
        {/* Left Side: Mobile toggle + Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-outfit truncate">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Center: Search Trigger (Command Palette) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsCommandOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 transition-all text-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Search customers, leads, campaigns...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Side: Actions, Theme, Skeletons Toggle, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search on Mobile */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* "+ New Customer / Lead" Button */}
          <button
            onClick={onOpenAddCustomer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm hover:shadow transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Customer</span>
          </button>

          {/* Toggle Skeleton Preview Demo */}
          <button
            onClick={() => setIsLoadingDemo(!isLoadingDemo)}
            className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              isLoadingDemo
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Toggle Skeleton Loader view demo"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isLoadingDemo ? 'Skeleton ON' : 'Demo Skeletons'}</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500 ring-2 ring-white dark:ring-card-dark" />
            </button>
            <NotificationMenu isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative pl-1 border-l border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="User profile"
                className="w-8 h-8 rounded-xl object-cover ring-2 ring-brand-500/30"
              />
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  Arit Kumar
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Enterprise Lead
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
            </button>

            {/* Profile Menu Popover */}
            {isProfileOpen && (
              <>
                <div onClick={() => setIsProfileOpen(false)} className="fixed inset-0 z-40" />
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 p-2 text-xs space-y-1 animate-slide-up">
                  <div className="p-2.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white">Arit Kumar</div>
                    <div className="text-[11px] text-slate-400">arit@zenesys.ai</div>
                    <span className="inline-block mt-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 border border-brand-500/20">
                      Team ERROR_404
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      selectCustomer('cust-001', true);
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <Flame className="w-4 h-4 text-emerald-500" />
                    <span>View Hot Customer 360</span>
                  </button>

                  <button
                    onClick={() => {
                      selectCustomer('cust-002', true);
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>View At-Risk Customer</span>
                  </button>

                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Global Command Palette Dialog */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
};
