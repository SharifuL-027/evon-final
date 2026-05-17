import React from 'react';
import { Link } from 'react-router';

const AboutSummary = () => {
  return (
    <div className="w-full bg-slate-950 py-24 relative overflow-hidden">
      
      {/* Subtle Indigo Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <h2 className="text-sm font-black text-indigo-500 uppercase tracking-[0.3em] mb-6">
          The EVON Standard
        </h2>
        
        <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-8">
          Redefining footwear with uncompromising quality, bold designs, and a commitment to everyday comfort.
        </p>
        
        <p className="text-lg text-slate-400 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
          Founded on the belief that every step matters, we source the finest materials globally to craft shoes that empower your journey. Don't just walk—make an impact.
        </p>
        
        <Link 
          to="/about" 
          className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 rounded-full font-extrabold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1"
        >
          Discover Our Story
        </Link>
        
      </div>
    </div>
  );
};

export default AboutSummary;