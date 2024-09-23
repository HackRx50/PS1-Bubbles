import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

export const SavedInvoicesPage = () => {
  const savedInvoices = [
    { id: 1, name: 'Invoice 001', date: '2024-09-15', amount: '$1,234.56' },
    { id: 2, name: 'Invoice 002', date: '2024-09-20', amount: '$2,345.67' },
    { id: 3, name: 'Invoice 003', date: '2024-09-22', amount: '$3,456.78' },
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FileText size={36} className="text-blue-600 mr-4" />
          Saved Invoices
        </h2>
        <div className="space-y-6">
          {savedInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{invoice.name}</h3>
                  <p className="text-gray-600">Date: {invoice.date}</p>
                  <p className="text-blue-600 font-medium mt-2">{invoice.amount}</p>
                </div>
                <div className="flex space-x-4">
                  <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    <Eye size={24} />
                  </button>
                  <button className="p-2 text-green-600 hover:text-green-800 transition-colors duration-300">
                    <Download size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};