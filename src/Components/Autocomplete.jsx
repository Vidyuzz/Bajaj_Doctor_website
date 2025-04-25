import React, { useState } from "react";

const AutocompleteSearch = ({ value, onChange, doctors }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = doctors
    .filter((doc) => doc.name.toLowerCase().includes(value.toLowerCase()))
    .slice(0, 3);

  const handleSelect = (name) => {
    onChange(name);
    setShowSuggestions(false);
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        className="autocomplete-input"
        data-testid="autocomplete-input"
        placeholder="Search doctor by name..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && value && (
        <ul>
          {suggestions.map((doc) => (
            <li
              key={doc.id}
              data-testid="suggestion-item"
              className="suggestion-item"
              onClick={() => handleSelect(doc.name)}
              style={{ cursor: "pointer" }}
            >
              {doc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteSearch;
