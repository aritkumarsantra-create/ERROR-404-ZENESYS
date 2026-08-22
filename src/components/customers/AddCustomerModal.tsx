import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useCustomer } from '../../context/CustomerContext';
import { CustomerStatus, HealthStatus, LeadTier } from '../../types';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ isOpen, onClose }) => {
  const { addCustomer } = useCustomer();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Cloud Infrastructure / SaaS',
    role: 'VP of Marketing',
    location: 'San Francisco, CA, USA',
    tier: 'Enterprise' as 'Enterprise' | 'Mid-Market' | 'Growth' | 'Startup',
    status: 'Active' as CustomerStatus,
    leadScore: 85,
    leadTier: 'Hot' as LeadTier,
    engagementScore: 80,
    healthScore: 85,
    healthStatus: 'Good' as HealthStatus,
    sentimentScore: 90,
    sentimentLabel: 'Positive',
    sentimentSummary: 'Newly created customer record with initial high engagement signals.',
    sentimentTriggers: [
      {
        source: 'Initial Account Calibration',
        text: 'Initial profile setup completed successfully with primary contact verified.',
        type: 'positive' as const,
        date: 'Just now'
      }
    ],
    totalPurchases: 25000,
    annualRevenue: 50000,
    adSpendLTV: 15000,
    roas: 4.2,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    assignedRep: {
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      email: 'm.vance@zenesys.ai'
    },
    lastActivity: 'Just now',
    lastActivityDate: '2026-08-22 14:00',
    tags: ['New Account', 'Ad Campaign Candidate']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) {
      alert('Please fill out Name, Email, and Company fields.');
      return;
    }

    const tier: LeadTier = formData.leadScore >= 80 ? 'Hot' : formData.leadScore >= 50 ? 'Warm' : 'Cold';
    const healthStatus: HealthStatus = formData.healthScore >= 80 ? 'Good' : formData.healthScore >= 60 ? 'Neutral' : 'At Risk';

    addCustomer({
      ...formData,
      leadTier: tier,
      healthStatus
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Customer Profile"
      subtitle="Create a 360 customer profile with initial lead scoring & sentiment calibration."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jessica Sterling"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. jessica@company.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Stellar Dynamics"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Role / Title
            </label>
            <input
              type="text"
              placeholder="e.g. VP of Growth"
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Industry
            </label>
            <select
              value={formData.industry}
              onChange={e => setFormData({ ...formData, industry: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            >
              <option value="Cloud Infrastructure / SaaS">Cloud Infrastructure / SaaS</option>
              <option value="Healthcare / BioTech">Healthcare / BioTech</option>
              <option value="Fintech / Banking">Fintech / Banking</option>
              <option value="E-Commerce & Retail">E-Commerce & Retail</option>
              <option value="Clean Energy & Automotive">Clean Energy & Automotive</option>
              <option value="Supply Chain / Freight">Supply Chain / Freight</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Account Tier
            </label>
            <select
              value={formData.tier}
              onChange={e => setFormData({ ...formData, tier: e.target.value as any })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            >
              <option value="Enterprise">Enterprise ($100k+ ARR)</option>
              <option value="Mid-Market">Mid-Market</option>
              <option value="Growth">Growth</option>
              <option value="Startup">Startup</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Initial Lead Score (0 - 100): {formData.leadScore}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.leadScore}
              onChange={e => setFormData({ ...formData, leadScore: Number(e.target.value) })}
              className="w-full accent-brand-600"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Initial Health Meter Score (0 - 100): {formData.healthScore}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.healthScore}
              onChange={e => setFormData({ ...formData, healthScore: Number(e.target.value) })}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-md transition-all active:scale-95"
          >
            Create Customer Profile
          </button>
        </div>
      </form>
    </Modal>
  );
};
