import React from 'react';

interface UpgradeModalProps {
  onClose: () => void;
  onSelectPlan: (plan: 'business' | 'entrepreneur') => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ onClose, onSelectPlan }) => {
  const handleClose = () => {
    onClose();
  };

  const handleSelectBusiness = () => {
    onSelectPlan('business');
  };

  const handleSelectEntrepreneur = () => {
    onSelectPlan('entrepreneur');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Power up!</h2>
        
        <div className="space-y-4">
          <div className="border-2 border-gray-200 rounded-lg p-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800">9 Plates</h3>
              <p className="text-sm text-gray-600">Start up for FREE!</p>
              <div className="text-2xl font-bold text-green-600 mt-2">FREE</div>
              <div className="text-xs text-gray-500">Current Plan</div>
            </div>
          </div>
          
          <div 
            className="border-2 border-orange-200 rounded-lg p-4 cursor-pointer hover:border-orange-400 transition-colors"
            onClick={handleSelectBusiness}
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800">18 Plates</h3>
              <p className="text-sm text-gray-600">Business Owner</p>
              <div className="text-2xl font-bold text-orange-600 mt-2">£1/month</div>
              <button 
                onClick={handleSelectBusiness}
                className="mt-2 px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Select Plan
              </button>
            </div>
          </div>
          
          <div 
            className="border-2 border-purple-200 rounded-lg p-4 cursor-pointer hover:border-purple-400 transition-colors"
            onClick={handleSelectEntrepreneur}
          >
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800">27 Plates</h3>
              <p className="text-sm text-gray-600">Entrepreneur</p>
              <div className="text-2xl font-bold text-purple-600 mt-2">£3/month</div>
              <button 
                onClick={handleSelectEntrepreneur}
                className="mt-2 px-4 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
              >
                Select Plan
              </button>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleClose}
          className="w-full mt-6 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
