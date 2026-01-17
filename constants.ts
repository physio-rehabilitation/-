
import { MuscleInfo } from './types';

export const MUSCLES: MuscleInfo[] = [
  {
    id: 'pecs',
    name: 'Pectoralis Major/Minor',
    chineseName: '胸大肌/胸小肌',
    status: 'tight',
    description: '胸部肌肉过紧会将肩胛骨向前拉动，导致肩部前扣（圆肩）。',
    mechanism: '胸小肌缩短会导致肩胛骨前倾，从而压缩肩峰下空间，增加肩部撞击风险。',
    exercise: '门口胸部拉伸、泡沫轴胸椎放松。',
    relatedMuscleId: 'rhomboids'
  },
  {
    id: 'upper_traps',
    name: 'Upper Trapezius',
    chineseName: '上斜方肌',
    status: 'tight',
    description: '上提肩胛骨，导致肩颈部持续紧张。',
    mechanism: '过度活跃会导致肩部位置上移和颈部僵硬，常伴随呼吸模式异常。',
    exercise: '静态颈部拉伸、下沉肩胛骨训练。',
    relatedMuscleId: 'deep_flexors'
  },
  {
    id: 'levator',
    name: 'Levator Scapulae',
    chineseName: '肩胛提肌',
    status: 'tight',
    description: '在头前伸姿态下过度代偿以稳定颈部。',
    mechanism: '张力增加会导致颈源性头痛和转头受限。',
    exercise: '主动放松技术、收下颌训练。',
    relatedMuscleId: 'deep_flexors'
  },
  {
    id: 'deep_flexors',
    name: 'Deep Neck Flexors',
    chineseName: '颈深屈肌',
    status: 'weak',
    description: '维持颈部稳定的核心肌肉，在UCS中通常处于被抑制和无力状态。',
    mechanism: '无力导致下巴前伸，增加上颈椎的伸展应力。',
    exercise: '收下颌训练（Chin Tucks）、深层屈肌等长收缩。',
    relatedMuscleId: 'upper_traps'
  },
  {
    id: 'rhomboids',
    name: 'Rhomboids & Lower Traps',
    chineseName: '菱形肌/下斜方肌',
    status: 'weak',
    description: '负责肩胛骨后收；在UCS中被拉长并失去活性。',
    mechanism: '抑制导致肩胛骨翼状突出和胸椎伸展能力下降。',
    exercise: '面拉（Face Pulls）、Y-W上举、肩胛后收训练。',
    relatedMuscleId: 'pecs'
  },
  {
    id: 'serratus',
    name: 'Serratus Anterior',
    chineseName: '前锯肌',
    status: 'weak',
    description: '对肩胛骨健康至关重要；在UCS中常表现为无力。',
    mechanism: '无力会导致肩胛骨内侧缘翘起（翼状肩胛）。',
    exercise: '靠墙滑行、俯卧撑加项（Plank Plus）。',
    relatedMuscleId: 'pecs'
  }
];

export const COLORS = {
  tight: '#f97316', // Orange-500
  weak: '#3b82f6',  // Blue-500
  neutral: '#cbd5e1', // Slate-300
  bone: '#f8fafc',
  accent: '#a855f7' // Purple-500
};
