import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CustomerProvider, useCustomer } from './context/CustomerContext';
import { Layout } from './components/layout/Layout';
import { DashboardView } from './components/dashboard/DashboardView';
import { CustomerDirectoryView } from './components/customers/CustomerDirectoryView';
import { CustomerProfileView } from './components/profile/CustomerProfileView';
import { LeadIntelligenceView } from './components/leads/LeadIntelligenceView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';
import { LoginPage } from './components/auth/LoginPage';

const MainContent: React.FC = () => {
  const { activeTab } = useCustomer();

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

const AuthenticatedApp: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <CustomerProvider>
      <Layout>
        <MainContent />
      </Layout>
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
