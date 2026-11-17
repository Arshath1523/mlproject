import React from 'react';
import { ContributingFactor, ShapExplanation } from '../types';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface ShapWaterfallProps {
  explanation: ShapExplanation;
  limit?: number;
}

export const ShapWaterfall: React.FC<ShapWaterfallProps> = ({
  explanation,
  limit = 8
}) => {
  const factors = explanation.features.slice(0, limit);
  const maxAbsShap = Math.max(...factors.map(f => Math.abs(f.shap_value)), 0.05);

  return (
    <div className="space-y-4">
      {/* Baseline Context */}
      <div className="flex flex-wrap items-center justify-between text-xs p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 gap-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-brand-400" />
          <span>Expected Base Attrition Rate (Population Prior):</span>
          <span className="font-semibold text-white">{(explanation.base_value * 100).toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Predicted Employee Attrition Probability:</span>
          <span className="font-bold text-brand-400 text-sm">{(explanation.output_probability * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Feature Contributions List */}
      <div className="space-y-2.5">
        {factors.map((factor, idx) => {
          const isRiskIncrease = factor.shap_value > 0;
          const barWidth = Math.min(100, Math.max(6, (Math.abs(factor.shap_value) / maxAbsShap) * 100));

          return (
            <div key={idx} className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  {isRiskIncrease ? (
                    <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span className="font-medium text-slate-200">{factor.feature}</span>
                  <span className="text-slate-500 font-mono">({String(factor.feature_value)})</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className={`font-semibold ${isRiskIncrease ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {factor.shap_value > 0 ? '+' : ''}{(factor.shap_value * 100).toFixed(2)}%
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isRiskIncrease ? 'bg-rose-500/10 text-rose-300' : 'bg-emerald-500/10 text-emerald-300'
                  }`}>
                    {factor.impact}
                  </span>
                </div>
              </div>

              {/* Relative impact bar */}
              <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isRiskIncrease ? 'bg-gradient-to-r from-rose-500 to-amber-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  }`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                {factor.interpretation}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
