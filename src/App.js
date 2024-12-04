/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './Page/InputF'; // Make sure this is the correct path for InputForm
import Results from './Page/Results';     // Make sure this is the correct path for Results

const App = () => {
  // State variables to hold the URL, loading state, and results
  const [url, setUrl] = useState(''); // Holds the URL input by the user
  const [loading, setLoading] = useState(false); // Track loading state
  const [results, setResults] = useState(null); // Hold the results from the backend

  // Function to handle the URL form submission
  const handleUrlSubmit = async (inputUrl) => {
    setUrl(inputUrl); // Update the state with the submitted URL
    setLoading(true);  // Set loading to true while we fetch the data

    try {
      // Call the backend API to analyze the URL
      //const response = await axios.post('/api/analyze', { url: inputUrl });
      const response = await axios.post('http://localhost:5000/api/analyze', { url: inputUrl });

      setResults(response.data); // Set the results once the API call is successful
    } catch (error) {
      console.error('Error analyzing the URL:', error);
    } finally {
      setLoading(false); // Set loading to false once the analysis is complete
    }
  };

  return (
    <div className="App">
      <h1>Webpage Quality Analyzer</h1>
      
      {/* InputForm component to handle URL submission */}
      <InputForm onSubmit={handleUrlSubmit} />
      
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : (
        results && <Results results={results} /> // Display results if available
      )}

      {/* Optionally display the URL being analyzed */}
      <p>{url && `Analyzing: ${url}`}</p>
    </div>
  );
};

export default App;
