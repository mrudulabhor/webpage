import React from 'react';

const Results = ({ results }) => {
  return (
    <div className="results">
      <h2>Analysis Results for {results.url}</h2>
      <div>
        <h3>Accessibility Score</h3>
        <p>{results.accessibilityScore}</p>
      </div>
      <div>
        <h3>SEO Score</h3>
        <p>{results.seoScore}</p>
      </div>
      <div>
        <h3>AI Feedback</h3>
        <p>{results.aiFeedback}</p>
      </div>
    </div>
  );
};

export default Results;
