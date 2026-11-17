import React from 'react';
import {
  BrainCircuit, Sun, Moon, Menu, X, Activity,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isBackendHealthy: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isDark,
  toggleTheme,
  mobileMenuOpen,
  setMobileMenuOpen,
  isBackendHealthy
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Project Branding */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('landing')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-violet-500 p-0.5 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-brand-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base sm:text-lg tracking-tight text-white font-sans">
                Retain<span className="text-brand-400">AI</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 hidden sm:inline-block">
                SRM IST
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-xs">
              Employee Attrition Prediction & XAI
            </p>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-3">
          {/* Backend Status indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className={`w-2 h-2 rounded-full ${isBackendHealthy ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            <Activity className="w-3.5 h-3.5 text-slate-400" />
            <span>FastAPI ML Backend:</span>
            <span className={isBackendHealthy ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
              {isBackendHealthy ? 'Connected' : 'Offline'}
            </span>
          </div>

          {/* Quick Action Buttons */}
          <button
            onClick={() => setCurrentTab('predict')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentTab === 'predict'
                ? 'bg-gradient-to-r from-brand-500 to-violet-500 text-white shadow-md shadow-brand-500/25'
                : 'bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800'
            }`}
          >
            Predict Risk
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
