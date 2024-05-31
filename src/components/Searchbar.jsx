import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchbarContext } from './SearchbarProvider.jsx'
import { displayTemporaryMessage } from "../utils/tempMessage.cjs"
import "../index.css"

const Searchbar = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [error, setError] = useState("");
  const { filters, setFilters, searchQuery, setSearchQuery } = useContext(SearchbarContext)
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      displayTemporaryMessage('Please enter a search query', setError)
      return;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      type: selectedFilter,
      query: searchQuery
    }));
    setError('');
    setSearchQuery('');
    navigate('/freelancers');
  };


  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setError('');
  };
  
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center border searchbar-bg searchbar-border-color rounded-lg overflow-hidden shadow-lg">
        <select
          name="type"
          value={selectedFilter}
          onChange={handleFilterChange}
          className="p-2 text-sm font-medium searchbar-text-color transition duration-300 view-button view-button:hover hover:cursor-pointer appearance-none"
        >
          <option value="all">All</option>
          <option value="freelancerName">Freelancer</option>
          <option value="serviceName">Service</option>
          <option value="tag">Tags</option>
        </select>
        <input
          name="query"
          placeholder="Enter Something..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 text-sm font-medium searchbar-text-color view-button transition duration-300 placeholder-[#3C2F16] focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          className="p-2 text-sm font-medium searchbar-text-color transition duration-300 view-button focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Search
        </button>
      </div>
      {error && <div className="error-text mt-2 text-lg">{error}</div>}
    </div>

  )
}

export default Searchbar