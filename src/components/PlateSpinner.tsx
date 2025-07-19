import React from 'react';
import type { Plate } from '../types';
import { useAudio } from '../hooks/useAudio';

interface PlateSpinnerProps {
  plate: Plate;
  onComplete: () => void;
  onSmash: () => void;
  onUpdateDeadline: (id: string, newDeadline: string) => void;
}

export const PlateSpinner: React.FC<PlateSpinnerProps> = ({ plate, onComplete, onSmash, onUpdateDeadline }) => {
  const [isEditingDeadline, setIsEditingDeadline] = React.useState(false);
  const [tempDeadline, setTempDeadline] = React.useState(plate.deadline);
  const { playSmashSound, playWobbleSound, playCompleteSound } = useAudio();
  const [hasPlayedWobbleSound, setHasPlayedWobbleSound] = React.useState(false);

  const handleComplete = () => {
    playCompleteSound();
    onComplete();
  };

  const handleSmash = () => {
    playSmashSound();
    onSmash();
  };

  const handleDeadlineClick = () => {
    const daysLeft = getDaysUntilDeadline();
    // Only allow editing if not overdue
    if (daysLeft > 0) {
      setIsEditingDeadline(true);
      setTempDeadline(plate.deadline);
    }
  };

  const handleDeadlineSubmit = () => {
    if (tempDeadline && tempDeadline !== plate.deadline) {
      onUpdateDeadline(plate.id, tempDeadline);
    }
    setIsEditingDeadline(false);
  };

  const handleDeadlineCancel = () => {
    setTempDeadline(plate.deadline);
    setIsEditingDeadline(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDeadlineSubmit();
    } else if (e.key === 'Escape') {
      handleDeadlineCancel();
    }
  };

  // Calculate days until deadline
  const getDaysUntilDeadline = () => {
    const today = new Date();
    const deadline = new Date(plate.deadline);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPlateAnimation = () => {
    const daysLeft = getDaysUntilDeadline();
    
    if (daysLeft <= 0) {
      return 'plate-falling';
    } else if (daysLeft <= 5) {
      return 'plate-wobbling';
    } else {
      return 'plate-spinning';
    }
  };

  const getPlateColor = () => {
    const daysLeft = getDaysUntilDeadline();
    
    // Urgency overrides consequence coloring
    if (daysLeft <= 0) {
      // Overdue - Dark red
      return {
        main: 'linear-gradient(to bottom, #7f1d1d 0%, #991b1b 70%, #7f1d1d 100%)',
        rim: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(127, 29, 29, 0.4))',
        surface: 'linear-gradient(to bottom, #7f1d1d 0%, #991b1b 100%)'
      };
    } else if (daysLeft <= 2) {
      // Very urgent - Bright red
      return {
        main: 'linear-gradient(to bottom, #ef4444 0%, #dc2626 70%, #b91c1c 100%)',
        rim: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(239, 68, 68, 0.3))',
        surface: 'linear-gradient(to bottom, #ef4444 0%, #dc2626 100%)'
      };
    } else if (daysLeft <= 5) {
      // Urgent - Orange/amber
      return {
        main: 'linear-gradient(to bottom, #f59e0b 0%, #d97706 70%, #b45309 100%)',
        rim: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(245, 158, 11, 0.3))',
        surface: 'linear-gradient(to bottom, #f59e0b 0%, #d97706 100%)'
      };
    }
    
    // Default to consequence-based coloring for non-urgent plates
    if (plate.consequence <= 3) {
      return {
        main: 'linear-gradient(to bottom, #22c55e 0%, #16a34a 70%, #15803d 100%)',
        rim: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(34, 197, 94, 0.3))',
        surface: 'linear-gradient(to bottom, #22c55e 0%, #16a34a 100%)'
      };
    }
    if (plate.consequence <= 6) {
      return {
        main: 'linear-gradient(to bottom, #eab308 0%, #ca8a04 70%, #a16207 100%)',
        rim: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(234, 179, 8, 0.3))',
        surface: 'linear-gradient(to bottom, #eab308 0%, #ca8a04 100%)'
      };
    }
    return {
      main: 'linear-gradient(to bottom, #ef4444 0%, #dc2626 70%, #b91c1c 100%)',
      rim: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(239, 68, 68, 0.3))',
      surface: 'linear-gradient(to bottom, #ef4444 0%, #dc2626 100%)'
    };
  };

  // Handle wobble sound effect
  React.useEffect(() => {
    const daysLeft = getDaysUntilDeadline();
    
    if (daysLeft <= 5 && daysLeft > 0) {
      // Play wobble sound when plate becomes urgent (but only once per urgency state)
      if (!hasPlayedWobbleSound) {
        setTimeout(() => playWobbleSound(), 100);
        setHasPlayedWobbleSound(true);
      }
    } else {
      // Reset wobble sound flag when not urgent
      if (hasPlayedWobbleSound) {
        setHasPlayedWobbleSound(false);
      }
    }
  }, [getDaysUntilDeadline(), plate.id, hasPlayedWobbleSound, playWobbleSound]);

  const getUrgencyIndicator = () => {
    const daysLeft = getDaysUntilDeadline();
    if (daysLeft <= 0) return '🔥 OVERDUE';
    if (daysLeft <= 1) return '🚨 TODAY';
    if (daysLeft <= 2) return '⚠️ URGENT';
    if (daysLeft <= 5) return '⏰ Soon';
    return `📅 ${daysLeft}d`;
  };

  const plateColors = getPlateColor();
  return (
    <div className="plate-container">
      {/* Spinning Plate - Side View */}
      <div className="plate-spinner-wrapper">
        <div 
          className={`plate-side-view ${getPlateAnimation()}`}
          style={{
            background: plateColors.main,
            borderRadius: '45px / 10px'
          }}
          onClick={handleComplete}
        >
          {/* Plate edge (what we see from the side) */}
          <div 
            className="plate-edge"
          >
            <div 
              className="plate-rim"
              style={{
                background: plateColors.rim,
                borderRadius: '45px / 3px'
              }}
            ></div>
            <div 
              className="plate-surface"
              style={{
                background: plateColors.surface,
                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.4), inset 0 -1px 1px rgba(0, 0, 0, 0.1)',
                borderRadius: '43px / 8px'
              }}
            ></div>
          </div>
          
          {/* Wobble intensity indicator */}
          <div className="wobble-lines">
            <div className="wobble-line wobble-line-1"></div>
            <div className="wobble-line wobble-line-2"></div>
            <div className="wobble-line wobble-line-3"></div>
          </div>
        </div>
        
        {/* Pole */}
        <div className="plate-pole"></div>
        
        {/* Base */}
        <div className="plate-base"></div>
      </div>
      
      {/* Plate Title and Urgency */}
      <div className="plate-title" style={{
        color: (() => {
          const daysLeft = getDaysUntilDeadline();
          if (daysLeft <= 0) return '#7f1d1d';
          if (daysLeft <= 2) return '#dc2626';
          if (daysLeft <= 5) return '#d97706';
          return plate.consequence <= 3 ? '#16a34a' : plate.consequence <= 6 ? '#ca8a04' : '#dc2626';
        })()
      }}>
        {plate.title}
      </div>
      
      <div className="urgency-indicator-container">
        {isEditingDeadline ? (
          <div className="deadline-editor">
            <input
              type="date"
              value={tempDeadline}
              onChange={(e) => setTempDeadline(e.target.value)}
              onKeyDown={handleKeyPress}
              className="deadline-input"
              autoFocus
            />
            <div className="deadline-actions">
              <button
                onClick={handleDeadlineSubmit}
                className="deadline-button deadline-save"
              >
                ✓
              </button>
              <button
                onClick={handleDeadlineCancel}
                className="deadline-button deadline-cancel"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div 
            className={`urgency-indicator ${getDaysUntilDeadline() > 0 ? 'editable' : ''}`}
            onClick={handleDeadlineClick}
            title={getDaysUntilDeadline() > 0 ? 'Click to edit deadline' : 'Cannot edit overdue deadline'}
          >
            {getUrgencyIndicator()}
            {getDaysUntilDeadline() > 0 && (
              <span className="edit-icon">✏️</span>
            )}
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="plate-actions">
        <button
          onClick={handleComplete}
          className="plate-button plate-button-done"
        >
          Done
        </button>
        <button
          onClick={handleSmash}
          className="plate-button plate-button-smash"
        >
          Smash
        </button>
      </div>
    </div>
  );
};
