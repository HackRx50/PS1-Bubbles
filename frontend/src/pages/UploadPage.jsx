import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowRight } from 'lucide-react';

export const UploadPage = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    console.log('File uploaded:', file.name);
    navigate('/confirm', { state: { file } });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0 bg-gradient-to-br from-blue-400 to-indigo-500 p-12 flex items-center justify-center">
          <Upload size={120} className="text-white" />
        </div>
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Upload Your Invoice</h2>
          <p className="text-gray-600 mb-8">Simply upload your invoice image, and we'll process it into a neat Excel sheet for you.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-blue-300 group">
                <div className="flex flex-col items-center justify-center pt-7">
                  <Upload size={40} className="text-blue-400 group-hover:text-blue-600" />
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-blue-600">
                    {file ? file.name : "Attach your file"}
                  </p>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Upload Invoice
              <ArrowRight className="ml-2" size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};