import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CustomerProvider, useCustomer } from './context/CustomerContext';
import { AIProvider } from './context/AIContext';
import { Layout } from './components/layout/Layout';
import { DashboardView } from './components/dashboard/DashboardView';
import { CustomerDirectoryView } from './components/customers/CustomerDirectoryView';
import { CustomerProfileView } from './components/profile/CustomerProfileView';
import { LeadIntelligenceView } from './components/leads/LeadIntelligenceView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';
import { LoginPage } from './components/auth/LoginPage';
import { AICopilotDrawer } from './components/ai/AICopilotDrawer';
import { AIFloatingTrigger } from './components/ai/AIFloatingTrigger';
import { AISentimentInspectorModal } from './components/ai/AISentimentInspectorModal';
import { AIEmailGeneratorModal } from './components/ai/AIEmailGeneratorModal';
import { AIDealStrategizerModal } from './components/ai/AIDealStrategizerModal';
import { AIAdBudgetOptimizerModal } from './components/ai/AIAdBudgetOptimizerModal';
import { StartupSplashScreen } from './components/common/StartupSplashScreen';

const MainContent: React.FC = () => {
  const { activeTab } = useCustomer();

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'customers':
        return <CustomerDirectoryView />;
      case 'profile':
        return <CustomerProfileView />;
      case 'leads':
        return <LeadIntelligenceView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div key={activeTab} className="page-enter-active">
      {renderView()}
    </div>
  );
};

const AuthenticatedApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    // Show splash screen on first launch of the session
    return !sessionStorage.getItem('customer360_splash_shown');
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('customer360_splash_shown', 'true');
    setShowSplash(false);
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <CustomerProvider>
      <AIProvider>
        {/* Startup Cinematic Logo Opening Splash Screen */}
        {showSplash && <StartupSplashScreen onComplete={handleSplashComplete} />}

        <Layout onReplayIntro={() => setShowSplash(true)}>
          <MainContent />
        </Layout>

        {/* Global AI Intelligence Components & Modals */}
        <AICopilotDrawer />
        <AIFloatingTrigger />
        <AISentimentInspectorModal />
        <AIEmailGeneratorModal />
        <AIDealStrategizerModal />
        <AIAdBudgetOptimizerModal />
      </AIProvider>
    </CustomerProvider>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AuthenticatedApp />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
