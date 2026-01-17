
import React from 'react';
import { ViewMode, UCSData } from '../types';
import { COLORS, MUSCLES } from '../constants';

interface Props {
  data: UCSData;
  onMuscleClick: (id: string) => void;
}

const BodyCanvas: React.FC<Props> = ({ data, onMuscleClick }) => {
  const { severity, viewMode, showXRay, showPlumbLine, selectedMuscleId } = data;

  // Dynamic morphing parameters for SVG paths
  const headX = severity * 60; // Forward head posture
  const headY = severity * 10; // Head drops slightly
  const shoulderForward = severity * 35; // Rounded shoulders
  const kyphosis = severity * 45; // Humpback curvature

  // Identify linked muscles for "Impact Chain" visualization
  const selectedMuscleInfo = MUSCLES.find(m => m.id === selectedMuscleId);
  const relatedMuscleId = selectedMuscleInfo?.relatedMuscleId;

  const renderMuscle = (id: string, path: string, status: 'tight' | 'weak', opacity: number = 0.4) => {
    const isSelected = selectedMuscleId === id;
    const isRelated = relatedMuscleId === id;
    
    // Determine visibility and color based on mode and selection
    let fill = 'transparent';
    let stroke = 'none';
    let finalOpacity = 0;

    if (viewMode === ViewMode.MUSCLE) {
      fill = status === 'tight' ? COLORS.tight : COLORS.weak;
      finalOpacity = opacity;

      if (isSelected) {
        finalOpacity = 0.8;
        stroke = '#fff';
      } else if (isRelated) {
        finalOpacity = 0.6; // Highlight related muscle slightly less
        stroke = status === 'tight' ? COLORS.tight : COLORS.weak;
      } else if (selectedMuscleId) {
        finalOpacity = 0.1; // Dim others if one is selected
      }
    } else {
        // Morphology mode - minimal muscle hint
        finalOpacity = 0; 
    }
    
    return (
      <g 
        key={id} 
        className="cursor-pointer transition-all duration-500"
        onClick={() => onMuscleClick(id)}
      >
        <path 
          d={path} 
          fill={fill} 
          fillOpacity={finalOpacity}
          stroke={stroke}
          strokeWidth={isSelected || isRelated ? 2 : 0}
          className="hover:fill-opacity-90 hover:filter hover:drop-shadow-lg"
        />
      </g>
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#151515] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
      
      {/* Main Visualization SVG */}
      <svg 
        viewBox="0 0 400 600" 
        className="w-full h-full max-h-[90vh] transition-all duration-700 select-none"
        style={{ filter: 'drop-shadow(0px 20px 40px rgba(0,0,0,0.6))' }}
      >
        <defs>
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          <linearGradient id="muscleTightGrad" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor="#ef4444" />
             <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
           <linearGradient id="muscleWeakGrad" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stopColor="#3b82f6" />
             <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>

        {/* --- Guides Layer --- */}
        {showPlumbLine && (
          <g className="z-0 pointer-events-none">
            {/* Ear line */}
            <line x1={205 + headX} y1="0" x2={205 + headX} y2="600" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            {/* Shoulder line */}
            <line x1={200 + shoulderForward} y1="0" x2={200 + shoulderForward} y2="600" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <text x="320" y="580" fill="#64748b" fontSize="10" textAnchor="end" className="uppercase font-mono tracking-widest">Plumb Line Deviation</text>
          </g>
        )}

        {/* --- Body Silhouette Layer (High Precision Morphing) --- */}
        <path
          d={`
            M 210,580 
            L 170,580
            L 165,500
            Q 145,400 155,350 
            Q ${155 + kyphosis},280 ${185 + shoulderForward},240
            Q ${185 + headX},210 ${195 + headX},130
            C ${195 + headX},90 ${245 + headX},90 ${245 + headX},130
            Q ${240 + headX},180 ${230 + headX},210
            Q ${280 + shoulderForward},240 ${290 + shoulderForward},320
            Q ${300},450 260,580
            Z
          `}
          fill="url(#skinGradient)"
          stroke="#000"
          strokeWidth="1"
          strokeOpacity="0.5"
          className="transition-all duration-700 ease-out"
        />

        {/* --- Skeleton / X-Ray Layer --- */}
        {showXRay && (
          <g className="transition-all duration-700 pointer-events-none" opacity="0.9">
            {/* Cervical Spine (Neck) - Hyper lordosis simulation */}
            {[...Array(7)].map((_, i) => (
              <rect 
                key={`c-${i}`}
                x={195 + headX + (i * 2)} 
                y={130 + (i * 12)} 
                width="14" 
                height="10" 
                rx="2" 
                fill="#e2e8f0" 
                stroke="#94a3b8"
                transform={`rotate(${i * 6 + (severity * 15)}, ${200 + headX}, ${135 + i * 12})`}
              />
            ))}
            {/* Thoracic Spine (Upper Back) - Hyper kyphosis simulation */}
            {[...Array(8)].map((_, i) => (
              <rect 
                key={`t-${i}`}
                x={180 + shoulderForward - (Math.sin(i*0.5)*kyphosis*0.3)} 
                y={220 + (i * 15)} 
                width="18" 
                height="12" 
                rx="2" 
                fill="#cbd5e1" 
                stroke="#64748b"
                transform={`rotate(${15 - (i * 2) - (severity * i * 3)}, ${190}, ${230 + i * 15})`}
              />
            ))}
          </g>
        )}

        {/* --- Reference Points --- */}
        <g className="pointer-events-none">
           {/* Ear */}
           <circle cx={220 + headX} cy={145 + headY} r="4" fill="#3b82f6" stroke="#fff" strokeWidth="1" opacity={0.8} />
           {/* Shoulder Joint */}
           <circle cx={225 + shoulderForward} cy={245} r="5" fill="#f97316" stroke="#fff" strokeWidth="1" opacity={0.8} />
        </g>

        {/* --- Muscle Layer (Interactive) --- */}
        {/* Pectorals (Tight) */}
        {renderMuscle(
          'pecs', 
          `M ${225 + shoulderForward},245 Q ${255 + shoulderForward},285 ${235 + shoulderForward},330 L ${205 + shoulderForward},310 Z`, 
          'tight'
        )}
        
        {/* Upper Traps (Tight) */}
        {renderMuscle(
          'upper_traps', 
          `M ${225 + headX},175 Q ${255 + shoulderForward},205 ${265 + shoulderForward},245 L ${225 + shoulderForward},245 Z`, 
          'tight'
        )}

         {/* Levator Scap (Tight - Deep) */}
         {renderMuscle(
          'levator', 
          `M ${215 + headX},165 L ${225 + shoulderForward},235 L ${215 + shoulderForward},235 Z`, 
          'tight',
          0.3
        )}

        {/* Deep Neck Flexors (Weak) */}
        {renderMuscle(
          'deep_flexors', 
          `M ${235 + headX},145 Q ${245 + headX},175 ${250 + headX},200 L ${235 + headX},200 Z`, 
          'weak'
        )}

        {/* Rhomboids / Lower Traps (Weak) */}
        {renderMuscle(
          'rhomboids', 
          `M ${195 + shoulderForward * 0.5},260 Q ${185 + kyphosis},350 ${205 + kyphosis * 0.5},420 L ${220 + kyphosis * 0.5},400 Z`, 
          'weak'
        )}
        
        {/* --- UCS Cross Vectors (The Logic Layer) --- */}
        {viewMode === ViewMode.MUSCLE && severity > 0.1 && (
          <g className="pointer-events-none animate-in fade-in duration-1000">
            {/* The Tight Cross (Posterior Top to Anterior Bottom) */}
            <path 
              d={`M ${225 + headX},160 L ${235 + shoulderForward},300`} 
              stroke="url(#muscleTightGrad)" 
              strokeWidth="4" 
              strokeDasharray="6 2"
              opacity="0.6"
              className="animate-pulse"
            />
             <text x={240 + headX} y={160} fill="#f97316" fontSize="10" fontWeight="bold">TIGHT</text>

            {/* The Weak Cross (Anterior Top to Posterior Bottom) */}
            <path 
              d={`M ${250 + headX},160 L ${190 + kyphosis},350`} 
              stroke="url(#muscleWeakGrad)" 
              strokeWidth="4" 
              strokeDasharray="6 2"
              opacity="0.6"
              className="animate-pulse"
            />
            <text x={260 + headX} y={180} fill="#3b82f6" fontSize="10" fontWeight="bold">WEAK</text>
            
            {/* Central Node */}
            <circle cx={(225 + headX + 235 + shoulderForward)/2} cy={(160 + 300)/2} r="8" fill="white" fillOpacity="0.2" stroke="white" />
          </g>
        )}

      </svg>
    </div>
  );
};

export default BodyCanvas;
