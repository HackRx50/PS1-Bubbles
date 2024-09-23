import React from 'react';
import { FaMicrophone } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './DetailsScreen.css';

const DetailsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { selectedFile } = location.state || {}; // Get the selected file from the location state

  // Check if the uploaded file is an image
  const isImageFile = selectedFile && selectedFile.type.startsWith('image');

  const handleSkipClick = () => {
    // Navigate to the CompletedScreen
    navigate('/completed');
  };

  return (
    <div className="details-screen">
      <h1 className="logo">Documedic</h1>
      <div className="content-wrapper">
        <div className="document-preview">
          {isImageFile ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Uploaded document preview" />
          ) : (
            <p>No preview available for this file type</p>
          )}
          
          <div className="button-group">
            <button className="icon-button">?</button>
            <button className="icon-button">
              <FaMicrophone />
            </button>
          </div>
        </div>
        <div className="details-form">
          <input type="text" placeholder="no. of rows" />
          <input type="text" placeholder="no. of columns" />
          <input type="text" placeholder="type of document" />
          <p className="helper-text">The above data is not mandatory however it will help in providing more accurate results</p>
          <button className="skip-button" onClick={handleSkipClick}>SKIP →</button>
        </div>
      </div>
    </div>
  );
};

export default DetailsScreen;
