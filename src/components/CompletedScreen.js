// src/components/CompletedScreen.js
import React from 'react';
import { FaMicrophone } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './CompletedScreen.css';


const CompletedScreen = () => {
  return (
    <div className="details-screen">
      <h1 className="logo">Documedic</h1>
      <div className="content-wrapper">
        <div className="document-preview">
        
            <img src="" alt="Uploaded document preview" />
         
          
          <div className="button-group">
            <button className="icon-button">?</button>
            <button className="icon-button">
              <FaMicrophone />
            </button>
          </div>
        </div>
        <div className="buttons-form">
          <button className="skip-button" onClick="">Download</button>
        </div>
      </div>
    </div>
  );
};

export default CompletedScreen;