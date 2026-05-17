import React, { useState, useEffect } from 'react';
import { Link } from 'react-router'; 

const Navbar = () => {
  // State for mobile menu
  const [isOpen, setIsOpen] = useState(false);
  
  // States for hiding/showing the navbar on scroll
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // If scrolling DOWN, hide the navbar. If scrolling UP, show it.
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsVisible(false); // Hide
        } else {
          setIsVisible(true);  // Show
        }
        // Remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    // Cleanup function
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <nav 
      // CHANGED: border-white/10 is now border-slate-800 for a seamless blend
      className={`fixed w-full z-50 top-0 left-0 border-b border-slate-800 shadow-xl transition-transform duration-300 ease-in-out bg-slate-950/70 backdrop-blur-lg
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center gap-3">
            {/* CHANGED: border-white/20 is now border-slate-700 */}
            <Link to="/" className="text-3xl font-extrabold text-white tracking-[0.15em] border-y-2 border-slate-700 py-0.5 hover:border-indigo-500 transition-colors">
              EVON
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            <Link to="/" className="text-indigo-400 font-semibold tracking-wide flex items-center gap-1">Home</Link>
            <Link to="/products" className="text-slate-300 hover:text-indigo-400 font-semibold tracking-wide transition-colors">Shop</Link>
            <Link to="/blog" className="text-slate-300 hover:text-indigo-400 font-semibold tracking-wide transition-colors">Blog</Link>
            <Link to="/about" className="text-slate-300 hover:text-indigo-400 font-semibold tracking-wide transition-colors">About</Link>
          </div>

          {/* Search, Cart, & Login Area */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center bg-slate-900/50 border border-slate-700/50 rounded-full overflow-hidden focus-within:border-indigo-500 transition-all">
              <input type="text" placeholder="Search shoes..." className="bg-transparent text-slate-200 px-5 py-2.5 focus:outline-none w-56 text-sm placeholder-slate-500" />
              <button className="bg-indigo-600 hover:bg-indigo-500 px-5 py-3 transition-colors flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </div>

            <Link to="/checkout/1" className="relative bg-indigo-600 hover:bg-indigo-500 p-3 rounded-full transition-all shadow-[0_0_10px_rgba(99,102,241,0.3)]">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-slate-950">2</span>
            </Link>

            {/* ADMIN LOGIN ICON */}
            <Link to="/admin/login" className="text-slate-300 hover:text-indigo-400 transition-colors p-2" title="Admin Login">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 absolute w-full shadow-2xl">
          <div className="px-4 py-6 space-y-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="block text-indigo-400 font-semibold px-2">Home</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white font-semibold px-2">Shop</Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white font-semibold px-2">Blog</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block text-slate-300 hover:text-white font-semibold px-2">About</Link>
            
            {/* MOBILE ADMIN LOGIN LINK */}
            <div className="pt-4 mt-2 border-t border-slate-800">
              <Link to="/admin/login" onClick={() => setIsOpen(false)} className="block text-slate-400 hover:text-indigo-400 font-semibold px-2">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;