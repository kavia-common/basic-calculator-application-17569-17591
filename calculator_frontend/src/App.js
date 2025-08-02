import React from 'react';
import Calculator from './Calculator';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="App">
      <div className="app-container">
        <h1 className="app-title">Calculator</h1>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
