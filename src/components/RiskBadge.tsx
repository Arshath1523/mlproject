import React from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

interface RiskBadgeProps {
  category: 'Low' | 'Medium' | 'High';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  category,
  size = 'md',
  showIcon = true
}) => {
  const configs = {
    Low: {
      bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
      dot: 'bg-emerald-400',
      icon: CheckCircle2,
      label: 'Low Risk'
    },
    Medium: {
      bg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
      dot: 'bg-amber-400',
      icon: AlertCircle,
      label: 'Medium Risk'
    },
    High: {
      bg: 'bg-rose-500/15 border-rose-500/30 text-rose-400',
      dot: 'bg-rose-400',
      icon: AlertTriangle,
      label: 'High Risk'
    }
  };

  const current = configs[category] || configs.Low;
  const IconComponent = current.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1.5',
    md: 'px-3 py-1 text-sm gap-2',
    lg: 'px-4 py-1.5 text-base gap-2.5 font-semibold'
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${current.bg} ${sizeClasses[size]}`}>
      <span className={`w-2 h-2 rounded-full ${current.dot} animate-pulse`} />
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{current.label}</span>
    </span>
  );
};
