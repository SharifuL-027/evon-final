import React from 'react';
import { Link } from 'react-router';

const AboutSummary = () => {
  return (
    <div className="w-full bg-slate-950 py-24 relative overflow-hidden">
      
      {/* Subtle Indigo Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
    
        
    <p className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent tracking-tight leading-tight mb-8">
  EVON
</p>
        
        <p className="text-lg poppins-extrabold text-slate-400 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
          বাংলাদেশের sneaker lovers দের জন্য EVON এনেছে স্টাইল, কমফোর্ট এবং প্রিমিয়াম quality’র অসাধারণ combination।
Trendy ও authentic sneakers-এর নতুন experience এখন EVON-এর সাথে।
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