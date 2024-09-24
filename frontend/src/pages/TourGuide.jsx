import React, { useState } from 'react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { HelpCircle } from 'lucide-react';
const TourGuide = () => {
  const [driverObj] = useState(() => 
    driver({
      showProgress: true,
      steps: [
        {
          element: '.upload-area',
          popover: {
            title: 'Upload Area',
            description: 'Click here to upload your invoice file.',
            position: 'bottom'
          }
        },
        {
          element: '.upload-button',
          popover: {
            title: 'Submit Invoice',
            description: 'After selecting your file, click this button to upload your invoice.',
            position: 'top'
          }
        },
        {
          element: 'a[href="/saved"]',
          popover: {
            title: 'Saved Invoices',
            description: 'Click here to view your saved invoices.',
            position: 'bottom'
          }
        }
      ]
    })
  );

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

export default TourGuide;