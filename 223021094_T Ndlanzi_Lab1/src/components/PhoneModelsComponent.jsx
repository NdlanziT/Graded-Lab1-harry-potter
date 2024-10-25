
import React, { useState, useEffect } from 'react';

function PhoneModelsComponent() {
  const [phoneModels, setPhoneModels] = useState([]);
  const [filteredPhoneModels, setFilteredPhoneModels] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: '',
    features: ''
  });

  useEffect(() => {
    fetch('https://www.postman.com/blue-flare7250/workspace/kyaw-s/documentation/1106401-e8233ba8-69ee-4820-9590-4b8ac9d0f477')
      .then(response => response.json())
      .then(data => {
        setPhoneModels(data);
        setFilteredPhoneModels(data);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    let filtered = phoneModels.filter(model => 
      (filters.brand ? model.brand.includes(filters.brand) : true) &&
      (filters.priceRange ? model.price <= filters.priceRange : true) &&
      (filters.features ? model.features.includes(filters.features) : true)
    );
    setFilteredPhoneModels(filtered);
  }, [filters, phoneModels]);

  return (
    <div>
      <h2>Phone Models</h2>
      <div>
        <label>
          Brand:
          <input 
            type="text" 
            name="brand" 
            value={filters.brand} 
            onChange={handleFilterChange} 
          />
        </label>
        <label>
          Price Range:
          <input 
            type="number" 
            name="priceRange" 
            value={filters.priceRange} 
            onChange={handleFilterChange} 
          />
        </label>
        <label>
          Features:
          <input 
            type="text" 
            name="features" 
            value={filters.features} 
            onChange={handleFilterChange} 
          />
        </label>
      </div>
      <div>
        {filteredPhoneModels.map(model => (
          <div key={model.name}>
            <h3>{model.name}</h3>
            <p>{model.brand}</p>
            <p>{model.price}</p>
            <p>{model.features.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhoneModelsComponent;
