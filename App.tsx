
import React, { useState } from 'react';
import { ViewMode, UCSData } from './types';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import BodyCanvas from './components/BodyCanvas';
import BottomBar from './components/BottomBar';
import { Activity } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<UCSData>({
    severity: 0.35,
    viewMode: ViewMode.MORPHOLOGY,
    showXRay: false,
    showPlumbLine: true,
    selectedMuscleId: null,
    comparisonMode: false
  });

  const handleUpdate = (updates: Partial<UCSData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleMuscleClick = (id: string) => {
    setData(prev => ({ 
      ...prev, 
      selectedMuscleId: prev.selectedMuscleId === id ? null : id,
      viewMode: ViewMode.MUSCLE 
    }));
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans antialiased">
      {/* Top Header */}
      <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Activity className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight leading-none uppercase">UCS 姿态可视化 <span className="text-blue-500 font-bold">专业版</span></h1>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-1">临床生物力学分析引擎 v5.0</p>
          </div>
        </div>
        
        <nav className="flex items-center gap-8">
          <div className="flex items-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">技术文档</span>
            <span className="hover:text-white cursor-pointer transition-colors">临床中心</span>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/10">
              导出诊断报告
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        <SidebarLeft data={data} onChange={handleUpdate} />
        
        <section className="flex-1 relative p-8 flex flex-col items-center bg-[#111]">
          {data.comparisonMode ? (
            <div className="w-full h-full flex gap-6">
              <div className="flex-1 flex flex-col items-center">
                <p className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-widest bg-slate-900/50 px-3 py-1 rounded-full border border-white/5">标准中立位 (Neutral)</p>
                <div className="w-full flex-1">
                  <BodyCanvas data={{ ...data, severity: 0, comparisonMode: false }} onMuscleClick={handleMuscleClick} />
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <p className="text-xs font-bold text-red-500 uppercase mb-4 tracking-widest bg-red-950/20 px-3 py-1 rounded-full border border-red-500/10">病理模拟位 (UCS Status)</p>
                <div className="w-full flex-1">
                  <BodyCanvas data={{ ...data, comparisonMode: false }} onMuscleClick={handleMuscleClick} />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full max-w-4xl mx-auto">
               <BodyCanvas data={data} onMuscleClick={handleMuscleClick} />
            </div>
          )}
        </section>

        <SidebarRight data={data} />
      </main>

      <BottomBar data={data} onChange={handleUpdate} />
    </div>
  );
};

export default App;
