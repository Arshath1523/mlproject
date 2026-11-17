import React, { useState, useEffect } from 'react';
import {
  Users, UserMinus, AlertTriangle, Percent, Filter,
  RefreshCw, TrendingUp, Briefcase, Award, Clock
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, CartesianGrid
} from 'recharts';
import { KpiCard } from '../components/KpiCard';
import { DashboardSummaryData } from '../types';
import { apiService } from '../services/api';
import { DEPARTMENTS, JOB_ROLES } from '../utils/constants';

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardSummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deptFilter, setDeptFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getDashboardSummary(deptFilter, roleFilter);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to load executive dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, [deptFilter, roleFilter]);

  const COLORS = ['#38aaf7', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Executive HR Analytics Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time workforce turnover distributions and key retention indicators calculated from the active benchmark cohort.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Filter className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-slate-400">Department:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <Briefcase className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-slate-400">Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer max-w-[140px] truncate"
            >
              <option value="All" className="bg-slate-900 text-white">All Job Roles</option>
              {JOB_ROLES.map((r) => (
                <option key={r} value={r} className="bg-slate-900 text-white">{r}</option>
              ))}
            </select>
          </div>

          <button
            onClick={fetchMetrics}
            disabled={loading}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div className="p-12 text-center glass-panel rounded-2xl">
          <RefreshCw className="w-8 h-8 text-brand-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-300 font-medium">Computing actual dataset statistics...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards Row */}
      {data && !loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Employees Analyzed"
              value={data.total_employees.toLocaleString()}
              subtitle="Active cohort sample"
              icon={Users}
              color="blue"
            />
            <KpiCard
              title="Predicted Turnovers"
              value={data.predicted_to_leave.toLocaleString()}
              subtitle="Estimated attrition count"
              icon={UserMinus}
              color="rose"
            />
            <KpiCard
              title="Cohort Attrition Rate"
              value={`${(data.overall_attrition_rate * 100).toFixed(1)}%`}
              subtitle="Historical turnover baseline"
              icon={Percent}
              color="amber"
              trend={data.overall_attrition_rate > 0.18 ? 'Elevated Turnover' : 'Typical Industry Benchmark'}
            />
            <KpiCard
              title="Overtime Vulnerability"
              value={data.high_risk_count.toLocaleString()}
              subtitle="Employees working overtime"
              icon={Clock}
              color="violet"
            />
          </div>

          {/* Chart Grid Row 1: Department & Job Role */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Breakdown */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Turnover Rate by Department</h3>
                  <p className="text-[11px] text-slate-400">Proportion of employees leaving within each division</p>
                </div>
                <Briefcase className="w-4 h-4 text-brand-400" />
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.department_distribution} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="department" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} domain={[0, 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                      formatter={(val: any) => [`${(Number(val) * 100).toFixed(1)}%`, 'Attrition Rate']}
                    />
                    <Bar dataKey="attrition_rate" fill="#38aaf7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* OverTime Comparison */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Attrition by OverTime Status</h3>
                  <p className="text-[11px] text-slate-400">Comparing employees with regular overtime vs standard hours</p>
                </div>
                <Clock className="w-4 h-4 text-violet-400" />
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.overtime_distribution} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="overtime" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `OverTime: ${v}`} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} domain={[0, 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                      formatter={(val: any) => [`${(Number(val) * 100).toFixed(1)}%`, 'Attrition Rate']}
                    />
                    <Bar dataKey="attrition_rate" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Chart Grid Row 2: Job Role & Satisfaction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Job Role Ranking */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Attrition Rate by Job Role</h3>
                  <p className="text-[11px] text-slate-400">Sorted from highest turnover to lowest turnover roles</p>
                </div>
                <Award className="w-4 h-4 text-amber-400" />
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.job_role_distribution.slice(0, 7)} layout="vertical" margin={{ top: 5, right: 20, left: 70, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <YAxis type="category" dataKey="role" tick={{ fill: '#94a3b8', fontSize: 10 }} width={80} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                      formatter={(val: any) => [`${(Number(val) * 100).toFixed(1)}%`, 'Attrition Rate']}
                    />
                    <Bar dataKey="attrition_rate" fill="#f59e0b" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Job Satisfaction */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Attrition by Job Satisfaction</h3>
                  <p className="text-[11px] text-slate-400">1: Low, 2: Medium, 3: High, 4: Very High</p>
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.satisfaction_distribution} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                      formatter={(val: any) => [`${(Number(val) * 100).toFixed(1)}%`, 'Attrition Rate']}
                    />
                    <Bar dataKey="attrition_rate" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Chart Grid Row 3: Income & Tenure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Income Bands */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <h3 className="text-sm font-semibold text-white">Monthly Income vs. Attrition Rate</h3>
              <p className="text-[11px] text-slate-400">Attrition across compensation tiers</p>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.monthly_income_distribution} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="band" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                      formatter={(val: any) => [`${(Number(val) * 100).toFixed(1)}%`, 'Attrition Rate']}
                    />
                    <Bar dataKey="attrition_rate" fill="#38aaf7" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tenure at Company */}
            <div className="glass-panel p-5 rounded-2xl space-y-4">
              <h3 className="text-sm font-semibold text-white">Tenure at Company vs. Attrition Rate</h3>
              <p className="text-[11px] text-slate-400">High flight risk observed during initial 0-2 year window</p>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.tenure_distribution} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                    <XAxis dataKey="band" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                      formatter={(val: any) => [`${(Number(val) * 100).toFixed(1)}%`, 'Attrition Rate']}
                    />
                    <Bar dataKey="attrition_rate" fill="#ec4899" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
