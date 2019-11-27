import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
  return (
    <div>
      <h1>My Weather App</h1>
      <Weather/>
    </div>
  );
}

export default App;
