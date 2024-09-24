import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Upload, Save,MessageSquareText } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <FileText size={32} className="text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">InvoiceAI</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <NavLink to="/" icon={<Upload />} text="Upload" />
            <NavLink to="/saved" icon={<Save />} text="Saved Invoices" />
            <NavLink to ="/chat" icon={<MessageSquareText/>} text ="Chat" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }) => (
  <Link 
    to={to} 
    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
  >
    {icon}
    <span>{text}</span>
  </Link>
);