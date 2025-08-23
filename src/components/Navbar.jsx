// components/Navbar.jsx
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center">
          <span className="bg-blue-600 text-white rounded-lg px-2 py-1 mr-2">N</span>
          NextLead
        </h1>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Post Interview</li>
          <li className="hover:text-blue-600 transition-colors cursor-pointer">Login</li>
          <li className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer hover:bg-blue-200 transition-colors">Sign Up</li>
        </ul>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-lg">
          <ul className="space-y-3 pb-3">
            <li className="pt-2 border-t border-gray-100">Home</li>
            <li>Post Interview</li>
            <li>Login</li>
            <li className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full inline-block">Sign Up</li>
          </ul>
        </div>
      )}
    </nav>
  );
}
