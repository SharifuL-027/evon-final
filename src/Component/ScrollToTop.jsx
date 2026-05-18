import React, { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check how far the user has scrolled
  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // The function to glide smoothly back to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // Listen for scrolling events
    window.addEventListener('scroll', toggleVisibility);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] pointer-events-none">
      <button
        onClick={scrollToTop}
        // Tailwind classes to handle the fade-in/fade-out animation and premium styling
        className={`pointer-events-auto p-4 bg-slate-950 text-white rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-indigo-600 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(79,70,229,0.4)] transition-all duration-500 group ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          className="w-6 h-6 group-hover:-translate-y-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path>
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTop;