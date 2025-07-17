import { useState, useEffect } from 'react';
import type { Plate, User } from '../types';

const STORAGE_KEY = 'nine-plates-data';

export const usePlates = () => {
  const [plates, setPlates] = useState<Plate[]>([]);
  const [user, setUser] = useState<User>({
    plan: 'free',
    maxPlates: 9,
    platesSmashed: 0,
    platesSaved: 0,
    consequenceTally: 0
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.plates) setPlates(data.plates);
        if (data.user) setUser(prev => ({ ...prev, ...data.user }));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ plates, user }));
  }, [plates, user]);

  const addPlate = (title: string, deadline: string, consequence: number) => {
    if (plates.length >= user.maxPlates) return false;
    
    console.log('Adding plate:', { title, deadline, consequence })
    
    const newPlate: Plate = {
      id: Date.now().toString(),
      title: title.slice(0, 9), // Max 9 characters
      deadline,
      consequence,
      status: 'spinning',
      createdAt: new Date()
    };
    
    setPlates(prev => [...prev, newPlate]);
    return true;
  };

  const completePlate = (id: string) => {
    console.log('Completing plate:', id)
    setPlates(prev => prev.filter(plate => plate.id !== id));
    setUser(prev => ({
      ...prev,
      platesSaved: prev.platesSaved + 1
    }));
  };

  const smashPlate = (id: string) => {
    console.log('Smashing plate:', id)
    const plate = plates.find(p => p.id === id);
    if (plate) {
      setUser(prev => ({
        ...prev,
        platesSmashed: prev.platesSmashed + 1,
        consequenceTally: prev.consequenceTally + plate.consequence
      }));
    }
    setPlates(prev => prev.filter(plate => plate.id !== id));
  };

  const updatePlateStatus = (id: string, status: Plate['status']) => {
    setPlates(prev => prev.map(plate => 
      plate.id === id ? { ...plate, status } : plate
    ));
  };

  const updatePlateDeadline = (id: string, newDeadline: string) => {
    console.log('Updating plate deadline:', id, newDeadline);
    setPlates(prev => prev.map(plate => 
      plate.id === id ? { ...plate, deadline: newDeadline } : plate
    ));
  };

  return {
    plates,
    user,
    addPlate,
    completePlate,
    smashPlate,
    updatePlateStatus,
    updatePlateDeadline
  };
};
