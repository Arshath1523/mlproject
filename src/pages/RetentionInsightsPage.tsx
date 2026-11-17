import React, { useState, useEffect } from 'react';
import {
  Lightbulb, CheckCircle2, AlertTriangle, ShieldCheck,
  TrendingUp, Users, HeartHandshake, Briefcase, Clock,
  DollarSign
} from 'lucide-react';
import { apiService } from '../services/api';

export const RetentionInsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getInsights().then(res => {
      setInsights(res);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const retentionPillars = [
    {
      title: 'Workload & Overtime Governance',
      icon: Clock,
      color: 'rose',
      stat: 'Overtime employees have 2x higher flight risk',
      items: [
        'Audit sprint cycles to identify departments experiencing chronic mandatory overtime.',
        'Implement "Time-Off-In-Lieu" (TOIL) policies after critical release milestones.',
        'Establish automated threshold warnings when an employee logs >15 hours of overtime in consecutive weeks.'
      ]
    },
    {
      title: 'Career Progression & Velocity',
      icon: TrendingUp,
      color: 'amber',
      stat: 'Stagnation > 3 years increases departure risk by 35%',
      items: [
        'Mandate biannual career growth reviews independent of annual salary cycles.',
        'Create horizontal / lateral skill exploration tracks for technical contributors.',
        'Provide transparent skill-banding criteria so employees visualize their next promotional tier.'
      ]
    },
    {
      title: 'Manager-Employee Mentorship Checkpoints',
      icon: HeartHandshake,
      color: 'brand',
      stat: 'Initial 12-month manager relationship is a key inflection point',
      items: [
        'Institute structured 30-60-90 day feedback touchpoints for new manager assignments.',
        'Offer upward feedback mechanisms to identify coaching and alignment gaps early.',
        'Equip team managers with empathetic communication and burnout detection toolkits.'
      ]
    },
    {
      title: 'Competitive Compensation & Equity',
      icon: DollarSign,
      color: 'emerald',
      stat: 'Low stock option levels correlate with higher early tenure departure',
      items: [
        'Benchmark compensation packages annually against regional tech and data science industry standards.',
        'Broaden stock option vesting schedules to increase long-term employee investment in company success.',
        'Provide milestone performance bonuses to bridge compensation gaps for entry-level roles.'
      ]
    }
  ];

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <Lightbulb className="w-6 h-6 text-brand-400" />
          <span>AI-Assisted Retention Strategies & HR Insights</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Translating model feature associations into actionable, human-centered retention interventions.
        </p>
      </div>

      {/* Primary Data-Driven Findings from Benchmark */}
      {insights?.key_findings && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">Empirical Findings from Cohort Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.key_findings.map((finding: any, idx: number) => (
              <div key={idx} className="glass-panel p-5 rounded-2xl space-y-3 border-slate-800 hover:border-brand-500/40 transition-colors">
                <span className="text-xs font-bold text-brand-400">Finding 0{idx + 1}</span>
                <h3 className="text-sm font-bold text-white">{finding.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{finding.finding}</p>
                <div className="pt-2 border-t border-slate-800">
                  <p className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">Recommended Action</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{finding.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strategic Retention Pillars */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white">Organizational Retention Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {retentionPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{pillar.title}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{pillar.stat}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {pillar.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ethical Code of Conduct Box */}
      <div className="glass-panel p-6 rounded-3xl border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900/60 to-slate-900/40 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>Ethical HR AI Governance Statement</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The machine learning predictions produced by this platform are intended exclusively as <strong>decision-support information</strong> for 
          supportive retention initiatives, wellness improvements, and workload rebalancing. 
          <strong>Under no circumstances should model outputs be used to penalize, deny promotions, withhold bonuses, or terminate employees.</strong>
          All organizational retention interventions must be reviewed and executed by qualified human HR leadership.
        </p>
      </div>
    </div>
  );
};
