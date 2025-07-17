import React from 'react';
import type { User } from '../types';
import { LIFE_EFFICIENCY_LEVELS } from '../data/constants';

interface LifeEfficiencyProps {
  user: User;
}

export const LifeEfficiency: React.FC<LifeEfficiencyProps> = ({ user }) => {
  const calculateEfficiencyScore = () => {
    const total = user.platesSaved + user.platesSmashed;
    if (total === 0) return 0;
    
    const successRate = (user.platesSaved / total) * 100;
    const consequencePenalty = Math.min(user.consequenceTally * 2, 50);
    
    return Math.max(0, Math.min(100, successRate - consequencePenalty));
  };

  const score = calculateEfficiencyScore();
  const currentLevel = LIFE_EFFICIENCY_LEVELS
    .slice()
    .reverse()
    .find(level => score >= level.minScore) || LIFE_EFFICIENCY_LEVELS[0];

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <div className="text-4xl">🏆</div>
      </div>
      
      <h2 className="text-xl font-bold text-center mb-6">Life Efficiency</h2>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-sm text-gray-600">Plates smashed: {user.platesSmashed}</div>
          <div className="text-sm text-gray-600">Plates saved: {user.platesSaved}</div>
          <div className="text-sm text-gray-600">Consequence tally: {user.consequenceTally}</div>
        </div>
        
        <div className="space-y-2">
          {LIFE_EFFICIENCY_LEVELS.map((level) => (
            <div key={level.name} className="flex items-center space-x-2">
              <div 
                className={`w-4 h-4 rounded ${level.color} ${
                  currentLevel.name === level.name ? 'ring-2 ring-blue-500' : ''
                }`}
              />
              <span className={`text-sm ${
                currentLevel.name === level.name ? 'font-bold' : ''
              }`}>
                {level.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-4">
          <div className="text-lg font-bold text-orange-600">
            Current: {currentLevel.name}
          </div>
          <div className="text-sm text-gray-600">
            Score: {Math.round(score)}/100
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Room for improvement
          </div>
        </div>
      </div>
    </div>
  );
};
