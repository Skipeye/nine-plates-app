import type { LifeEfficiencyLevel } from '../types';

export const CONSEQUENCE_LABELS = [
  'Trivial',
  'Minor', 
  'Moderate',
  'Important',
  'Significant',
  'Substantial',
  'Critical',
  'Vital',
  'Crucial'
];

export const LIFE_EFFICIENCY_LEVELS: LifeEfficiencyLevel[] = [
  { name: 'Ineffective', minScore: 0, color: 'bg-red-500' },
  { name: 'Mediocre', minScore: 20, color: 'bg-red-400' },
  { name: 'Adequate', minScore: 40, color: 'bg-yellow-500' },
  { name: 'Competent', minScore: 60, color: 'bg-yellow-400' },
  { name: 'Proficient', minScore: 75, color: 'bg-green-400' },
  { name: 'Efficient', minScore: 85, color: 'bg-green-500' },
  { name: 'Excellence', minScore: 92, color: 'bg-blue-500' },
  { name: 'Superiority', minScore: 96, color: 'bg-purple-500' },
  { name: 'Mastery', minScore: 99, color: 'bg-purple-600' },
];

export const PLANS = {
  free: { name: '9 Plates', maxPlates: 9, price: 'FREE' },
  business: { name: '18 Plates', maxPlates: 18, price: '£1/month' },
  entrepreneur: { name: '27 Plates', maxPlates: 27, price: '£3/month' }
};
