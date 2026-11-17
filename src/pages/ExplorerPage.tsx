import React, { useState, useEffect } from 'react';
import {
  Table as TableIcon, Search, Download, Filter, ChevronLeft,
  ChevronRight, RefreshCw, AlertCircle, ArrowUpDown
} from 'lucide-react';
import { apiService } from '../services/api';
import { DatasetPreviewData } from '../types';
import { DEPARTMENTS, JOB_ROLES } from '../utils/constants';

export const ExplorerPage: React.FC = () => {
  const [data, setData] = useState<DatasetPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [overtimeFilter, setOvertimeFilter] = useState('All');
  const [attritionFilter, setAttritionFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [sortField, setSortField] = useState('Age');
  const [sortAsc, setSortAsc] = useState(true);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiService.getDatasetPreview(1, 100);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to load employee records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Filter & Sort Logic
  const allRows = data?.preview_rows || [];
  const filteredRows = allRows.filter((row) => {
    const matchesSearch =
      !search ||
      String(row.JobRole || '').toLowerCase().includes(search.toLowerCase()) ||
      String(row.Department || '').toLowerCase().includes(search.toLowerCase()) ||
      String(row.EducationField || '').toLowerCase().includes(search.toLowerCase());

    const matchesDept = deptFilter === 'All' || row.Department === deptFilter;
    const matchesRole = roleFilter === 'All' || row.JobRole === roleFilter;
    const matchesOt = overtimeFilter === 'All' || row.OverTime === overtimeFilter;
    const matchesAtt = attritionFilter === 'All' || row.Attrition === attritionFilter;

    return matchesSearch && matchesDept && matchesRole && matchesOt && matchesAtt;
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (valA === valB) return 0;
    if (valA === undefined) return 1;
    if (valB === undefined) return -1;
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }
    return sortAsc
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const totalPages = Math.ceil(sortedRows.length / pageSize) || 1;
  const paginatedRows = sortedRows.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleExportCsv = () => {
    if (sortedRows.length === 0) return;
    const headers = Object.keys(sortedRows[0]).join(',');
    const rows = sortedRows.map(r => Object.values(r).map(v => `"${v}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `employee_attrition_filtered_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <TableIcon className="w-6 h-6 text-brand-400" />
            <span>Employee Analytics Explorer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse anonymized employee cohorts, sort feature metrics, apply filters, and export customized subsets.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
        >
          <Download className="w-4 h-4 text-brand-400" />
          <span>Export Filtered CSV</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative min-w-[220px] flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search role, department, or field..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-brand-500 focus:outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={deptFilter}
            onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none max-w-[140px] truncate"
          >
            <option value="All">All Roles</option>
            {JOB_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <select
            value={overtimeFilter}
            onChange={(e) => { setOvertimeFilter(e.target.value); setPage(1); }}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
          >
            <option value="All">OverTime: All</option>
            <option value="Yes">OverTime: Yes</option>
            <option value="No">OverTime: No</option>
          </select>

          <select
            value={attritionFilter}
            onChange={(e) => { setAttritionFilter(e.target.value); setPage(1); }}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
          >
            <option value="All">Attrition: All</option>
            <option value="Yes">Attrition: Yes</option>
            <option value="No">Attrition: No</option>
          </select>

          <button
            onClick={fetchRecords}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold tracking-wider uppercase text-[10px]">
                <th className="p-3.5 pl-5">Emp ID</th>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('Age')}>
                  <div className="flex items-center gap-1">Age <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Job Role</th>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('MonthlyIncome')}>
                  <div className="flex items-center gap-1">Income <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5">OverTime</th>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('JobSatisfaction')}>
                  <div className="flex items-center gap-1">Satisfaction <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5 cursor-pointer hover:text-white" onClick={() => handleSort('YearsAtCompany')}>
                  <div className="flex items-center gap-1">Tenure <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="p-3.5 pr-5">Attrition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row, idx) => {
                  const empId = `EMP-${1000 + (page - 1) * pageSize + idx + 1}`;
                  const isLeft = String(row.Attrition).toLowerCase() === 'yes';

                  return (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 pl-5 font-mono text-slate-500">{empId}</td>
                      <td className="p-3.5 font-medium text-white">{row.Age}</td>
                      <td className="p-3.5">{row.Department}</td>
                      <td className="p-3.5 text-slate-200">{row.JobRole}</td>
                      <td className="p-3.5 font-mono">${Number(row.MonthlyIncome || 0).toLocaleString()}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          row.OverTime === 'Yes' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {row.OverTime}
                        </span>
                      </td>
                      <td className="p-3.5">{row.JobSatisfaction} / 4</td>
                      <td className="p-3.5">{row.YearsAtCompany} yrs</td>
                      <td className="p-3.5 pr-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isLeft
                            ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                            : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {row.Attrition}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    No employee records match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 text-xs text-slate-400 bg-slate-900/40">
          <div>
            Showing <strong className="text-white">{sortedRows.length > 0 ? (page - 1) * pageSize + 1 : 0}</strong> to{' '}
            <strong className="text-white">{Math.min(page * pageSize, sortedRows.length)}</strong> of{' '}
            <strong className="text-white">{sortedRows.length}</strong> filtered records
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-300">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
