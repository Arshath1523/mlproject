import React from 'react';

interface ConfusionMatrixProps {
  matrix: number[][];
  modelName: string;
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ matrix, modelName }) => {
  const tn = matrix?.[0]?.[0] ?? 0;
  const fp = matrix?.[0]?.[1] ?? 0;
  const fn = matrix?.[1]?.[0] ?? 0;
  const tp = matrix?.[1]?.[1] ?? 0;
  const total = tn + fp + fn + tp || 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Evaluated on Held-Out Test Set: <strong className="text-white">{total} Employees</strong></span>
        <span>Algorithm: <strong className="text-brand-400">{modelName}</strong></span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center">
        {/* True Negative */}
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-xs uppercase font-medium text-emerald-400">True Negative (TN)</p>
          <p className="text-2xl font-bold text-white mt-1">{tn}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Correctly Retained ({((tn / total) * 100).toFixed(1)}%)</p>
        </div>

        {/* False Positive */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-xs uppercase font-medium text-amber-400">False Positive (FP)</p>
          <p className="text-2xl font-bold text-white mt-1">{fp}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">False Alarm ({((fp / total) * 100).toFixed(1)}%)</p>
        </div>

        {/* False Negative */}
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
          <p className="text-xs uppercase font-medium text-rose-400">False Negative (FN)</p>
          <p className="text-2xl font-bold text-white mt-1">{fn}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Missed Turnover ({((fn / total) * 100).toFixed(1)}%)</p>
        </div>

        {/* True Positive */}
        <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20">
          <p className="text-xs uppercase font-medium text-brand-400">True Positive (TP)</p>
          <p className="text-2xl font-bold text-white mt-1">{tp}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Correctly Identified ({((tp / total) * 100).toFixed(1)}%)</p>
        </div>
      </div>
    </div>
  );
};
