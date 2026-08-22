import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Building2, Mail, Users, CheckCircle2, Shield } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestAccessModal: React.FC<RequestAccessModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    salesTeamSize: '10-50 Reps',
    crm: 'Salesforce'
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    success('Access Request Sent', `Our enterprise sales onboarding team will contact ${formData.email} within 2 hours.`);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Request Sales Professional Access"
      subtitle="Join 10,000+ top revenue leaders scaling pipeline with Customer 360 Ad Sales Intelligence."
      maxWidth="lg"
    >
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rachel Sterling"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Work Email *
              </label>
              <input
                type="email"
                required
                placeholder="rachel@company.com"
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
                placeholder="e.g. ApexCloud Technologies"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sales Team Headcount
              </label>
              <select
                value={formData.salesTeamSize}
                onChange={e => setFormData({ ...formData, salesTeamSize: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              >
                <option value="1-10 Reps">1-10 Sales Reps</option>
                <option value="10-50 Reps">10-50 Sales Reps</option>
                <option value="50-250 Reps">50-250 Sales Reps</option>
                <option value="250+ Reps">250+ Enterprise Reps</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Primary CRM in Use
            </label>
            <select
              value={formData.crm}
              onChange={e => setFormData({ ...formData, crm: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
            >
              <option value="Salesforce">Salesforce CRM</option>
              <option value="HubSpot">HubSpot Sales Hub</option>
              <option value="Zoho">Zoho CRM</option>
              <option value="Microsoft Dynamics">Microsoft Dynamics 365</option>
              <option value="Other">Custom / Other</option>
            </select>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-sm"
            >
              Submit Access Request
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-4 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Request Received</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Thank you, {formData.name}! We have provisioned a priority demo environment for <strong>{formData.company}</strong>.
          </p>
          <div className="pt-2">
            <button
              onClick={handleClose}
              className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
