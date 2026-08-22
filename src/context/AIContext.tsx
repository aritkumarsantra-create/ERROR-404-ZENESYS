import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  aiService,
  AISettings,
  CopilotMessage,
  SentimentAnalysisResult,
  EmailPitchParams,
  DealStrategyResult,
  AdOptimizationResult
} from '../services/aiService';
import { Customer, Deal } from '../types';
import { useCustomer } from './CustomerContext';
import { useToast } from './ToastContext';

interface AIContextType {
  settings: AISettings;
  updateSettings: (newSettings: Partial<AISettings>) => void;
  // Copilot Drawer
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  copilotMessages: CopilotMessage[];
  isCopilotLoading: boolean;
  sendCopilotMessage: (query: string) => Promise<void>;
  clearCopilotHistory: () => void;
  // Sentiment Inspector Modal
  isSentimentInspectorOpen: boolean;
  sentimentCustomer: Customer | null;
  openSentimentInspector: (customer?: Customer) => void;
  closeSentimentInspector: () => void;
  // Email & Pitch Generator Modal
  isEmailGenOpen: boolean;
  emailCustomer: Customer | null;
  emailInitialObjective?: EmailPitchParams['objective'];
  openEmailGenerator: (customer?: Customer, objective?: EmailPitchParams['objective']) => void;
  closeEmailGenerator: () => void;
  // Deal Strategizer Modal
  isDealStrategizerOpen: boolean;
  targetDeal: Deal | null;
  dealCustomer: Customer | null;
  openDealStrategizer: (deal: Deal, customer?: Customer) => void;
  closeDealStrategizer: () => void;
  // Ad Budget Optimizer Modal
  isAdOptimizerOpen: boolean;
  openAdOptimizer: () => void;
  closeAdOptimizer: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { customers, activeCustomer, selectCustomer, setActiveTab, updateCustomer } = useCustomer();
  const { success, info } = useToast();

  const [settings, setSettings] = useState<AISettings>(() => aiService.getSettings());

  // Copilot State
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isCopilotLoading, setIsCopilotLoading] = useState<boolean>(false);
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: `### 👋 Welcome to ZenAI Sales Copilot!\n\nI am your intelligent Customer 360 assistant. I analyze multi-touch ad attribution, detect customer churn risks, and draft high-converting sales outreach.\n\n**Quick actions you can try:**\n- *"Who are our top hot leads to close today?"*\n- *"Analyze churn risk for Sarah Jenkins"*\n- *"Draft Q4 ARR expansion email"*\n- *"Optimize cross-channel ad spend"*`,
      timestamp: 'Just now',
      suggestedActions: [
        { label: '🔥 Top Hot Leads', actionType: 'navigate', payload: 'leads' },
        { label: '✉️ Draft Outreach Pitch', actionType: 'open_email_gen' },
        { label: '⚠️ Churn Risk Audit', actionType: 'open_inspector' }
      ]
    }
  ]);

  // Sentiment Inspector Modal State
  const [isSentimentInspectorOpen, setIsSentimentInspectorOpen] = useState<boolean>(false);
  const [sentimentCustomer, setSentimentCustomer] = useState<Customer | null>(null);

  // Email Generator Modal State
  const [isEmailGenOpen, setIsEmailGenOpen] = useState<boolean>(false);
  const [emailCustomer, setEmailCustomer] = useState<Customer | null>(null);
  const [emailInitialObjective, setEmailInitialObjective] = useState<EmailPitchParams['objective'] | undefined>(undefined);

  // Deal Strategizer Modal State
  const [isDealStrategizerOpen, setIsDealStrategizerOpen] = useState<boolean>(false);
  const [targetDeal, setTargetDeal] = useState<Deal | null>(null);
  const [dealCustomer, setDealCustomer] = useState<Customer | null>(null);

  // Ad Optimizer Modal State
  const [isAdOptimizerOpen, setIsAdOptimizerOpen] = useState<boolean>(false);

  // Global Keyboard Shortcut: Ctrl+J / Cmd+J for AI Copilot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setIsCopilotOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateSettings = (newSettings: Partial<AISettings>) => {
    const updated = aiService.saveSettings(newSettings);
    setSettings(updated);
    success('AI Model Configured', `Provider set to ${updated.provider.toUpperCase()} (${updated.model})`);
  };

  const sendCopilotMessage = async (query: string) => {
    if (!query.trim()) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setCopilotMessages(prev => [...prev, userMsg]);
    setIsCopilotLoading(true);

    try {
      const response = await aiService.sendCopilotQuery(query, copilotMessages, {
        activeCustomer,
        allCustomers: customers,
        activeTab: 'profile'
      });
      setCopilotMessages(prev => [...prev, response]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCopilotLoading(false);
    }
  };

  const clearCopilotHistory = () => {
    setCopilotMessages([
      {
        id: 'reset-msg',
        sender: 'assistant',
        content: `Conversation reset. Ready for your next sales query or account audit.`,
        timestamp: 'Just now'
      }
    ]);
  };

  const openSentimentInspector = (customer?: Customer) => {
    setSentimentCustomer(customer || activeCustomer);
    setIsSentimentInspectorOpen(true);
  };

  const closeSentimentInspector = () => {
    setIsSentimentInspectorOpen(false);
    setSentimentCustomer(null);
  };

  const openEmailGenerator = (customer?: Customer, objective?: EmailPitchParams['objective']) => {
    setEmailCustomer(customer || activeCustomer);
    setEmailInitialObjective(objective);
    setIsEmailGenOpen(true);
  };

  const closeEmailGenerator = () => {
    setIsEmailGenOpen(false);
    setEmailCustomer(null);
    setEmailInitialObjective(undefined);
  };

  const openDealStrategizer = (deal: Deal, customer?: Customer) => {
    setTargetDeal(deal);
    setDealCustomer(customer || activeCustomer);
    setIsDealStrategizerOpen(true);
  };

  const closeDealStrategizer = () => {
    setIsDealStrategizerOpen(false);
    setTargetDeal(null);
    setDealCustomer(null);
  };

  const openAdOptimizer = () => {
    setIsAdOptimizerOpen(true);
  };

  const closeAdOptimizer = () => {
    setIsAdOptimizerOpen(false);
  };

  return (
    <AIContext.Provider
      value={{
        settings,
        updateSettings,
        isCopilotOpen,
        setIsCopilotOpen,
        copilotMessages,
        isCopilotLoading,
        sendCopilotMessage,
        clearCopilotHistory,
        isSentimentInspectorOpen,
        sentimentCustomer,
        openSentimentInspector,
        closeSentimentInspector,
        isEmailGenOpen,
        emailCustomer,
        emailInitialObjective,
        openEmailGenerator,
        closeEmailGenerator,
        isDealStrategizerOpen,
        targetDeal,
        dealCustomer,
        openDealStrategizer,
        closeDealStrategizer,
        isAdOptimizerOpen,
        openAdOptimizer,
        closeAdOptimizer
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) throw new Error('useAI must be used within an AIProvider');
  return context;
};
