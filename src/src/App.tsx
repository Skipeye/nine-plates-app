import { useState } from 'react'
import { usePlates } from './hooks/usePlates'
import { useDarkMode } from './hooks/useDarkMode'
import { Header } from './components/Header'
import { PlatesGrid } from './components/PlatesGrid'
import { LifeEfficiency } from './components/LifeEfficiency'
import { NewPlateForm } from './components/NewPlateForm'
import { UpgradeModal } from './components/UpgradeModal'
import './App.css'

function App() {
  const { plates, user, addPlate, completePlate, smashPlate, updatePlateDeadline } = usePlates()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [showNewPlateForm, setShowNewPlateForm] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  console.log('App render - plates:', plates.length, 'user:', user.plan)

  return (
    <div className="app-container">
      <Header 
        user={user} 
        onUpgrade={() => setShowUpgradeModal(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      
      <div className="main-content">
        <PlatesGrid
          plates={plates}
          maxPlates={user.maxPlates}
          onComplete={completePlate}
          onSmash={smashPlate}
          onUpdateDeadline={updatePlateDeadline}
          onAddNew={() => setShowNewPlateForm(true)}
        />
        
        <LifeEfficiency user={user} />
      </div>
      
      {showNewPlateForm && (
        <NewPlateForm
          onAddPlate={addPlate}
          onClose={() => setShowNewPlateForm(false)}
        />
      )}
      
      {showUpgradeModal && (
        <UpgradeModal
          onClose={() => setShowUpgradeModal(false)}
          onSelectPlan={(plan) => {
            console.log('Plan selected:', plan)
            // In a real app, this would handle payment processing
            alert(`Selected ${plan} plan! Payment integration would go here.`)
            setShowUpgradeModal(false)
          }}
        />
      )}
    </div>
  )
}

export default App
