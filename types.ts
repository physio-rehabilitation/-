
export enum ViewMode {
  MORPHOLOGY = 'MORPHOLOGY',
  MUSCLE = 'MUSCLE'
}

export interface MuscleInfo {
  id: string;
  name: string;
  chineseName: string;
  status: 'tight' | 'weak';
  description: string;
  mechanism: string;
  exercise: string;
  relatedMuscleId?: string; // ID of the antagonist or coupled muscle
}

export interface UCSData {
  severity: number; // 0 to 1
  viewMode: ViewMode;
  showXRay: boolean;
  showPlumbLine: boolean;
  selectedMuscleId: string | null;
  comparisonMode: boolean;
}
