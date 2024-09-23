import React, { useState } from 'react';
import './UploadScreen.css';
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleNextClick = () => {
    // Navigate to the details page and pass the selected file
    navigate('/details', { state: { selectedFile } });
  };

  return (
    <div className="upload-screen">
      <h1 className="title">Documedic</h1>
      <div className="content">
        <div className="main-content">
          <div className="left-content">
            <h2 className="subtitle">
              Convert your medical<br />
              reports to excel sheets<br />
              ON THE GO...
            </h2>
            <div className="button-group">
              <button className="icon-button">?</button>
              <button className="icon-button">
                <FaMicrophone />
              </button>
            </div>
          </div>
          <div className="right-content">
            <div className="upload-area">
              <label htmlFor="file-upload" className="file-label">
                <span className="upload-text">
                  {selectedFile ? selectedFile.name : 'drop or upload folder/images/pdfs'}
                </span>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*, .pdf"
                onChange={handleFileUpload}
                className="file-input"
              />
            </div>
            <button className="next-button" onClick={handleNextClick}>NEXT →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadScreen;
