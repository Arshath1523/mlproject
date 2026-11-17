import React from 'react';
import {
  Home, LayoutDashboard, UserCheck, Table, Cpu,
  Sparkles, Lightbulb, Database, FileText, GraduationCap
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const navItems = [
    { id: 'landing', label: 'Project Overview', icon: Home, badge: 'Home' },
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'predict', label: 'Predict Attrition', icon: UserCheck, highlight: true },
    { id: 'explorer', label: 'Employee Explorer', icon: Table },
    { id: 'models', label: 'ML Model Lab', icon: Cpu },
    { id: 'xai', label: 'Explainable AI (SHAP)', icon: Sparkles },
    { id: 'insights', label: 'Retention Insights', icon: Lightbulb },
    { id: 'dataset', label: 'Dataset Manager', icon: Database },
    { id: 'docs', label: 'Project Info & Specs', icon: FileText }
  ];

  const handleSelect = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-64 bg-slate-950/95 lg:bg-slate-950/60 backdrop-blur-xl border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
            Navigation Modules
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600/20 to-violet-600/20 text-brand-400 border border-brand-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Academic Details Footer Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-brand-400 font-semibold mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>21CSC307P Project</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            SRM IST Tiruchirappalli
          </p>
          <div className="mt-2 pt-2 border-t border-slate-800/60 space-y-1 text-[11px] text-slate-400">
            <p className="truncate">
              <strong className="text-slate-200">Arshath Ahamed S</strong>
              <span className="block text-[10px] text-slate-500">RA2411056050026</span>
            </p>
            <p className="truncate">
              <strong className="text-slate-200">Dhan Veershaan RA</strong>
              <span className="block text-[10px] text-slate-500">RA2411056050052</span>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
