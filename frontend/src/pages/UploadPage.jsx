import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowRight, Eye } from 'lucide-react';
import TourGuide from '../pages/TourGuide.jsx';

// Define themes for different types of color blindness
const themes = {
  default: {
    background: 'bg-white',
    text: 'text-gray-800',
    button: 'bg-blue-600 text-white hover:bg-blue-700',
    uploadArea: 'hover:bg-gray-100 hover:border-blue-300',
  },
  redGreen: {
    background: 'bg-gray-100',
    text: 'text-gray-900',
    button: 'bg-orange-500 text-white hover:bg-orange-600',
    uploadArea: 'hover:bg-orange-100 hover:border-orange-400',
  },
  blueYellow: {
    background: 'bg-gray-800',
    text: 'text-yellow-200',
    button: 'bg-green-600 text-white hover:bg-green-700',
    uploadArea: 'hover:bg-green-100 hover:border-green-400',
  },
  achromatopsia: {
    background: 'bg-black',
    text: 'text-white',
    button: 'bg-white text-black hover:bg-gray-300',
    uploadArea: 'hover:bg-gray-900 hover:border-gray-500',
  }
};

export const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [theme, setTheme] = useState('default');
  const navigate = useNavigate();

  const handleThemeChange = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

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
    <div className={`max-w-4xl mx-auto ${themes[theme].background} rounded-2xl shadow-xl overflow-hidden relative`}>
      <div className="relative p-4">
        <TourGuide />
        <button
          onClick={handleThemeChange}
          className="absolute top-4 right-16 bg-blue-500 p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-10 h-10 flex items-center justify-center"
          title="Change Theme"
        >
          <Eye size={24} className="text-white" />
        </button>
      </div>

      <div className="md:flex">
        <div className={`md:flex-shrink-0 bg-gradient-to-br from-blue-400 to-indigo-500 p-12 flex items-center justify-center`}>
          <Upload size={120} className="text-white" />
        </div>
        <div className="p-8 md:p-12">
          <h2 className={`text-3xl font-bold ${themes[theme].text} mb-4`}>Upload Your Invoice</h2>
          <p className={`${themes[theme].text} mb-8`}>Upload your invoice image or PDF, and we'll process it into a neat Excel sheet for you.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label className={`flex flex-col w-full h-32 border-4 border-dashed ${themes[theme].uploadArea} group upload-area`}>
                <div className="flex flex-col items-center justify-center pt-7">
                  <Upload size={40} className="text-blue-400 group-hover:text-blue-600" />
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-blue-600">
                    {file ? file.name : "Attach your file (Image or PDF)"}
                  </p>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
              </label>
            </div>
            <button
              type="submit"
              className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium ${themes[theme].button} upload-button`}
            >
              Next
              <ArrowRight className="ml-2" size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};