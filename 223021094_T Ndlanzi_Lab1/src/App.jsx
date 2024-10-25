import React from 'react';
import CharactersComponent from './components/CharactersComponent';
import CharacterDetails from './components/CharacterDetails';
import PhoneModelsComponent from './components/PhoneModelsComponent.jsx';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <CharactersComponent />
      <CharacterDetails />
      <PhoneModelsComponent />
    </div>
    
  );
};

export default App;
