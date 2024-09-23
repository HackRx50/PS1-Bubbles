import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Save, CheckCircle } from 'lucide-react';

export const ResultsPage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const handleDownload = () => {
    console.log('Downloading Excel file');
  };

  const handleSave = () => {
    console.log('Saving invoice data');
    setIsSaved(true);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 md:p-12">
        <div className="flex items-center mb-8">
          <CheckCircle size={48} className="text-green-500 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Invoice Processed Successfully</h2>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Great news! Your invoice has been successfully processed. You can now download the Excel sheet or save it to your account for future reference.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            <Download className="mr-2" size={24} />
            Download Excel
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white transition-colors duration-300 ${
              isSaved
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {isSaved ? <CheckCircle className="mr-2" size={24} /> : <Save className="mr-2" size={24} />}
            {isSaved ? 'Saved to Account' : 'Save to Account'}
          </button>
        </div>
      </div>
    </div>
  );
};