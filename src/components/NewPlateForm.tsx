import React, { useState } from 'react';
import { CONSEQUENCE_LABELS } from '../data/constants';

interface NewPlateFormProps {
  onAddPlate: (title: string, deadline: string, consequence: number) => boolean;
  onClose: () => void;
}

export const NewPlateForm: React.FC<NewPlateFormProps> = ({ onAddPlate, onClose }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [consequence, setConsequence] = useState(1);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && deadline) {
      const success = onAddPlate(title.trim(), deadline, consequence);
      if (success) {
        onClose();
      } else {
        alert('Maximum plates reached for your plan!');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-4 bg-orange-500 rounded-full" />
        </div>
        
        <h2 className="text-xl font-bold text-center mb-6">New Plate?</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Deadline:
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Title (9 letter max):
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 9))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter title..."
              maxLength={9}
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              {title.length}/9 characters
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Consequence (1 - 9):
            </label>
            <select
              value={consequence}
              onChange={(e) => setConsequence(Number(e.target.value))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {CONSEQUENCE_LABELS.map((label, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}) {label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add Plate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
