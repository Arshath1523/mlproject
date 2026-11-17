import React from 'react';
import {
  BrainCircuit, ArrowRight, ShieldCheck, CheckCircle2,
  Users, BarChart3, Sparkles, Cpu, Layers, GitBranch,
  Building, GraduationCap, ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  setCurrentTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setCurrentTab }) => {
  const algorithms = [
    { name: 'Random Forest', desc: 'Ensemble bagging across 50+ trees with feature subsampling for robust non-linear patterns.' },
    { name: 'Gradient Boosting', desc: 'Stagewise boosting optimizing log-odds residuals to identify subtle interaction signals.' },
    { name: 'Support Vector Machine', desc: 'Maximum-margin hyperplane with Platt probability calibration for clean boundary separation.' },
    { name: 'Logistic Regression', desc: 'Class-weighted regularized linear baseline providing direct log-odds interpretability.' },
    { name: 'Decision Tree', desc: 'CART decision tree splitting on Gini impurity to expose human-readable decision rules.' },
    { name: 'XGBoost', desc: 'Regularized gradient boosting trees tuned for high-dimensional HR feature spaces.' }
  ];

  const workflowSteps = [
    { step: '01', title: 'Data Ingestion', desc: 'Benchmark IBM HR dataset (1,470 records, 35 attributes) or custom CSV.' },
    { step: '02', title: 'Preprocessing', desc: 'Constant column removal, numerical z-scaling & one-hot encoding without leakage.' },
    { step: '03', title: 'Stratified Split', desc: '80% training / 20% testing split preserving the ~16.1% attrition baseline.' },
    { step: '04', title: 'Multi-Model Training', desc: 'Simultaneous training and cross-comparison across 6 classification algorithms.' },
    { step: '05', title: 'Evaluation', desc: 'Rigorous calculation of Accuracy, Precision, Recall, F1-Score, and ROC-AUC.' },
    { step: '06', title: 'SHAP Explainability', desc: 'Exact Shapley additive attributions calculating individual feature impact.' }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 text-center max-w-4xl mx-auto space-y-6">
        {/* Academic Course Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-medium">
          <GraduationCap className="w-4 h-4" />
          <span>21CSC307P – Machine Learning for Data Analytics | SRM IST</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
          Predict Employee Attrition. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-400 via-brand-300 to-violet-400 bg-clip-text text-transparent">
            Understand the Why.
          </span> <br className="hidden sm:inline" />
          Improve Retention.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          An enterprise-grade HR analytics platform powered by multi-algorithm machine learning and SHAP-based Explainable AI. 
          Identify workforce turnover risks early, understand root drivers, and guide ethical retention decisions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setCurrentTab('predict')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-violet-600 hover:from-brand-600 hover:to-violet-700 text-white font-semibold shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all transform hover:-translate-y-0.5 text-sm"
          >
            <span>Assess Employee Risk</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold transition-all text-sm"
          >
            <BarChart3 className="w-4 h-4 text-brand-400" />
            <span>Explore Dashboard</span>
          </button>
          <button
            onClick={() => setCurrentTab('models')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-850 text-slate-300 border border-slate-800/80 font-semibold transition-all text-sm"
          >
            <Cpu className="w-4 h-4 text-violet-400" />
            <span>ML Model Lab</span>
          </button>
        </div>

        {/* Hero KPI Preview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto">
          <div className="glass-panel p-4 rounded-2xl text-left">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Analyzed Cohort</p>
            <p className="text-2xl font-bold text-white mt-1">1,470</p>
            <p className="text-[11px] text-slate-400">Employees in Benchmark</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-left">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Base Attrition</p>
            <p className="text-2xl font-bold text-brand-400 mt-1">16.1%</p>
            <p className="text-[11px] text-slate-400">Historical Turnover</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-left">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">ML Algorithms</p>
            <p className="text-2xl font-bold text-violet-400 mt-1">6 Models</p>
            <p className="text-[11px] text-slate-400">Trained & Evaluated</p>
          </div>
          <div className="glass-panel p-4 rounded-2xl text-left">
            <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Explainability</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">SHAP</p>
            <p className="text-[11px] text-slate-400">Local & Global Values</p>
          </div>
        </div>
      </section>

      {/* Problem & Objectives Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div className="glass-panel p-7 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Building className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">The Workforce Turnover Problem</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Replacing a seasoned corporate professional costs between 50% and 200% of their annual salary in recruitment, 
            onboarding downtime, and lost institutional knowledge. Traditional HR processes rely on reactive exit interviews 
            after the employee has already departed, forfeiting the opportunity for proactive intervention.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
              <span>Unidentified burnout caused by sustained overtime and heavy travel</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
              <span>Compensation compression and prolonged intervals since last promotion</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-rose-400" />
              <span>Manager relationship friction during initial tenure years</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-7 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Project Objectives & AI Solution</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Our platform provides end-to-end data science capabilities to shift HR management from reactive damage control 
            to transparent, evidence-based retention strategy.
          </p>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-400" />
              <span>Accurately estimate attrition risk probability with multi-algorithm machine learning</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-400" />
              <span>Explain individual predictions using exact Shapley additive feature attributions (SHAP)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-400" />
              <span>Generate customized, ethical retention considerations without automating employment decisions</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Machine Learning Workflow */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Machine Learning Lifecycle</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            From raw workforce records to calibrated probability estimates and explainable AI insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflowSteps.map((wf) => (
            <div key={wf.step} className="glass-panel p-5 rounded-2xl space-y-2 relative group hover:border-brand-500/40 transition-colors">
              <div className="text-brand-400 font-mono font-bold text-xs">{wf.step}</div>
              <h3 className="text-base font-semibold text-white">{wf.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{wf.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Algorithms Grid */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Supported ML Algorithms</h2>
            <p className="text-sm text-slate-400 mt-1">
              Evaluated on the same stratified test set to determine generalization performance.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('models')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-400 hover:text-brand-300"
          >
            <span>Compare Metrics in ML Lab</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {algorithms.map((algo) => (
            <div key={algo.name} className="glass-panel p-5 rounded-2xl space-y-2 border-slate-800">
              <div className="flex items-center gap-2 text-brand-400 font-medium text-sm">
                <Cpu className="w-4 h-4" />
                <span>{algo.name}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{algo.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Team Information Banner */}
      <section className="max-w-4xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border-brand-500/20 text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Academic Project Credits</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          SRM Institute of Science and Technology, Tiruchirappalli
        </h3>
        <p className="text-xs text-slate-400">
          Course: <strong>21CSC307P – Machine Learning for Data Analytics</strong> | Department of CSE – Data Science
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
            <p className="text-xs text-slate-400 font-medium">Student 1</p>
            <p className="text-sm font-bold text-white mt-0.5">Arshath Ahamed S</p>
            <p className="text-xs font-mono text-brand-400 mt-0.5">RA2411056050026</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
            <p className="text-xs text-slate-400 font-medium">Student 2</p>
            <p className="text-sm font-bold text-white mt-0.5">Dhan Veershaan RA</p>
            <p className="text-xs font-mono text-brand-400 mt-0.5">RA2411056050052</p>
          </div>
        </div>
      </section>
    </div>
  );
};
