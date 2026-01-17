
import React from 'react';
import { UCSData, ViewMode } from '../types';
import { Eye, Ruler, LayoutGrid, Settings2, Sliders, User, Activity } from 'lucide-react';

interface Props {
  data: UCSData;
  onChange: (updates: Partial<UCSData>) => void;
}

const SidebarLeft: React.FC<Props> = ({ data, onChange }) => {
  const ToggleItem = ({ label, checked, icon: Icon, colorClass, onClick }: any) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
        checked 
        ? 'bg-slate-900 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
        : 'bg-transparent border-slate-800 hover:bg-slate-900/50 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${checked ? 'bg-slate-800' : 'bg-slate-900'}`}>
          <Icon size={18} className={checked ? colorClass : 'text-slate-500'} />
        </div>
        <span className={`text-xs font-bold ${checked ? 'text-slate-200' : 'text-slate-500'}`}>{label}</span>
      </div>
      <div className={`w-3 h-3 rounded-full border ${checked ? `bg-blue-500 border-blue-500` : 'border-slate-600'}`} />
    </button>
  );

  return (
    <div className="w-72 h-full flex flex-col gap-6 p-6 border-r border-slate-800 bg-[#0f1115]">
      
      {/* Title / Brand area */}
      <div className="pt-2">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
          <Sliders size={14} />
          视图模式
        </h2>
        
        {/* Mode Switcher moved from Canvas */}
        <div className="bg-slate-900 p-1 rounded-xl flex border border-slate-800">
           <button 
            onClick={() => onChange({ viewMode: ViewMode.MORPHOLOGY })}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-xs font-bold ${
              data.viewMode === ViewMode.MORPHOLOGY 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <User size={14} />
            形态
          </button>
          <button 
            onClick={() => onChange({ viewMode: ViewMode.MUSCLE })}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-xs font-bold ${
              data.viewMode === ViewMode.MUSCLE 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Activity size={14} />
            肌肉
          </button>
        </div>
      </div>

      <div className="h-px bg-slate-800 w-full" />

      {/* Toggles */}
      <div className="space-y-4 flex-1">
         <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-2">
          辅助工具
        </h2>

        <ToggleItem 
          label="骨骼透视 (X-Ray)" 
          checked={data.showXRay} 
          icon={Eye} 
          colorClass="text-blue-400"
          onClick={() => onChange({ showXRay: !data.showXRay })} 
        />
        
        <ToggleItem 
          label="垂直参考线" 
          checked={data.showPlumbLine} 
          icon={Ruler} 
          colorClass="text-orange-400"
          onClick={() => onChange({ showPlumbLine: !data.showPlumbLine })} 
        />

        <ToggleItem 
          label="分屏对比模式" 
          checked={data.comparisonMode} 
          icon={LayoutGrid} 
          colorClass="text-purple-400"
          onClick={() => onChange({ comparisonMode: !data.comparisonMode })} 
        />
      </div>

      {/* Info Block */}
      <div className="mt-auto p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800/50">
        <div className="flex items-center gap-2 mb-3">
          <Settings2 size={16} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-300">参数说明</span>
        </div>
        <div className="space-y-2 text-[10px] text-slate-500 leading-relaxed">
          <p>
            <span className="text-slate-400 font-bold">形态模式:</span> 侧重于C7与耳屏的相对位置变化。
          </p>
          <p>
            <span className="text-slate-400 font-bold">肌肉模式:</span> 采用Janda交叉综合征着色逻辑（红色=紧张，蓝色=抑制）。
          </p>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
