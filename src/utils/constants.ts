import { EmployeeInputData } from '../types';

export const DEPARTMENTS = [
  "Research & Development",
  "Sales",
  "Human Resources"
];

export const JOB_ROLES = [
  "Sales Executive",
  "Research Scientist",
  "Laboratory Technician",
  "Manufacturing Director",
  "Healthcare Representative",
  "Manager",
  "Sales Representative",
  "Research Director",
  "Human Resources"
];

export const EDUCATION_FIELDS = [
  "Life Sciences",
  "Medical",
  "Marketing",
  "Technical Degree",
  "Human Resources",
  "Other"
];

export const BUSINESS_TRAVEL = [
  "Non-Travel",
  "Travel_Rarely",
  "Travel_Frequently"
];

export const MARITAL_STATUS = [
  "Single",
  "Married",
  "Divorced"
];

// Presets for Demonstration
export const HIGH_RISK_SAMPLE: EmployeeInputData = {
  Age: 26,
  BusinessTravel: "Travel_Frequently",
  DailyRate: 450,
  Department: "Sales",
  DistanceFromHome: 26,
  Education: 2,
  EducationField: "Marketing",
  EnvironmentSatisfaction: 1,
  Gender: "Male",
  HourlyRate: 45,
  JobInvolvement: 1,
  JobLevel: 1,
  JobRole: "Sales Representative",
  JobSatisfaction: 1,
  MaritalStatus: "Single",
  MonthlyIncome: 2400,
  MonthlyRate: 11000,
  NumCompaniesWorked: 4,
  OverTime: "Yes",
  PercentSalaryHike: 11,
  PerformanceRating: 3,
  RelationshipSatisfaction: 1,
  StockOptionLevel: 0,
  TotalWorkingYears: 3,
  TrainingTimesLastYear: 1,
  WorkLifeBalance: 1,
  YearsAtCompany: 1,
  YearsInCurrentRole: 0,
  YearsSinceLastPromotion: 1,
  YearsWithCurrManager: 0
};

export const LOW_RISK_SAMPLE: EmployeeInputData = {
  Age: 46,
  BusinessTravel: "Non-Travel",
  DailyRate: 1120,
  Department: "Research & Development",
  DistanceFromHome: 3,
  Education: 4,
  EducationField: "Life Sciences",
  EnvironmentSatisfaction: 4,
  Gender: "Female",
  HourlyRate: 85,
  JobInvolvement: 4,
  JobLevel: 4,
  JobRole: "Manager",
  JobSatisfaction: 4,
  MaritalStatus: "Married",
  MonthlyIncome: 16500,
  MonthlyRate: 21000,
  NumCompaniesWorked: 1,
  OverTime: "No",
  PercentSalaryHike: 21,
  PerformanceRating: 4,
  RelationshipSatisfaction: 4,
  StockOptionLevel: 2,
  TotalWorkingYears: 24,
  TrainingTimesLastYear: 4,
  WorkLifeBalance: 4,
  YearsAtCompany: 15,
  YearsInCurrentRole: 10,
  YearsSinceLastPromotion: 2,
  YearsWithCurrManager: 8
};

export const MEDIUM_RISK_SAMPLE: EmployeeInputData = {
  Age: 34,
  BusinessTravel: "Travel_Rarely",
  DailyRate: 820,
  Department: "Research & Development",
  DistanceFromHome: 12,
  Education: 3,
  EducationField: "Medical",
  EnvironmentSatisfaction: 2,
  Gender: "Male",
  HourlyRate: 65,
  JobInvolvement: 3,
  JobLevel: 2,
  JobRole: "Research Scientist",
  JobSatisfaction: 2,
  MaritalStatus: "Married",
  MonthlyIncome: 5800,
  MonthlyRate: 14500,
  NumCompaniesWorked: 2,
  OverTime: "Yes",
  PercentSalaryHike: 14,
  PerformanceRating: 3,
  RelationshipSatisfaction: 3,
  StockOptionLevel: 1,
  TotalWorkingYears: 9,
  TrainingTimesLastYear: 3,
  WorkLifeBalance: 2,
  YearsAtCompany: 4,
  YearsInCurrentRole: 2,
  YearsSinceLastPromotion: 2,
  YearsWithCurrManager: 3
};
