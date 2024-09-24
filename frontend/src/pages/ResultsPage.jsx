import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Download, Save, CheckCircle,ArrowLeft,Columns } from 'lucide-react';
import ResultsPageTutorial from './ResultsPageTutorial.jsx';
export const ResultsPage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const downloadUrl = location.state?.downloadUrl;
  const file = location.state?.file; // Get the uploaded file from location state

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'processed_invoice.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const handleBackToUpload = () => {
    navigate('/');
  };

  const handleSave = () => {
    setIsSaved(true);
  }
  const handleCompare = () => {
    // Navigate to the compare page, passing the file and downloadUrl
    navigate('/compare', { state: { file, downloadUrl } });
  };

  if (!downloadUrl) {
    navigate('/');
    return null;
  }

  return (
    <div className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <ResultsPageTutorial />
      <div className="p-8 md:p-12">
        <div id="success-message" className="flex items-center mb-8">
          <CheckCircle size={48} className="text-green-500 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Invoice Processed Successfully</h2>
        </div>
        <p className="text-gray-600 mb-8 text-lg">
          Great news! Your invoice has been successfully processed. You can now download the Excel sheet, upload another invoice, or compare the original image with the processed data.
        </p>
        <div className="flex space-x-4">
          <button
          id="upload-button"
            onClick={handleBackToUpload}
            className="flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <ArrowLeft className="mr-2" size={24} />
            Upload Another
          </button>
          <button
            id="download-button"
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Download Excel
            <Download className="ml-2" size={24} />
          </button>
          <button
          id="compare-button"
            onClick={handleCompare}
            className="flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Compare
            <Columns className="ml-2" size={24} />
          </button>
          <button
      id="save-button"
      onClick={handleSave}
      className="flex items-center justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {isSaved ? (
        <>
          Saved
          <CheckCircle className="ml-2" size={24} />
        </>
      ) : (
        <>
          Save
          <Save className="ml-2" size={24} />
        </>
      )}
    </button>
        </div>
      </div>
    </div>
  );
};
