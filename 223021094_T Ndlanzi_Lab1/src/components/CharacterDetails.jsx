import React from 'react';
import './CharactersComponent.css';

const CharacterDetails = ({ character, onBack }) => {
  if (!character) {
    return null;
  }

  return (
    <div className="character-details">
      <button className="backbtn" onClick={onBack}>Back</button>
      <h2>{character.name}</h2>
      <p><strong>Alternate Names:</strong> {character.alternate_names?.join(', ') || 'N/A'}</p>
      <p><strong>Species:</strong> {character.species || 'N/A'}</p>
      <p><strong>Gender:</strong> {character.gender || 'N/A'}</p>
      <p><strong>House:</strong> {character.house || 'N/A'}</p>
      <p><strong>Date of Birth:</strong> {character.dateOfBirth || 'N/A'}</p>
      <p><strong>Ancestry:</strong> {character.ancestry || 'N/A'}</p>
      <p><strong>Eye Colour:</strong> {character.eyeColour || 'N/A'}</p>
      <p><strong>Hair Colour:</strong> {character.hairColour || 'N/A'}</p>
      <p><strong>Wand:</strong> {character.wand ? `${character.wand.wood}, ${character.wand.core}` : 'N/A'}</p>
      <p><strong>Patronus:</strong> {character.patronus || 'N/A'}</p>
      <p><strong>Actor:</strong> {character.actor || 'N/A'}</p>
      <p><strong>Alive:</strong> {character.alive ? 'Yes' : 'No'}</p>
      {character.image && <img src={character.image} alt={character.name} />}
    </div>
  );
};

export default CharacterDetails;
