export interface Plate {
  id: string;
  title: string;
  deadline: string;
  consequence: number; // 1-9 scale
  status: 'spinning' | 'wobbling' | 'falling';
  createdAt: Date;
  completedAt?: Date;
}

export interface User {
  plan: 'free' | 'business' | 'entrepreneur';
  maxPlates: number;
  platesSmashed: number;
  platesSaved: number;
  consequenceTally: number;
}

export interface LifeEfficiencyLevel {
  name: string;
  minScore: number;
  color: string;
}
