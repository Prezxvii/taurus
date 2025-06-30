// src/components/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To redirect to search page
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (query.trim()) { // Only navigate if query is not empty or just whitespace
      // Redirect to the search page with the query as a URL parameter
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(''); // Clear the search bar after searching
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for songs, artists, or albums..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;