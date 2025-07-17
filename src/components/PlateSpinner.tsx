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
      // Play wobble sound when plate becomes urgent (but only once per urgency state)
      if (!hasPlayedWobbleSound) {
        setTimeout(() => playWobbleSound(), 100);
        setHasPlayedWobbleSound(true);
      }
      return 'plate-wobbling';
    } else {
      // Reset wobble sound flag when not urgent
      if (hasPlayedWobbleSound) {
        setHasPlayedWobbleSound(false);
      }
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

  const getUrgencyIndicator = () => {
    const daysLeft = getDaysUntilDeadline();
    if (daysLeft <= 0) return '🔥 OVERDUE';
    if (daysLeft <= 1) return '🚨 TODAY';
    if (daysLeft <= 2) return '
