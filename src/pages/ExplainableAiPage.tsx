import React, { useState, useEffect } from 'react';
import {
  Sparkles, Info, HelpCircle, TrendingUp, TrendingDown,
  BarChart3, ShieldAlert, Cpu
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { apiService } from '../services/api';
import { ShapWaterfall } from '../components/ShapWaterfall';
import { HIGH_RISK_SAMPLE, LOW_RISK_SAMPLE, MEDIUM_RISK_SAMPLE } from '../utils/constants';
import { PredictionResult } from '../types';

export const ExplainableAiPage: React.FC = () => {
  const [globalImportance, setGlobalImportance] = useState<Array<{ feature: string; importance: number; rank: number }>>([]);
  const [sampleType, setSampleType] = useState<'medium' | 'high' | 'low'>('high');
  const [sampleExplanation, setSampleExplanation] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchGlobalData = async () => {
    setLoading(true);
    try {
      const res = await apiService.getModelMetrics();
      setGlobalImportance(res.global_feature_importance || []);
      
      // Fetch sample explanation
      const sample = sampleType === 'high' ? HIGH_RISK_SAMPLE : sampleType === 'low' ? LOW_RISK_SAMPLE : MEDIUM_RISK_SAMPLE;
      const pred = await apiService.predictAttrition(sample);
      setSampleExplanation(pred);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalData();
  }, [sampleType]);

  const top15Features = globalImportance.slice(0, 15).map(f => ({
    name: f.feature,
    importance: Math.round(f.importance * 1000) / 10
  }));

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-brand-400" />
          <span>Explainable AI — SHAP Interpretability</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          SHapley Additive exPlanations (SHAP) allocate mathematically sound credit to each employee attribute, exposing why the model predicted turnover.
        </p>
      </div>

      {/* Explainer Concept Box */}
      <div className="glass-panel p-5 rounded-2xl border-brand-500/20 bg-gradient-to-r from-brand-950/20 via-slate-900/60 to-violet-950/20 space-y-3">
        <div className="flex items-center gap-2 text-brand-400 font-semibold text-xs">
          <Info className="w-4 h-4" />
          <span>The Foundation of SHAP in Workforce Analytics</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Originating from cooperative game theory (Lloyd Shapley, Nobel Laureate), SHAP treats each feature as a player in a coalition. 
          The prediction is the total payout. SHAP calculates the marginal contribution of every single feature across all possible sub-coalitions, 
          guaranteeing local accuracy, consistency, and missingness properties that simple feature importance cannot provide.
        </p>
      </div>

      {/* Global Feature Importance Section */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white">Global Feature Importance (Macro Cohort Level)</h2>
            <p className="text-xs text-slate-400">Mean absolute attribution magnitude across the entire benchmark workforce</p>
          </div>
          <div className="text-xs text-brand-400 font-semibold px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            Top 15 Influential Predictors
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top15Features} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} width={110} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                formatter={(val: any) => [`${val}%`, 'Relative Importance']}
              />
              <Bar dataKey="importance" fill="#38aaf7" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Local Individual Employee Explanation Simulator */}
      <div className="glass-panel p-6 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white">Local Feature Attribution (Micro Employee Level)</h2>
            <p className="text-xs text-slate-400">Inspect how specific features pull a selected employee's risk up or down from baseline</p>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setSampleType('high')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                sampleType === 'high' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              High Risk Case
            </button>
            <button
              onClick={() => setSampleType('medium')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                sampleType === 'medium' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Medium Risk Case
            </button>
            <button
              onClick={() => setSampleType('low')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                sampleType === 'low' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Low Risk Case
            </button>
          </div>
        </div>

        {sampleExplanation?.shap_explanation && (
          <div className="space-y-4">
            <ShapWaterfall explanation={sampleExplanation.shap_explanation} limit={8} />
          </div>
        )}
      </div>

      {/* Methodological & Ethical Clarification */}
      <div className="glass-panel p-5 rounded-2xl border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
          <ShieldAlert className="w-4 h-4" />
          <span>Critical Scientific Distinction: Association vs. Causation</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          SHAP values quantify how the predictive model relies on specific variables to arrive at its mathematical output relative 
          to a baseline reference expectation. <strong>A high positive SHAP value does not prove physical causation</strong>. 
          For example, while working overtime may elevate predicted flight risk in the model, the root cause might be organizational 
          understaffing or personal life changes. HR practitioners must conduct empathetic human dialogues rather than treating 
          model features as deterministic causes.
        </p>
      </div>
    </div>
  );
};
