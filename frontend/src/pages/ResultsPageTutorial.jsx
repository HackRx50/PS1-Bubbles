import React, { useState, useEffect } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HelpCircle } from 'lucide-react';

const ResultsPageTutorial = () => {
  const [driverObj] = useState(() => 
    driver({
      showProgress: true,
      steps: [
        {
          element: '#success-message',
          popover: {
            title: 'Success Message',
            description: 'This indicates that your invoice has been successfully processed.',
            position: 'bottom'
          }
        },
        {
          element: '#download-button',
          popover: {
            title: 'Download Excel',
            description: 'Click here to download the processed invoice data as an Excel file.',
            position: 'top'
          }
        },
        {
          element: '#save-button',
          popover: {
            title: 'Save to Account',
            description: 'Click here to save the processed invoice data to your account for future reference.',
            position: 'top'
          }
        }
      ]
    })
  );

  useEffect(() => {
    return () => {
      driverObj.destroy();
    };
  }, [driverObj]);

  const startTour = () => {
    driverObj.drive();
  };

  return (
    <button
      onClick={startTour}
      className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      aria-label="Start Tutorial"
    >
      <HelpCircle size={24} />
    </button>
  );
};

export default ResultsPageTutorial;