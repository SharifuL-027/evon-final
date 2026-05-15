import React, { useState } from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Main classes for glassmorphism effect: bg-white/70, backdrop-blur-md, border-white/20
    <nav className="fixed w-full z-50 top-0 left-0 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-gray-900 tracking-widest">
              EVON
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-800 hover:text-blue-600 font-semibold transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-blue-600 font-semibold transition">
              Products
            </Link>
            {/* Demo Order Page / Checkout */}
            <Link to="/checkout/1" className="text-gray-800 hover:text-blue-600 font-semibold transition">
              Order Now
            </Link>
            
            {/* Admin Dashboard Button */}
            <Link to="/admin" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition shadow-md">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-800 font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md">
              Home
            </Link>
            <Link to="/products" className="block px-3 py-2 text-gray-800 font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md">
              Products
            </Link>
            <Link to="/checkout/1" className="block px-3 py-2 text-gray-800 font-medium hover:text-blue-600 hover:bg-gray-50 rounded-md">
              Order Now
            </Link>
            <Link to="/admin" className="block px-3 py-2 text-blue-600 font-bold hover:bg-gray-50 rounded-md">
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;