import React from 'react';
import { LeadScoreGauges } from './LeadScoreGauges';
import { LeadKanbanBoard } from './LeadKanbanBoard';
import { LeadScoringBreakdown } from './LeadScoringBreakdown';
import { SkeletonCard, SkeletonChart } from '../common/SkeletonLoader';
import { useCustomer } from '../../context/CustomerContext';
import { BrainCircuit, Sparkles } from 'lucide-react';

export const LeadIntelligenceView: React.FC = () => {
  const { isLoadingDemo } = useCustomer();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-brand-700 to-indigo-800 text-white shadow-glow-indigo flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-white/20">
              <BrainCircuit className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold font-outfit">
              AI Lead Scoring & Intent Intelligence
            </h2>
          </div>
          <p className="text-xs text-indigo-100 max-w-xl">
            Real-time intent classification combining ad click attribution, web session depth, firmographic fit, and communication sentiment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-bold bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            Model Accuracy: 94.2%
          </span>
        </div>
      </div>

      {/* 3 Visual Lead Tiers: Hot, Warm, Cold Gauges */}
      {isLoadingDemo ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <LeadScoreGauges />
      )}

      {/* Interactive Kanban Pipeline */}
      {isLoadingDemo ? <SkeletonChart /> : <LeadKanbanBoard />}

      {/* AI Scoring Architecture Weights */}
      <LeadScoringBreakdown />
    </div>
  );
};
