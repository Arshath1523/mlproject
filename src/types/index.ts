export interface EmployeeInputData {
  Age: number;
  BusinessTravel: string;
  DailyRate: number;
  Department: string;
  DistanceFromHome: number;
  Education: number;
  EducationField: string;
  EnvironmentSatisfaction: number;
  Gender: string;
  HourlyRate: number;
  JobInvolvement: number;
  JobLevel: number;
  JobRole: string;
  JobSatisfaction: number;
  MaritalStatus: string;
  MonthlyIncome: number;
  MonthlyRate: number;
  NumCompaniesWorked: number;
  OverTime: string;
  PercentSalaryHike: number;
  PerformanceRating: number;
  RelationshipSatisfaction: number;
  StockOptionLevel: number;
  TotalWorkingYears: number;
  TrainingTimesLastYear: number;
  WorkLifeBalance: number;
  YearsAtCompany: number;
  YearsInCurrentRole: number;
  YearsSinceLastPromotion: number;
  YearsWithCurrManager: number;
}

export interface ContributingFactor {
  feature: string;
  feature_value: number | string;
  shap_value: number;
  impact: string;
  interpretation: string;
}

export interface ShapExplanation {
  base_value: number;
  output_probability: number;
  features: ContributingFactor[];
}

export interface PredictionResult {
  predicted_attrition: "Yes" | "No";
  attrition_probability: number;
  retention_probability: number;
  risk_category: "Low" | "Medium" | "High";
  confidence_info: string;
  model_used: string;
  contributing_factors: ContributingFactor[];
  shap_explanation?: ShapExplanation;
  retention_suggestions: string[];
  disclaimer: string;
}

export interface ModelMetricItem {
  model_name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  confusion_matrix: number[][];
  roc_curve: {
    fpr: number[];
    tpr: number[];
    thresholds: number[];
  };
  best_model: boolean;
}

export interface DashboardSummaryData {
  total_employees: number;
  predicted_to_leave: number;
  high_risk_count: number;
  overall_attrition_rate: number;
  avg_predicted_probability: number;
  department_distribution: Array<{
    department: string;
    total: number;
    attrition_count: number;
    attrition_rate: number;
  }>;
  job_role_distribution: Array<{
    role: string;
    total: number;
    attrition_count: number;
    attrition_rate: number;
  }>;
  overtime_distribution: Array<{
    overtime: string;
    total: number;
    attrition_count: number;
    attrition_rate: number;
  }>;
  satisfaction_distribution: Array<{
    rating: number;
    label: string;
    total: number;
    attrition_count: number;
    attrition_rate: number;
  }>;
  monthly_income_distribution: Array<{
    band: string;
    total: number;
    attrition_count: number;
    attrition_rate: number;
  }>;
  work_life_balance_distribution: Array<{
    rating: number;
    total: number;
    attrition_count: number;
    attrition_rate: number;
  }>;
  tenure_distribution: Array<{
    band: string;
    total: number;
    attrition_count: number;
    attrition_rate: number;
  }>;
}

export interface DatasetPreviewData {
  total_rows: number;
  total_columns: number;
  columns: string[];
  data_types: Record<string, string>;
  missing_values: Record<string, number>;
  target_distribution: Record<string, number>;
  preview_rows: Record<string, any>[];
}

export interface PredictionHistoryItem {
  id: number;
  timestamp: string;
  employee_role: string;
  department: string;
  age: number;
  monthly_income: number;
  over_time: string;
  predicted_attrition: string;
  attrition_probability: number;
  risk_category: string;
  model_used: string;
  top_factors: any[];
  input_data: any;
}
