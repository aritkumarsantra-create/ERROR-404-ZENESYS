import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { CustomerProvider, useCustomer } from './context/CustomerContext';
import { Layout } from './components/layout/Layout';
import { DashboardView } from './components/dashboard/DashboardView';
import { CustomerDirectoryView } from './components/customers/CustomerDirectoryView';
import { CustomerProfileView } from './components/profile/CustomerProfileView';
import { LeadIntelligenceView } from './components/leads/LeadIntelligenceView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';

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

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CustomerProvider>
          <Layout>
            <MainContent />
          </Layout>
        </CustomerProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
