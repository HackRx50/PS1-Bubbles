import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UploadPage } from './pages/UploadPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { ResultsPage } from './pages/ResultsPage';
import { SavedInvoicesPage } from './pages/SavedInvoicesPage';
import { Navbar } from './components/Navbar';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;