import React, { useState, useEffect } from 'react';
import CharacterDetails from './CharacterDetails.jsx';
import './CharactersComponent.css';

const CharactersComponent = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    alive: '',
    species: ''
  });

  useEffect(() => {
    fetch('https://hp-api.onrender.com/api/characters')
      .then(response => response.json())
      .then(data => {
        setCharacters(data);
        setFilteredCharacters(data);
      })
      .catch(error => console.error('Error fetching characters:', error));
  }, []);

  useEffect(() => {
    let updatedCharacters = characters;

    if (searchTerm) {
      updatedCharacters = updatedCharacters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.gender) {
      updatedCharacters = updatedCharacters.filter(character =>
        character.gender === filters.gender
      );
    }

    if (filters.alive) {
      updatedCharacters = updatedCharacters.filter(character =>
        character.alive === (filters.alive === 'true')
      );
    }

    if (filters.species) {
      updatedCharacters = updatedCharacters.filter(character =>
        character.species === filters.species
      );
    }

    setFilteredCharacters(updatedCharacters);
  }, [searchTerm, filters, characters]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="characters-component">
      <h1>Harry Potter Characters</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select name="alive" value={filters.alive} onChange={handleFilterChange}>
          <option value="">All Statuses</option>
          <option value="true">Alive</option>
          <option value="false">Deceased</option>
        </select>
        <select name="species" value={filters.species} onChange={handleFilterChange}>
          <option value="">All Species</option>
          <option value="human">Human</option>
          <option value="half-giant">Half-Giant</option>
          <option value="werewolf">Werewolf</option>
          <option value="cat">Cat</option>
          <option value="goblin">Goblin</option>
          <option value="owl">Owl</option>
          {/* Add more species as needed */}
        </select>
      </div>
      <div className="characters-list">
        {filteredCharacters.map(character => (
          <div
            key={character.name}
            className="character-card"
            onClick={() => setSelectedCharacter(character)}
          >
            {character.image && <img className="pics" src={character.image} alt={character.name} />}
            <h2>{character.name}</h2>
            <p>DOB: {character.dateOfBirth}</p>
            <p>Species: {character.species}</p>
          </div>
        ))}
      </div>
      {selectedCharacter && (
        <CharacterDetails
          character={selectedCharacter}
          onBack={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default CharactersComponent;