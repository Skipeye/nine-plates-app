import { useState } from 'react'
import { usePlates } from './hooks/usePlates'
import { useDarkMode } from './hooks/useDarkMode'
import { Header } from './components/Header'
import { PlatesGrid } from './components/PlatesGrid'
import { NewPlateForm } from './components/NewPlateForm'
import './App.css'

function App() {
  const { plates, user, addPlate, completePlate, smashPlate, updatePlateDeadline } = usePlates()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [showNewPlateForm, setShowNewPlateForm] = useState(false)

  console.log('App render - plates:', plates.length, 'user:', user.plan)

  return (
    <div className="app-container">
      <Header 
        user={user} 
        onUpgrade={() => console.log('Upgrade clicked')}
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
      </div>
      
      {showNewPlateForm && (
        <NewPlateForm
          onAddPlate={addPlate}
          onClose={() => setShowNewPlateForm(false)}
        />
      )}
    </div>
  )
}

export default App

