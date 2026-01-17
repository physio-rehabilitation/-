
import React from 'react';
import { UCSData } from '../types';

interface Props {
  data: UCSData;
  onChange: (updates: Partial<UCSData>) => void;
}

const BottomBar: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="w-full p-8 border-t border-slate-800 bg-slate-950/50 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto flex items-center gap-12">
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">严重程度模拟 (Severity Slider)</h2>
              <p className="text-[10px] text-slate-500 uppercase font-mono">Dynamic Morphing Logic</p>
            </div>
            <div className="text-right">
              <span className={`text-2xl font-black tabular-nums transition-colors ${
                data.severity > 0.7 ? 'text-red-500' : data.severity > 0.4 ? 'text-orange-500' : 'text-blue-500'
              }`}>
                {(data.severity * 100).toFixed(0)}%
              </span>
              <span className="text-[10px] text-slate-500 ml-2 uppercase font-bold">UCS 指数</span>
            </div>
          </div>
          
          <div className="relative h-12 flex items-center">
            <div className="absolute inset-0 flex justify-between items-center pointer-events-none px-1">
               <span className="text-[10px] text-slate-600 font-bold uppercase">标准位</span>
               <span className="text-[10px] text-slate-600 font-bold uppercase">轻度</span>
               <span className="text-[10px] text-slate-600 font-bold uppercase">重度</span>
               <span className="text-[10px] text-slate-600 font-bold uppercase">慢性损伤期</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={data.severity}
              onChange={(e) => onChange({ severity: parseFloat(e.target.value) })}
              className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
            />
          </div>
        </div>

        <div className="flex gap-4">
           <button 
             onClick={() => onChange({ severity: 0 })}
             className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
           >
             重置中立位
           </button>
           <button 
             onClick={() => onChange({ severity: 1 })}
             className="px-6 py-3 rounded-2xl bg-red-950/30 border border-red-500/50 text-xs font-bold text-red-400 hover:bg-red-900/40 transition-all"
           >
             重度模拟
           </button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
