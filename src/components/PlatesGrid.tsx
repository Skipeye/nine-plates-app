import React from 'react';
import type { Plate } from '../types';
import { PlateSpinner } from './PlateSpinner';

interface PlatesGridProps {
  plates: Plate[];
  maxPlates: number;
  onComplete: (id: string) => void;
  onSmash: (id: string) => void;
  onUpdateDeadline: (id: string, newDeadline: string) => void;
  onAddNew: () => void;
}

export const PlatesGrid: React.FC<PlatesGridProps> = ({ 
  plates, 
  maxPlates, 
  onComplete, 
  onSmash, 
  onUpdateDeadline,
  onAddNew 
}) => {
  const handleAddNew = () => {
    onAddNew();
  };

  const emptySlots = maxPlates - plates.length;

  return (
    <>
      <h2 className="text-xl font-bold text-center mb-6 dark:text-white">What's spinning?</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {plates.map(plate => (
          <PlateSpinner
            key={plate.id}
            plate={plate}
            onComplete={() => onComplete(plate.id)}
            onSmash={() => onSmash(plate.id)}
            onUpdateDeadline={onUpdateDeadline}
          />
        ))}
        
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div 
            key={`empty-${index}`}
            className="empty-plate-slot"
            onClick={handleAddNew}
            style={{ background: 'transparent !important' }}
          >
            <div className="empty-plate-visual">
              <div className="plate-side-view">
                <div className="plate-edge">
                  <div className="plate-rim"></div>
                  <div className="plate-surface"></div>
                </div>
              </div>
              <div className="plate-pole"></div>
              <div className="plate-base"></div>
            </div>
            <div className="empty-plate-text">
              Add plate
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button
          onClick={handleAddNew}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          disabled={plates.length >= maxPlates}
        >
          + New Plate
        </button>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {plates.length}/{maxPlates} plates spinning
        </div>
      </div>
    </>
  );
};
