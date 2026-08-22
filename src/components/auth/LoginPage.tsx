import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Zap,
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  LockKeyhole,
  Check,
  Building,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { HeroShowcase } from './HeroShowcase';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { RequestAccessModal } from './RequestAccessModal';

export const LoginPage: React.FC = () => {
  const { login, isLoading, loginError, setLoginError, fillDemoCredentials } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState('arit.sales@zenesys.ai');
  const [password, setPassword] = useState('EnterpriseSales2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isSuccessAnimated, setIsSuccessAnimated] = useState(false);

  const handleAutofillDemo = () => {
    const creds = fillDemoCredentials();
    setEmail(creds.email);
    setPassword(creds.pass);
    setLoginError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password, rememberMe);
    if (ok) {
      setIsSuccessAnimated(true);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-surface-light dark:bg-surface-dark transition-colors select-none">
      {/* ================= LEFT SECTION (Branding & Sales Intelligence Hero) ================= */}
      <div className="lg:w-1/2 relative bg-gradient-to-br from-indigo-950 via-slate-900 to-brand-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
        {/* Animated ambient background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-500 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-glow-indigo">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-outfit">
                  Customer 360
                </span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/40">
                  Ad Sales Pro
                </span>
              </div>
              <span className="text-xs text-slate-300 font-medium block">
                Enterprise Sales & Attribution Intelligence
              </span>
            </div>
          </div>

          <div className="pt-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-outfit leading-tight max-w-lg">
              Identify High-Value Customers.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-brand-300">
                Close More Deals.
              </span>
            </h1>
            <p className="mt-3 text-sm text-slate-300 max-w-md leading-relaxed">
              Empowering sales teams with unified customer insights and AI-powered lead intelligence.
            </p>
          </div>
        </div>

        {/* Central Hero Showcase Illustration */}
        <div className="relative z-10 my-8 lg:my-10">
          <HeroShowcase />
        </div>

        {/* Left Footer Trust Badges */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real-time Multi-Touch Attribution Engine</span>
          </div>
          <span className="text-slate-400 font-mono text-[11px]">
            Team ERROR_404 • Zenesys AI Platform
          </span>
        </div>
      </div>

      {/* ================= RIGHT SECTION (Professional Salesman Login Card) ================= */}
      <div className="lg:w-1/2 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-white dark:bg-card-dark transition-colors relative">
        {/* Top Controls: Theme Switcher & Demo Autofill */}
        <div className="flex items-center justify-between pb-6">
          {/* Quick Demo Autofill helper pill */}
          <button
            onClick={handleAutofillDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:hover:bg-brand-900/60 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800/80 transition-all shadow-xs"
            title="Autofill default sales representative credentials"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autofill Demo Credentials</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/80 dark:border-slate-800"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </div>

        {/* Center Login Form Container */}
        <div className="max-w-md w-full mx-auto space-y-8 py-4">
          {/* Salesman Welcome Header */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
              <LockKeyhole className="w-3.5 h-3.5" />
              <span>Sales Portal Access</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-outfit tracking-tight">
              Welcome Back, Sales Professional
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Access customer insights, lead scores, and sales intelligence from one unified dashboard.
            </p>
          </div>

          {/* Error Message Alert */}
          {loginError && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs animate-slide-up">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{loginError}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Work Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="salesrep@company.com"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (loginError) setLoginError(null);
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium ${
                    loginError
                      ? 'border-rose-400 dark:border-rose-600'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your corporate password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    if (loginError) setLoginError(null);
                  }}
                  className={`w-full pl-10 pr-11 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all font-medium ${
                    loginError
                      ? 'border-rose-400 dark:border-rose-600'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500"
                />
                <span>Remember this device for 30 days</span>
              </label>
            </div>

            {/* Primary Action Button: Sign In */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-75 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials & Permissions...</span>
                  </>
                ) : isSuccessAnimated ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Access Granted! Opening Dashboard...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Secondary Action Button: Request Access */}
              <button
                type="button"
                onClick={() => setIsRequestModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs border border-slate-200/80 dark:border-slate-700 transition-all"
              >
                Request Sales Access / Demo Account
              </button>
            </div>
          </form>

          {/* SSO Enterprise Divider */}
          <div className="relative pt-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-slate-400">
              <span className="bg-white dark:bg-card-dark px-3">
                Or Sign In With Enterprise SSO
              </span>
            </div>
          </div>

          {/* Quick SSO Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google Workspace</span>
            </button>

            <button
              type="button"
              onClick={handleAutofillDemo}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              <span>Microsoft 365</span>
            </button>
          </div>
        </div>

        {/* Security Indicators Badges */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-500 dark:text-slate-400 text-xs">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Secure 256-Bit SSL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-indigo-500" />
            <span>SOC 2 Type II Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
            <span>GDPR & CCPA Protected</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        defaultEmail={email}
      />

      <RequestAccessModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </div>
  );
};
