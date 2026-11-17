import React, { useState, useEffect } from 'react';
import {
  Database, UploadCloud, RefreshCw, CheckCircle2,
  AlertTriangle, FileSpreadsheet, RotateCcw, Info
} from 'lucide-react';
import { apiService } from '../services/api';
import { DatasetPreviewData } from '../types';

export const DatasetManagerPage: React.FC = () => {
  const [data, setData] = useState<DatasetPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDatasetInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getDatasetPreview(1, 10);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to load dataset details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasetInfo();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadSuccess(null);

    try {
      const res = await apiService.uploadDataset(file);
      setUploadSuccess(`Successfully ingested "${file.name}" (${res.rows} rows). Models retrained!`);
      await fetchDatasetInfo();
    } catch (err: any) {
      setError(err.message || 'Dataset upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleResetDefault = async () => {
    setLoading(true);
    setError(null);
    setUploadSuccess(null);
    try {
      await apiService.resetDefaultDataset();
      setUploadSuccess('Reset active training dataset to default benchmark IBM HR dataset (1,470 records).');
      await fetchDatasetInfo();
    } catch (err: any) {
      setError(err.message || 'Failed to reset dataset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Database className="w-6 h-6 text-brand-400" />
            <span>Dataset Management & Ingestion</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload custom employee HR datasets or inspect the active IBM benchmark data schema and class balance.
          </p>
        </div>

        <button
          onClick={handleResetDefault}
          disabled={loading || uploading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white transition-colors disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5 text-brand-400" />
          <span>Reset to Benchmark IBM Dataset</span>
        </button>
      </div>

      {uploadSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{uploadSuccess}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Zone & Dataset Schema Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Upload Box (5 cols) */}
        <div className="md:col-span-5 glass-panel p-6 rounded-3xl space-y-4">
          <h2 className="text-base font-bold text-white">Upload Employee Dataset</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upload a CSV file containing workforce records. The file must include an <code className="text-brand-400 font-mono">Attrition</code> target column with <code className="text-brand-400 font-mono">Yes</code> or <code className="text-brand-400 font-mono">No</code> values.
          </p>

          <label className="border-2 border-dashed border-slate-700 hover:border-brand-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-slate-900/40 hover:bg-slate-900/80 transition-all text-center group">
            <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-brand-400 transition-colors mb-3" />
            <span className="text-xs font-semibold text-white group-hover:text-brand-300">
              {uploading ? 'Processing & Training...' : 'Select or Drop CSV Dataset'}
            </span>
            <span className="text-[11px] text-slate-500 mt-1">Accepts .CSV format up to 50MB</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-brand-400" />
              <span>Validation Guarantee</span>
            </p>
            <p>
              Uploaded datasets automatically undergo schema verification, missing-value imputation, 
              constant column removal, and automated model re-training without data leakage.
            </p>
          </div>
        </div>

        {/* Active Dataset Overview (7 cols) */}
        <div className="md:col-span-7 glass-panel p-6 rounded-3xl space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Active Dataset Overview</h2>
            <span className="px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-mono font-semibold">
              Live In-Memory
            </span>
          </div>

          {data && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <p className="text-[10px] uppercase font-semibold text-slate-500">Total Records</p>
                <p className="text-xl font-bold text-white mt-0.5">{data.total_rows.toLocaleString()}</p>
                <p className="text-[11px] text-slate-400">Employee rows</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <p className="text-[10px] uppercase font-semibold text-slate-500">Attributes</p>
                <p className="text-xl font-bold text-brand-400 mt-0.5">{data.total_columns}</p>
                <p className="text-[11px] text-slate-400">Features + Target</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <p className="text-[10px] uppercase font-semibold text-slate-500">Class Balance</p>
                <p className="text-xl font-bold text-violet-400 mt-0.5">
                  {data.target_distribution['Yes'] || 0} / {data.total_rows}
                </p>
                <p className="text-[11px] text-slate-400">
                  {(((data.target_distribution['Yes'] || 0) / data.total_rows) * 100).toFixed(1)}% Attrition
                </p>
              </div>
            </div>
          )}

          {data && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-white">Feature Schema & Data Types ({data.columns.length} columns)</p>
              <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto p-2 rounded-xl bg-slate-900/40 border border-slate-800">
                {data.columns.map(col => (
                  <span
                    key={col}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      col === 'Attrition'
                        ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
