import React, { useState, useEffect } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HelpCircle } from 'lucide-react';

const ConfirmationPageTutorial = () => {
  const [driverObj] = useState(() => 
    driver({
      showProgress: true,
      steps: [
        {
          element: '#uploaded-image',
          popover: {
            title: 'Uploaded Invoice',
            description: 'This is the invoice you just uploaded. Make sure all details are visible and clear.',
            position: 'bottom'
          }
        },
        {
          element: '#rows',
          popover: {
            title: 'Number of Rows',
            description: 'Optionally, you can specify the number of rows in your invoice table for more accurate processing.',
            position: 'right'
          }
        },
        {
          element: '#columns',
          popover: {
            title: 'Number of Columns',
            description: 'Optionally, you can specify the number of columns in your invoice table for more accurate processing.',
            position: 'left'
          }
        },
        {
          element: '#reupload-button',
          popover: {
            title: 'Reupload Button',
            description: 'Click here if you want to upload a different invoice.',
            position: 'top'
          }
        },
        {
          element: '#process-button',
          popover: {
            title: 'Process Invoice Button',
            description: 'Once you are satisfied with the uploaded invoice and optional settings, click here to process it.',
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

export default ConfirmationPageTutorial;