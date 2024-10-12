import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UploadPage } from './src/pages/UploadPage';
import { ConfirmationPage } from './src/pages/ConfirmationPage';
import { ResultsPage } from './src/pages/ResultsPage';
import { SavedInvoicesPage } from './src/pages/SavedInvoicesPage';
import { Navbar } from './src/components/Navbar';
import "driver.js/dist/driver.css";
import { ComparePage } from './src/pages/ComparePage';
import ChatInterface from './src/pages/ChatInterface';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/confirm" element={<ConfirmationPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/saved" element={<SavedInvoicesPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/chat" element={<ChatInterface />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;