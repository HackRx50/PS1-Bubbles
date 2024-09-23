// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadScreen from './components/UploadScreen';
import DetailsScreen from './components/DetailsScreen';
import CompletedScreen from './components/CompletedScreen'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UploadScreen />} />
          <Route path="/details" element={<DetailsScreen />} />
          <Route path="/completed" element={<CompletedScreen />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
