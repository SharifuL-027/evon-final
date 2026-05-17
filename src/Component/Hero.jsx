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
            
    <a 
  href="https://wa.me/8801605992460?text=Hello%20EVON%20Support!%20I%20need%20help%20with..." 
  target="_blank" 
  rel="noopener noreferrer"
  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(37,211,102,0.2)] hover:shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:-translate-y-1 flex items-center justify-center"
>
  WhatsApp Support
  <svg className="w-5 h-5 ml-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
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
          
          <div className="relative group">
            <img 
              src="/public/images/heroshow.png" 
              alt="EVON Phantom Sneaker" 
              className="w-full h-auto max-h-[600px] object-cover md:object-contain transform -rotate-12 group-hover:rotate-0 group-hover:scale-105 transition-all duration-700 ease-in-out drop-shadow-2xl rounded-3xl"
            />
            
            {/* Floating Price Tag Badge */}
            <div className="absolute top-4 right-4 md:top-10 md:-right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">Limited Edition</p>
              <p className="text-white font-extrabold text-2xl">tk1300.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;