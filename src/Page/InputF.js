import React, { useState } from 'react';

const InputF = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="url" 
        value={url} 
        onChange={handleChange} 
        placeholder="Enter webpage URL" 
        required
      />
      <button type="submit">Analyze</button>
    </form>
  );
};

export default InputF;
