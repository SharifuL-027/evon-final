import React from 'react';
import { Link } from 'react-router';

const Hero = () => {
  return (
    // 'pt-20' ensures the content isn't hidden behind your fixed 80px (h-20) navbar
    <div className="relative bg-slate-950 overflow-hidden pt-20 min-h-screen flex items-center">
      
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col lg:flex-row items-center w-full">
        
        {/* Left Side: Typography & Call to Action */}
        <div className="lg:w-1/2 text-center lg:text-left z-10 flex flex-col justify-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 w-max mx-auto lg:mx-0">
            <span className="text-sm font-semibold tracking-wide text-indigo-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              EVON Series 01 - Now Live
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Step Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              The Future.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 font-light">
            Experience unparalleled comfort and gravity-defying design. The new EVON Phantom series is engineered to redefine your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <Link 
              to="/products" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] flex items-center justify-center gap-3 transform hover:-translate-y-1"
            >
              Shop Collection
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
            
            <Link 
              to="/about" 
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 border border-slate-700 hover:border-slate-500 flex items-center justify-center"
            >
              Watch Video
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
            </Link>
          </div>
          
          {/* Social Proof / Stats */}
          <div className="mt-14 flex items-center justify-center lg:justify-start gap-10 text-slate-400 border-t border-slate-800/50 pt-10">
            <div>
              <p className="text-3xl font-extrabold text-white">10k+</p>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold mt-1">Pairs Sold</p>
            </div>
            <div className="w-px h-12 bg-slate-800"></div>
            <div>
              <p className="text-3xl font-extrabold text-white flex items-center gap-2">
                4.9 
                <svg className="w-6 h-6 text-yellow-500 pb-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </p>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold mt-1">Top Rated</p>
            </div>
          </div>
        </div>

        {/* Right Side: Product Image Showcase */}
        <div className="lg:w-1/2 mt-20 lg:mt-0 relative z-10 w-full">
          
          {/* Glassmorphism Card Behind the Shoe */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[110%] bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-xl -z-10 border border-white/5"></div>
          
          {/* Pro Tip for E-commerce: 
            For the best effect here, use a transparent .PNG of a shoe. 
            The '-rotate-12' class gives it that dynamic, floating "in-motion" feel.
          */}
          <div className="relative group">
            <img 
              src="/public/images/heroshow.png" 
              alt="EVON Phantom Sneaker" 
              className="w-full h-auto max-h-[600px] object-cover md:object-contain transform -rotate-12 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-in-out drop-shadow-2xl rounded-3xl"
            />
            
            {/* Floating Price Tag Badge */}
            <div className="absolute top-4 right-4 md:top-10 md:-right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">Limited Edition</p>
              <p className="text-white font-extrabold text-2xl">$199.00</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;