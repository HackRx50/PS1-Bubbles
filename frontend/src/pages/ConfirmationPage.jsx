import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, RefreshCw } from 'lucide-react';
import ConfirmationPageTutorial from './ConfirmationPageTutorial.jsx';
// import { Upload, ArrowRight, RefreshCw } from 'lucide-react';
import axios from 'axios';

export const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentType, setDocumentType] = useState('');

  // Assume the file object is passed through location state
  const file = location.state?.file;

  const handleReupload = () => {
    navigate('/');
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    if (rows) formData.append('rows', rows);
    if (columns) formData.append('columns', columns);

    try {
      const response = await axios.post('http://127.0.0.1:5000/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob' // Important for receiving binary data
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      // Create a download URL for the Excel file
      const downloadUrl = window.URL.createObjectURL(blob);

      // Navigate to the ResultsPage with the download URL
      navigate('/results', { state: { downloadUrl ,file} });

    } catch (error) {
      console.error('Error processing file:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  if (!file) {
    navigate('/');
    return null;
  }

  return (
    <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <ConfirmationPageTutorial />
      <div className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Confirm Invoice Upload</h2>
        <div className="mb-8">
          <img 
            id="uploaded-image"
            src={URL.createObjectURL(file)} 
            alt="Uploaded Invoice" 
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="rows" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Rows (optional)
            </label>
            <input
              type="number"
              id="rows"
              value={rows}
              onChange={(e) => setRows(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of rows"
            />
          </div>
          <div>
            <label htmlFor="columns" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Columns (optional)
            </label>
            <input
              type="number"
              id="columns"
              value={columns}
              onChange={(e) => setColumns(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of columns"
            />
          </div>
        </div>
        <div className="mb-8">
          <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-2">
            Document Type (optional)
          </label>
          <input
            type="text"
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="E.g., Sales Invoice, Purchase Order, Expense Report"
          />
        </div>
        <div className="flex space-x-4">
          <button
            id="reupload-button"
            onClick={handleReupload}
            className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={isLoading}
          >
            <RefreshCw className="mr-2" size={20} />
            Reupload
          </button>
          <button
            id="process-button"
            onClick={handleProcess}
            className="flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Process Invoice'}
            {!isLoading && <ArrowRight className="ml-2" size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};