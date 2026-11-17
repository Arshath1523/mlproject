import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts';

interface RocCurveChartProps {
  rocData: {
    fpr: number[];
    tpr: number[];
    thresholds: number[];
  };
  rocAuc: number;
  modelName: string;
}

export const RocCurveChart: React.FC<RocCurveChartProps> = ({ rocData, rocAuc, modelName }) => {
  const chartPoints = (rocData?.fpr || []).map((fprVal, idx) => ({
    fpr: Math.round(fprVal * 100) / 100,
    tpr: Math.round((rocData.tpr?.[idx] || 0) * 100) / 100,
    threshold: Math.round((rocData.thresholds?.[idx] || 0) * 100) / 100,
    diagonal: Math.round(fprVal * 100) / 100
  }));

  // Ensure start (0,0) and end (1,1)
  if (chartPoints.length === 0 || chartPoints[0].fpr !== 0) {
    chartPoints.unshift({ fpr: 0, tpr: 0, threshold: 1, diagonal: 0 });
  }
  if (chartPoints[chartPoints.length - 1].fpr !== 1) {
    chartPoints.push({ fpr: 1, tpr: 1, threshold: 0, diagonal: 1 });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">Receiver Operating Characteristic (ROC)</span>
        <span className="px-2.5 py-1 rounded bg-brand-500/15 border border-brand-500/30 text-brand-400 font-semibold font-mono">
          ROC-AUC Score: {(rocAuc * 100).toFixed(1)}%
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartPoints} margin={{ top: 10, right: 20, left: -10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
            <XAxis
              dataKey="fpr"
              type="number"
              domain={[0, 1]}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              name="False Positive Rate"
              label={{ value: 'False Positive Rate (1 - Specificity)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 11 }}
            />
            <YAxis
              dataKey="tpr"
              type="number"
              domain={[0, 1]}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              name="True Positive Rate"
              label={{ value: 'True Positive Rate (Sensitivity)', angle: -90, position: 'insideLeft', offset: 15, fill: '#64748b', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
              labelFormatter={(val) => `FPR: ${val}`}
              formatter={(value: any, name: string) => [
                value,
                name === 'tpr' ? 'Model TPR (Sensitivity)' : 'Random Chance'
              ]}
            />
            <Line
              type="monotone"
              dataKey="diagonal"
              stroke="#64748b"
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="tpr"
              stroke="#38aaf7"
              strokeWidth={2.5}
              dot={{ r: 2, fill: '#38aaf7' }}
              activeDot={{ r: 5, fill: '#38aaf7' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
