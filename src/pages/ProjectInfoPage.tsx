import React from 'react';
import {
  FileText, GraduationCap, Building, BookOpen, Layers,
  ShieldCheck, Cpu, Sparkles, CheckCircle2, User
} from 'lucide-react';

export const ProjectInfoPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <FileText className="w-6 h-6 text-brand-400" />
          <span>Project Specifications & Academic Documentation</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete academic review documentation for course 21CSC307P – Machine Learning for Data Analytics.
        </p>
      </div>

      {/* Institutional Metadata Card */}
      <div className="glass-panel p-6 rounded-3xl border-brand-500/30 bg-gradient-to-r from-brand-950/20 via-slate-900/60 to-violet-950/20 space-y-4">
        <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Institution & Course Credentials</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">SRM Institute of Science and Technology</h2>
          <p className="text-xs text-slate-300">Tiruchirappalli Campus, Tamil Nadu, India</p>
          <p className="text-xs text-brand-400 mt-1 font-medium">Department of Computer Science and Engineering – Data Science</p>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Course Code: 21CSC307P – Machine Learning for Data Analytics</p>
        </div>

        {/* Students Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Arshath Ahamed S</p>
                <p className="text-xs font-mono text-brand-400">Register No: RA2411056050026</p>
                <p className="text-[10px] text-slate-500">Student 1 (Full-Stack & ML)</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Dhan Veershaan RA</p>
                <p className="text-xs font-mono text-violet-400">Register No: RA2411056050052</p>
                <p className="text-[10px] text-slate-500">Student 2 (Data Science & XAI)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abstract */}
      <div className="glass-panel p-6 rounded-3xl space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-400" />
          <span>Abstract</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          Employee attrition is a persistent organizational challenge with profound financial and cultural implications. 
          This project introduces an intelligent HR analytics system that predicts employee turnover probability using 
          machine learning classification algorithms while providing transparent, local and global explanations through 
          SHAP (SHapley Additive exPlanations). Utilizing the benchmark IBM HR Analytics dataset (1,470 employee records, 35 attributes), 
          the platform implements a robust data preprocessing pipeline, stratified cross-validation, and class-imbalance mitigation. 
          Evaluation across Logistic Regression, Decision Trees, Random Forests, Support Vector Machines, Gradient Boosting, 
          and XGBoost reveals high predictive reliability, with tree-based ensembles achieving superior F1-scores and ROC-AUC. 
          By bridging empirical predictive modeling with human-centered Explainable AI, the platform empowers HR executives to 
          transition from reactive post-exit reviews to proactive, ethical retention management.
        </p>
      </div>

      {/* Methodology Lifecycle */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-400" />
          <span>Proposed Research Methodology</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-bold text-brand-400">Phase 1: Ingestion & Data Hygiene</span>
            <p className="text-slate-400 leading-relaxed">
              Ingest employee records. Detect and drop uninformative constant columns (EmployeeCount, Over18, StandardHours) 
              and identifiers (EmployeeNumber). Validate missingness and verify the binary Attrition target.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-bold text-brand-400">Phase 2: Leakage-Free Preprocessing</span>
            <p className="text-slate-400 leading-relaxed">
              Split dataset into stratified 80% training and 20% test partitions. Fit StandardScaler and One-Hot Encoders 
              strictly on the training partition to prevent information leakage into the test set.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-bold text-brand-400">Phase 3: Multi-Algorithm Training</span>
            <p className="text-slate-400 leading-relaxed">
              Train 6 distinct classification paradigms simultaneously. Apply class-weight balancing to counteract the natural 
              class imbalance (~16% turnover vs. ~84% retained).
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <span className="font-bold text-brand-400">Phase 4: SHAP Attribution & Decision Support</span>
            <p className="text-slate-400 leading-relaxed">
              Calculate exact Shapley additive feature values. Translate statistical signals into human-digestible 
              organizational recommendations without automating punitive HR actions.
            </p>
          </div>
        </div>
      </div>

      {/* Dataset & Attributes */}
      <div className="glass-panel p-6 rounded-3xl space-y-3">
        <h2 className="text-base font-bold text-white">Dataset Attributes (IBM HR Analytics)</h2>
        <p className="text-xs text-slate-400">
          The benchmark corpus encompasses 35 attributes capturing compensation, tenure, demographic, and sentiment metrics:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-300 font-mono">
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">Age (18-60)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">Attrition (Target)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">BusinessTravel</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">DailyRate</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">Department</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">DistanceFromHome</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">Education (1-5)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">EducationField</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">EnvironmentSat (1-4)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">JobInvolvement (1-4)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">JobLevel (1-5)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">JobRole (9 roles)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">JobSatisfaction (1-4)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">MonthlyIncome</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">OverTime (Yes/No)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">PercentSalaryHike</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">TotalWorkingYears</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">WorkLifeBalance (1-4)</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">YearsAtCompany</div>
          <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">YearsWithCurrManager</div>
        </div>
      </div>

      {/* Ethical Considerations & Limitations */}
      <div className="glass-panel p-6 rounded-3xl border-slate-800 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Ethical Considerations & Algorithmic Limitations</span>
        </h2>
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong>1. Human-in-the-Loop Imperative:</strong> Predictions represent mathematical risk associations, not human verdicts. 
            Automated termination or disciplinary action driven by algorithmic score is strictly prohibited by ethical guidelines.
          </p>
          <p>
            <strong>2. Demographics & Proxy Bias:</strong> Care must be exercised regarding sensitive attributes (e.g., gender, marital status, age). 
            Subgroup parity evaluations must be performed periodically to prevent adverse disparate impact.
          </p>
          <p>
            <strong>3. Feedback Loops:</strong> If low retention probability prompts management to neglect an employee's professional development, 
            the algorithm creates a self-fulfilling prophecy. Interventions must always be positively incentivizing.
          </p>
        </div>
      </div>
    </div>
  );
};
