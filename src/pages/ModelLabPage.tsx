import React, { useState, useEffect } from 'react';
import {
  Cpu, Award, RefreshCw, BarChart2, CheckCircle2,
  AlertCircle, ShieldCheck, HelpCircle
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend, CartesianGrid
} from 'recharts';
import { apiService } from '../services/api';
import { ModelMetricItem } from '../types';
import { ConfusionMatrix } from '../components/ConfusionMatrix';
import { RocCurveChart } from '../components/RocCurveChart';

export const ModelLabPage: React.FC = () => {
  const [models, setModels] = useState<ModelMetricItem[]>([]);
  const [bestModel, setBestModel] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelMetricItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getModelMetrics();
      setModels(res.models);
      setBestModel(res.best_model);
      const chosen = res.models.find(m => m.model_name === res.best_model) || res.models[0];
      setSelectedModel(chosen || null);
    } catch (err: any) {
      setError(err.message || 'Failed to load model metrics.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetrain = async () => {
    setTraining(true);
    setError(null);
    try {
      await apiService.trainModels();
      await fetchMetrics();
    } catch (err: any) {
      setError(err.message || 'Training failed.');
    } finally {
      setTraining(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const chartData = models.map((m) => ({
    name: m.model_name.replace(' (Optimized Tree)', ''),
    Accuracy: Math.round(m.accuracy * 100),
    Precision: Math.round(m.precision * 100),
    Recall: Math.round(m.recall * 100),
    F1: Math.round(m.f1_score * 100),
    'ROC-AUC': Math.round(m.roc_auc * 100)
  }));

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Cpu className="w-6 h-6 text-brand-400" />
            <span>Machine Learning Model Lab</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Comparative evaluation of 6 classification algorithms trained on a stratified 80/20 train/test split.
          </p>
        </div>

        <button
          onClick={handleRetrain}
          disabled={training}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white font-semibold text-xs shadow-lg shadow-brand-500/20 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${training ? 'animate-spin' : ''}`} />
          <span>{training ? 'Training All Models...' : 'Retrain All Models'}</span>
        </button>
      </div>

      {loading && (
        <div className="p-12 text-center glass-panel rounded-2xl">
          <RefreshCw className="w-8 h-8 text-brand-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-300 font-medium">Evaluating models on held-out test data...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {models.length > 0 && !loading && (
        <>
          {/* Best Performing Model Banner */}
          <div className="glass-panel p-5 rounded-2xl border-brand-500/30 bg-gradient-to-r from-brand-950/30 via-slate-900/60 to-violet-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-400">Recommended Model</span>
                <h3 className="text-lg font-bold text-white">{bestModel}</h3>
                <p className="text-xs text-slate-400">
                  Selected automatically based on highest F1-Score &amp; balanced class recall on the test partition.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs">
              <div>
                <p className="text-slate-500 text-[10px] uppercase">Accuracy</p>
                <p className="text-lg font-bold text-white">
                  {((models.find(m => m.model_name === bestModel)?.accuracy || 0) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase">Recall</p>
                <p className="text-lg font-bold text-brand-400">
                  {((models.find(m => m.model_name === bestModel)?.recall || 0) * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-[10px] uppercase">F1-Score</p>
                <p className="text-lg font-bold text-violet-400">
                  {((models.find(m => m.model_name === bestModel)?.f1_score || 0) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Model Metrics Table */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Test Set Generalization Metrics</h3>
              <span className="text-[11px] text-slate-400">Click any model row to inspect its Confusion Matrix &amp; ROC curve</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold tracking-wider uppercase text-[10px]">
                    <th className="p-3.5 pl-5">Algorithm</th>
                    <th className="p-3.5">Accuracy</th>
                    <th className="p-3.5">Precision</th>
                    <th className="p-3.5">Recall</th>
                    <th className="p-3.5">F1-Score</th>
                    <th className="p-3.5">ROC-AUC</th>
                    <th className="p-3.5 pr-5">Selection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  {models.map((m) => {
                    const isSelected = selectedModel?.model_name === m.model_name;
                    return (
                      <tr
                        key={m.model_name}
                        onClick={() => setSelectedModel(m)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-brand-500/10 text-white font-medium' : 'hover:bg-slate-900/40'
                        }`}
                      >
                        <td className="p-3.5 pl-5 font-sans font-semibold text-white flex items-center gap-2">
                          <span>{m.model_name}</span>
                          {m.best_model && (
                            <span className="px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 text-[10px] font-sans font-bold">
                              BEST
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">{(m.accuracy * 100).toFixed(1)}%</td>
                        <td className="p-3.5">{(m.precision * 100).toFixed(1)}%</td>
                        <td className="p-3.5 text-brand-400 font-bold">{(m.recall * 100).toFixed(1)}%</td>
                        <td className="p-3.5 text-violet-400 font-bold">{(m.f1_score * 100).toFixed(1)}%</td>
                        <td className="p-3.5">{(m.roc_auc * 100).toFixed(1)}%</td>
                        <td className="p-3.5 pr-5">
                          <button
                            className={`px-3 py-1 rounded-lg text-xs font-sans transition-all ${
                              isSelected
                                ? 'bg-brand-500 text-white font-semibold'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {isSelected ? 'Viewing' : 'Inspect'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Metrics Comparison Chart */}
          <div className="glass-panel p-5 rounded-2xl space-y-4">
            <h3 className="text-sm font-semibold text-white">Comparative Performance Across Algorithms</h3>
            <p className="text-[11px] text-slate-400">Percentages on held-out test data (Stratified 20% sample)</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 20, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} angle={-10} textAnchor="end" />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(val: any) => [`${val}%`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Accuracy" fill="#38aaf7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Precision" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Recall" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="F1" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Selected Model Deep Dive: Confusion Matrix & ROC Curve */}
          {selectedModel && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-panel p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-semibold text-white">Confusion Matrix — {selectedModel.model_name}</h3>
                <ConfusionMatrix
                  matrix={selectedModel.confusion_matrix}
                  modelName={selectedModel.model_name}
                />
              </div>

              <div className="glass-panel p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-semibold text-white">ROC Curve — {selectedModel.model_name}</h3>
                <RocCurveChart
                  rocData={selectedModel.roc_curve}
                  rocAuc={selectedModel.roc_auc}
                  modelName={selectedModel.model_name}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
