import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PredictionPage } from './pages/PredictionPage';
import { ExplorerPage } from './pages/ExplorerPage';
import { ModelLabPage } from './pages/ModelLabPage';
import { ExplainableAiPage } from './pages/ExplainableAiPage';
import { RetentionInsightsPage } from './pages/RetentionInsightsPage';
import { DatasetManagerPage } from './pages/DatasetManagerPage';
import { ProjectInfoPage } from './pages/ProjectInfoPage';
import { apiService } from './services/api';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean>(true);

  // Sync dark class on root HTML
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Ping backend health
  useEffect(() => {
    const checkHealth = () => {
      apiService.getHealth()
        .then(() => setIsBackendHealthy(true))
        .catch(() => setIsBackendHealthy(false));
    };

    checkHealth();
    const interval = setInterval(checkHealth, 20000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const renderActivePage = () => {
    switch (currentTab) {
      case 'landing':
        return <LandingPage setCurrentTab={setCurrentTab} />;
      case 'dashboard':
        return <DashboardPage />;
      case 'predict':
        return <PredictionPage />;
      case 'explorer':
        return <ExplorerPage />;
      case 'models':
        return <ModelLabPage />;
      case 'xai':
        return <ExplainableAiPage />;
      case 'insights':
        return <RetentionInsightsPage />;
      case 'dataset':
        return <DatasetManagerPage />;
      case 'docs':
        return <ProjectInfoPage />;
      default:
        return <LandingPage setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isBackendHealthy={isBackendHealthy}
      />

      <div className="flex-1 flex w-full">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 w-full lg:pl-64 pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export default App;
