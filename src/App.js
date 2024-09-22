import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState('');

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const response = await fetch('https://your-backend-url.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedJson)
      });
      const result = await response.json();
      setApiResponse(result);
      setFilteredResponse('');
    } catch (error) {
      alert('Invalid JSON input. Please provide a valid JSON.');
    }
  };

  const handleFilterChange = (selected) => {
    setSelectedFilters(selected);
    if (apiResponse) {
      let result = '';
      selected.forEach(filter => {
        result += `${filter.label}: ${apiResponse[filter.value].join(', ')}\n`;
      });
      setFilteredResponse(result);
    }
  };

  return (
    <div className="App">
      <h1>RA2111004010123</h1>
      <h2>Enter JSON Input:</h2>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        rows={5}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {apiResponse && (
        <>
          <h2>Multi Filter</h2>
          <Select
            isMulti
            options={options}
            onChange={handleFilterChange}
          />
          <div className="response">
            <h3>Filtered Response</h3>
            <pre>{filteredResponse}</pre>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
