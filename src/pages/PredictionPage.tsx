import React, { useState } from 'react';
import {
  UserCheck, RotateCcw, Sparkles, AlertTriangle, ArrowRight,
  TrendingUp, TrendingDown, Info, ShieldAlert, CheckCircle2,
  Building, Briefcase, Award, Clock, DollarSign, Calendar
} from 'lucide-react';
import { EmployeeInputData, PredictionResult } from '../types';
import { apiService } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';
import { ShapWaterfall } from '../components/ShapWaterfall';
import {
  DEPARTMENTS, JOB_ROLES, EDUCATION_FIELDS, BUSINESS_TRAVEL,
  MARITAL_STATUS, HIGH_RISK_SAMPLE, MEDIUM_RISK_SAMPLE, LOW_RISK_SAMPLE
} from '../utils/constants';

export const PredictionPage: React.FC = () => {
  const [formData, setFormData] = useState<EmployeeInputData>({ ...MEDIUM_RISK_SAMPLE });
  const [modelChoice, setModelChoice] = useState<string>('Random Forest');
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'role' | 'satisfaction' | 'compensation' | 'tenure'>('role');

  const handleChange = (field: keyof EmployeeInputData, val: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: val
    }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.predictAttrition(formData, modelChoice);
      setPrediction(res);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating prediction.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = (preset: EmployeeInputData) => {
    setFormData({ ...preset });
    setPrediction(null);
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <UserCheck className="w-6 h-6 text-brand-400" />
            <span>Employee Attrition Risk Assessment</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate individual employee turnover likelihood using trained machine learning models and SHAP explainability.
          </p>
        </div>

        {/* Preset Sample Quick Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mr-1">Demo Presets:</span>
          <button
            type="button"
            onClick={() => handlePreset(HIGH_RISK_SAMPLE)}
            className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-medium transition-colors"
          >
            High Risk Sample
          </button>
          <button
            type="button"
            onClick={() => handlePreset(MEDIUM_RISK_SAMPLE)}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-medium transition-colors"
          >
            Medium Risk Sample
          </button>
          <button
            type="button"
            onClick={() => handlePreset(LOW_RISK_SAMPLE)}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium transition-colors"
          >
            Low Risk Sample
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Form (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <form onSubmit={handlePredict} className="glass-panel p-6 rounded-3xl space-y-5">
            {/* Model & Tabs Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('role')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === 'role' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Role & Org
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('satisfaction')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === 'satisfaction' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Satisfaction
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('compensation')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === 'compensation' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Compensation
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('tenure')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTab === 'tenure' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tenure
                </button>
              </div>

              {/* Algorithm Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Algorithm:</span>
                <select
                  value={modelChoice}
                  onChange={(e) => setModelChoice(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-brand-400 font-semibold focus:outline-none"
                >
                  <option value="Random Forest">Random Forest</option>
                  <option value="Gradient Boosting">Gradient Boosting</option>
                  <option value="Support Vector Machine">SVM</option>
                  <option value="Logistic Regression">Logistic Regression</option>
                  <option value="Decision Tree">Decision Tree</option>
                  <option value="XGBoost (Optimized Tree)">XGBoost</option>
                </select>
              </div>
            </div>

            {/* TAB 1: Role & Organization */}
            {activeTab === 'role' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Department</label>
                    <select
                      value={formData.Department}
                      onChange={(e) => handleChange('Department', e.target.value)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    >
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Job Role</label>
                    <select
                      value={formData.JobRole}
                      onChange={(e) => handleChange('JobRole', e.target.value)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    >
                      {JOB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Age: {formData.Age}</label>
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={formData.Age}
                      onChange={(e) => handleChange('Age', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Job Level (1 - 5)</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={formData.JobLevel}
                      onChange={(e) => handleChange('JobLevel', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                    <div className="text-[10px] text-slate-500 text-right">Level {formData.JobLevel}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Distance Home: {formData.DistanceFromHome} km</label>
                    <input
                      type="range"
                      min="1"
                      max="35"
                      value={formData.DistanceFromHome}
                      onChange={(e) => handleChange('DistanceFromHome', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Business Travel</label>
                    <select
                      value={formData.BusinessTravel}
                      onChange={(e) => handleChange('BusinessTravel', e.target.value)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    >
                      {BUSINESS_TRAVEL.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Marital Status</label>
                    <select
                      value={formData.MaritalStatus}
                      onChange={(e) => handleChange('MaritalStatus', e.target.value)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    >
                      {MARITAL_STATUS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Education Field</label>
                    <select
                      value={formData.EducationField}
                      onChange={(e) => handleChange('EducationField', e.target.value)}
                      className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
                    >
                      {EDUCATION_FIELDS.map(ef => <option key={ef} value={ef}>{ef}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Satisfaction & Engagement */}
            {activeTab === 'satisfaction' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-300">Job Satisfaction</span>
                      <span className="font-bold text-brand-400">{formData.JobSatisfaction} / 4</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={formData.JobSatisfaction}
                      onChange={(e) => handleChange('JobSatisfaction', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>1: Low</span>
                      <span>2: Medium</span>
                      <span>3: High</span>
                      <span>4: Very High</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-300">Work-Life Balance</span>
                      <span className="font-bold text-brand-400">{formData.WorkLifeBalance} / 4</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={formData.WorkLifeBalance}
                      onChange={(e) => handleChange('WorkLifeBalance', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>1: Poor</span>
                      <span>2: Fair</span>
                      <span>3: Good</span>
                      <span>4: Excellent</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-300">Environment Satisfaction</span>
                      <span className="font-bold text-brand-400">{formData.EnvironmentSatisfaction} / 4</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={formData.EnvironmentSatisfaction}
                      onChange={(e) => handleChange('EnvironmentSatisfaction', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-300">Job Involvement</span>
                      <span className="font-bold text-brand-400">{formData.JobInvolvement} / 4</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      value={formData.JobInvolvement}
                      onChange={(e) => handleChange('JobInvolvement', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Compensation & Workload */}
            {activeTab === 'compensation' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Monthly Income: ${formData.MonthlyIncome.toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="1000"
                      max="20000"
                      step="250"
                      value={formData.MonthlyIncome}
                      onChange={(e) => handleChange('MonthlyIncome', parseFloat(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Regular OverTime</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleChange('OverTime', 'Yes')}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          formData.OverTime === 'Yes'
                            ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Yes (Overtime)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange('OverTime', 'No')}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          formData.OverTime === 'No'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        No (Standard)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Salary Hike: {formData.PercentSalaryHike}%
                    </label>
                    <input
                      type="range"
                      min="11"
                      max="25"
                      value={formData.PercentSalaryHike}
                      onChange={(e) => handleChange('PercentSalaryHike', parseFloat(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Stock Option Level (0 - 3)</label>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      value={formData.StockOptionLevel}
                      onChange={(e) => handleChange('StockOptionLevel', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                    <div className="text-[10px] text-slate-500 text-right">Level {formData.StockOptionLevel}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Tenure & History */}
            {activeTab === 'tenure' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Years at Company: {formData.YearsAtCompany} yrs
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="35"
                      value={formData.YearsAtCompany}
                      onChange={(e) => handleChange('YearsAtCompany', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Years With Current Manager: {formData.YearsWithCurrManager} yrs
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={formData.YearsWithCurrManager}
                      onChange={(e) => handleChange('YearsWithCurrManager', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Years Since Last Promotion: {formData.YearsSinceLastPromotion} yrs
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={formData.YearsSinceLastPromotion}
                      onChange={(e) => handleChange('YearsSinceLastPromotion', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Total Working Years: {formData.TotalWorkingYears} yrs
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={formData.TotalWorkingYears}
                      onChange={(e) => handleChange('TotalWorkingYears', parseInt(e.target.value))}
                      className="w-full accent-brand-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Form Action Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handlePreset(MEDIUM_RISK_SAMPLE)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-violet-500 hover:from-brand-600 hover:to-violet-600 text-white font-semibold text-xs shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Calculating Probability...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Model Assessment</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right: Prediction & SHAP Results (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {prediction ? (
            <div className="glass-panel p-6 rounded-3xl space-y-6">
              {/* Outcome Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">Assessment Outcome</p>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    Attrition Risk: <span className={prediction.predicted_attrition === 'Yes' ? 'text-rose-400' : 'text-emerald-400'}>{prediction.predicted_attrition}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Evaluated with {prediction.model_used}</p>
                </div>
                <RiskBadge category={prediction.risk_category} size="lg" />
              </div>

              {/* Probability Meter */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Attrition Probability:</span>
                  <span className="font-bold text-white font-mono">{(prediction.attrition_probability * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      prediction.risk_category === 'High'
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                        : prediction.risk_category === 'Medium'
                        ? 'bg-gradient-to-r from-brand-500 to-amber-500'
                        : 'bg-gradient-to-r from-teal-400 to-emerald-500'
                    }`}
                    style={{ width: `${prediction.attrition_probability * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0% (Secure)</span>
                  <span>Low &lt;30%</span>
                  <span>High &ge;65%</span>
                  <span>100% (Certain)</span>
                </div>
              </div>

              {/* Confidence & Threshold Transparency Info */}
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2.5">
                <Info className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>{prediction.confidence_info}</span>
              </div>

              {/* SHAP Feature Contribution Waterfall */}
              {prediction.shap_explanation && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Key Contributing Drivers (SHAP)</span>
                    <span className="text-[10px] font-normal text-slate-400">Marginal Attribution</span>
                  </div>
                  <ShapWaterfall explanation={prediction.shap_explanation} limit={5} />
                </div>
              )}

              {/* Retention Interventions */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <p className="text-xs font-semibold text-white">Suggested Retention Interventions</p>
                <div className="space-y-2 text-xs text-slate-300">
                  {prediction.retention_suggestions.map((sug, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-relaxed">{sug}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ethical Disclaimer */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300/90 leading-relaxed flex items-start gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{prediction.disclaimer}</span>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mx-auto">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">Awaiting Employee Profile</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Configure the employee attributes on the left or click one of the demo presets to generate a live machine learning prediction with SHAP explainability.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
