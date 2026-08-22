import React, { createContext, useContext, useState } from 'react';
import { Customer } from '../types';
import { MOCK_CUSTOMERS } from '../data/mockData';
import { useToast } from './ToastContext';

export type NavigationTab = 'dashboard' | 'customers' | 'profile' | 'leads' | 'analytics' | 'settings';

interface CustomerContextType {
  customers: Customer[];
  activeCustomer: Customer;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  selectCustomer: (id: string, navigateToProfile?: boolean) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'timeline' | 'deals' | 'adAttributions' | 'aiInsights'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  rescanSentiment: (customerId: string) => Promise<void>;
  isScanningSentiment: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isLoadingDemo: boolean;
  setIsLoadingDemo: (val: boolean) => void;
  selectedDrawerCustomer: Customer | null;
  setSelectedDrawerCustomer: (cust: Customer | null) => void;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [activeCustomerId, setActiveCustomerId] = useState<string>(MOCK_CUSTOMERS[0].id);
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoadingDemo, setIsLoadingDemo] = useState<boolean>(false);
  const [isScanningSentiment, setIsScanningSentiment] = useState<boolean>(false);
  const [selectedDrawerCustomer, setSelectedDrawerCustomer] = useState<Customer | null>(null);

  const { success, info } = useToast();

  const activeCustomer = customers.find(c => c.id === activeCustomerId) || customers[0];

  const selectCustomer = (id: string, navigateToProfile: boolean = false) => {
    setActiveCustomerId(id);
    if (navigateToProfile) {
      setActiveTab('profile');
    }
  };

  const addCustomer = (customerData: Omit<Customer, 'id' | 'timeline' | 'deals' | 'adAttributions' | 'aiInsights'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      timeline: [
        {
          id: `act-${Date.now()}`,
          type: 'marketing_interaction',
          title: 'Account Created in Customer 360',
          description: 'New account provisioned with initial lead score calibration.',
          timestamp: 'Just now'
        }
      ],
      deals: [],
      adAttributions: [],
      aiInsights: [
        {
          id: `ai-${Date.now()}`,
          type: 'next_best_action',
          title: 'Initial Discovery Outreach',
          description: 'Schedule onboarding discovery call with primary stakeholder.',
          impact: 'Medium',
          actionLabel: 'Schedule Outreach'
        }
      ]
    };

    setCustomers(prev => [newCustomer, ...prev]);
    setActiveCustomerId(newCustomer.id);
    success('Customer Created', `${newCustomer.name} (${newCustomer.company}) has been added.`);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev =>
      prev.map(cust => (cust.id === id ? { ...cust, ...updates } : cust))
    );
  };

  // Feature: "Customer Health & Sentiment" Gauge scanner
  // Simulates scanning customer emails, tickets, and Slack messages
  const rescanSentiment = async (customerId: string) => {
    setIsScanningSentiment(true);
    info('AI Sentiment Scanner Running', 'Analyzing 30 recent emails, Zendesk tickets, and chat logs...');

    await new Promise(resolve => setTimeout(resolve, 1400));

    setCustomers(prev =>
      prev.map(cust => {
        if (cust.id !== customerId) return cust;

        // If customer is currently at risk, simulate recovery or updated scan
        const isAtRisk = cust.healthStatus === 'At Risk';
        const newScore = isAtRisk ? 76 : Math.min(98, cust.healthScore + 3);
        const newStatus = newScore >= 80 ? 'Good' : newScore >= 60 ? 'Neutral' : 'At Risk';
        const newSentimentScore = isAtRisk ? 82 : Math.min(96, cust.sentimentScore + 4);

        return {
          ...cust,
          healthScore: newScore,
          healthStatus: newStatus,
          sentimentScore: newSentimentScore,
          sentimentLabel: newScore >= 80 ? 'Extremely Satisfied' : 'Optimistic / Stabilized',
          sentimentSummary: 'AI Scan complete: Detected renewed confidence in Q4 ad performance and resolved data sync tickets.',
          sentimentTriggers: [
            {
              source: 'AI Automated Communication Analysis',
              text: 'Positive language tone detected across 12 recent sales Slack messages.',
              type: 'positive',
              date: 'Just now'
            },
            ...cust.sentimentTriggers
          ]
        };
      })
    );

    setIsScanningSentiment(false);
    success('Sentiment Analysis Complete', 'Customer Health & Sentiment Gauge recalibrated with real-time NLP scan.');
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        activeCustomer,
        activeTab,
        setActiveTab,
        selectCustomer,
        addCustomer,
        updateCustomer,
        rescanSentiment,
        isScanningSentiment,
        searchQuery,
        setSearchQuery,
        isLoadingDemo,
        setIsLoadingDemo,
        selectedDrawerCustomer,
        setSelectedDrawerCustomer
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) throw new Error('useCustomer must be used within a CustomerProvider');
  return context;
};
