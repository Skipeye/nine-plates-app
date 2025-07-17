import React from 'react';
import type { User } from '../types';
import { PLANS } from '../data/constants';
import { DarkModeToggle } from './DarkModeToggle';

interface HeaderProps {
  user: User;
  onUpgrade: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onUpgrade, isDarkMode, onToggleDarkMode }) => {
  const currentPlan = PLANS[user.plan];
  
  const handleUpgrade = () => {
    onUpgrade();
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">9 Plates</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
            Never miss a deadline with 9 Plates!
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
          
          <div className="text-right">
            <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
              {currentPlan.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {currentPlan.price}
            </div>
            {user.plan === 'free' && (
              <button
                onClick={handleUpgrade}
                className="mt-1 px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
              >
                Power up!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
