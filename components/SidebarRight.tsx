
import React from 'react';
import { UCSData } from '../types';
import { MUSCLES } from '../constants';
import { Info, Target, PlayCircle, AlertCircle, ArrowRightLeft, CheckCircle2, ScanEye } from 'lucide-react';

interface Props {
  data: UCSData;
}

const SidebarRight: React.FC<Props> = ({ data }) => {
  const selectedMuscle = MUSCLES.find(m => m.id === data.selectedMuscleId);
  const linkedMuscle = selectedMuscle?.relatedMuscleId ? MUSCLES.find(m => m.id === selectedMuscle.relatedMuscleId) : null;

  // Bio-metrics Logic
  const angle = Math.round(data.severity * 45);
  const severityText = data.severity > 0.7 ? '重度 (Severe)' : data.severity > 0.3 ? '中度 (Moderate)' : '轻度 (Mild)';
  const severityColor = data.severity > 0.7 ? 'text-red-400' : data.severity > 0.3 ? 'text-orange-400' : 'text-green-400';

  return (
    <div className="w-96 h-full flex flex-col p-6 border-l border-slate-800 bg-[#0f1115] overflow-hidden">
      
      {/* Bio-metrics Dashboard (Always Visible) */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center gap-2 mb-3">
             <ScanEye size={16} className="text-blue-500" />
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest">生物力学实时监控</span>
        </div>
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">C7/Tragus Angle</p>
              <p className="text-2xl font-black text-white">{angle}°</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Status</p>
              <span className={`text-sm font-bold ${severityColor}`}>
                {severityText}
              </span>
            </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2 space-y-6">
        {selectedMuscle ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
            
            {/* Header */}
            <header className="pb-4 border-b border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md inline-block ${
                  selectedMuscle.status === 'tight' ? 'bg-orange-950 text-orange-500 border border-orange-900' : 'bg-blue-950 text-blue-500 border border-blue-900'
                }`}>
                  {selectedMuscle.status === 'tight' ? '过度活跃 (Tight)' : '被抑制 (Weak)'}
                </div>
              </div>
              <h1 className="text-3xl font-black text-white leading-tight mb-1">{selectedMuscle.chineseName}</h1>
              <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{selectedMuscle.name}</p>
            </header>

            {/* Impact Chain Section */}
            {linkedMuscle && (
              <section className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-600"></div>
                <div className="flex items-center gap-2 mb-2 text-purple-400">
                  <ArrowRightLeft size={16} />
                  <h3 className="text-xs font-bold uppercase tracking-wider">失衡连锁反应</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  当 <span className="text-white font-bold">{selectedMuscle.chineseName}</span> 处于{selectedMuscle.status === 'tight' ? '紧张' : '无力'}状态时，通常会导致其拮抗肌群出现代偿性改变：
                </p>
                <div className="flex items-center gap-3 bg-black/40 p-2 rounded-lg border border-white/5">
                  <div className={`w-2 h-2 rounded-full ${linkedMuscle.status === 'tight' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                  <span className="text-sm font-bold text-slate-200">{linkedMuscle.chineseName}</span>
                  <span className="text-[10px] text-slate-500 uppercase ml-auto">{linkedMuscle.status === 'tight' ? '变得紧张' : '变得无力'}</span>
                </div>
              </section>
            )}

            {/* Clinical Info */}
            <div className="grid grid-cols-1 gap-3">
              <section className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-slate-300">
                    <Info size={16} />
                    <h3 className="text-xs font-bold uppercase tracking-wider">临床表现</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {selectedMuscle.description}
                  </p>
                </section>

                <section className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-slate-300">
                    <Target size={16} />
                    <h3 className="text-xs font-bold uppercase tracking-wider">生物力学机制</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    {selectedMuscle.mechanism}
                  </p>
                </section>
            </div>

            {/* Prescription / Correction Plan */}
            <section className={`p-5 rounded-2xl border ${selectedMuscle.status === 'tight' ? 'bg-orange-950/10 border-orange-500/20' : 'bg-blue-950/10 border-blue-500/20'}`}>
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} className={selectedMuscle.status === 'tight' ? 'text-orange-400' : 'text-blue-400'} />
                <h3 className={`text-sm font-black uppercase tracking-wider ${selectedMuscle.status === 'tight' ? 'text-orange-400' : 'text-blue-400'}`}>
                  {selectedMuscle.status === 'tight' ? '松解与拉伸方案' : '激活与强化方案'}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 flex items-start gap-3">
                  <PlayCircle size={16} className="text-slate-500 mt-0.5" />
                  <div>
                    <div className="text-sm text-slate-200 font-bold mb-1">{selectedMuscle.exercise.split('、')[0]}</div>
                    <div className="text-[10px] text-slate-500">建议频率: 3组 x 30秒</div>
                  </div>
                </div>
                {selectedMuscle.exercise.split('、')[1] && (
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 flex items-start gap-3">
                    <PlayCircle size={16} className="text-slate-500 mt-0.5" />
                    <div>
                      <div className="text-sm text-slate-200 font-bold mb-1">{selectedMuscle.exercise.split('、')[1]}</div>
                      <div className="text-[10px] text-slate-500">建议频率: 每天早晚各一次</div>
                    </div>
                  </div>
                )}
              </div>
            </section>

          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center pt-10 text-center space-y-6 opacity-60">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-slate-700 border border-slate-800">
                <Target size={40} strokeWidth={1} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-full">
                <Info size={14} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-300 mb-2">智能诊断面板</h3>
              <p className="text-sm text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                请点击左侧模型中的<span className="text-orange-500">红色(紧张)</span>或<span className="text-blue-500">蓝色(无力)</span>区域，获取详细病理分析与康复处方。
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Severity Indicator */}
      <div className="flex-shrink-0 mt-6 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2 mb-3 text-slate-500">
          <AlertCircle size={14} />
          <h3 className="text-[10px] font-bold uppercase tracking-widest">当前体态风险指数</h3>
        </div>
        <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
           <div className="flex justify-between items-center mb-2">
             <span className="text-xs text-slate-400">神经卡压风险</span>
             <span className={`text-xs font-bold ${data.severity > 0.6 ? 'text-red-400' : 'text-green-400'}`}>
               {data.severity > 0.6 ? 'HIGH' : 'LOW'}
             </span>
           </div>
           <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-green-500 via-orange-500 to-red-500 transition-all duration-700"
               style={{ width: `${data.severity * 100}%` }}
             />
           </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
