import {
  EmployeeInputData, PredictionResult, DashboardSummaryData,
  ModelMetricItem, DatasetPreviewData, PredictionHistoryItem
} from '../types';

const API_BASE = '/api';

export const apiService = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Failed to connect to backend service.');
    return res.json();
  },

  async getProjectInfo() {
    const res = await fetch(`${API_BASE}/project-info`);
    if (!res.ok) throw new Error('Failed to fetch project info.');
    return res.json();
  },

  async getDashboardSummary(department?: string, jobRole?: string): Promise<DashboardSummaryData> {
    const params = new URLSearchParams();
    if (department && department !== 'All') params.append('department', department);
    if (jobRole && jobRole !== 'All') params.append('job_role', jobRole);
    
    const res = await fetch(`${API_BASE}/dashboard/summary?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch dashboard metrics.');
    return res.json();
  },

  async predictAttrition(employee: EmployeeInputData, modelName?: string): Promise<PredictionResult> {
    const params = new URLSearchParams();
    if (modelName) params.append('model_name', modelName);

    const res = await fetch(`${API_BASE}/predict?${params.toString()}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employee)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to predict employee attrition.');
    }
    return res.json();
  },

  async getModelMetrics(): Promise<{
    status: string;
    best_model: string;
    models: ModelMetricItem[];
    global_feature_importance: Array<{ feature: string; importance: number; rank: number }>;
  }> {
    const res = await fetch(`${API_BASE}/models/metrics`);
    if (!res.ok) throw new Error('Failed to load model performance metrics.');
    return res.json();
  },

  async trainModels(): Promise<any> {
    const res = await fetch(`${API_BASE}/models/train`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to train machine learning models.');
    return res.json();
  },

  async getDatasetPreview(page: number = 1, pageSize: number = 20): Promise<DatasetPreviewData> {
    const res = await fetch(`${API_BASE}/dataset/preview?page=${page}&page_size=${pageSize}`);
    if (!res.ok) throw new Error('Failed to load dataset records.');
    return res.json();
  },

  async uploadDataset(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/dataset/upload`, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || err.message || 'Failed to upload dataset.');
    }
    return res.json();
  },

  async resetDefaultDataset(): Promise<any> {
    const res = await fetch(`${API_BASE}/dataset/reset-default`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to reset dataset to default benchmark.');
    return res.json();
  },

  async getPredictionHistory(): Promise<PredictionHistoryItem[]> {
    const res = await fetch(`${API_BASE}/predictions/history`);
    if (!res.ok) throw new Error('Failed to load prediction history.');
    return res.json();
  },

  async clearPredictionHistory(): Promise<any> {
    const res = await fetch(`${API_BASE}/predictions/history`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to clear prediction history.');
    return res.json();
  },

  async getInsights(): Promise<any> {
    const res = await fetch(`${API_BASE}/insights`);
    if (!res.ok) throw new Error('Failed to load retention insights.');
    return res.json();
  }
};
