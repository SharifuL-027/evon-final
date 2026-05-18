import React from 'react';
import { Link } from 'react-router';

const AboutUs = () => {
  return (
    <div className="bg-white pb-20">
      
      {/* 🌟 1. PREMIUM HERO SECTION (Dark Theme to match your branding) 🌟 */}
      <div className="bg-slate-950 py-32 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-sm font-black text-indigo-500 uppercase tracking-[0.3em] mb-4">
            Welcome to EVON
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6">
            More Than Just Sneakers.
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            We are redefining the footwear experience in Bangladesh. Authentic brands, uncompromising quality, and a commitment to keeping you stepping forward in style.
          </p>
        </div>
      </div>

      {/* 🌟 2. OUR STORY SECTION (Split Text & Image) 🌟 */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Story Text */}
          <div>
            <h3 className="text-4xl font-extrabold text-slate-950 tracking-tight mb-6">Our Journey</h3>
            <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
              <p>
                EVON started with a simple frustration: finding authentic, premium global sneaker brands locally was incredibly difficult. We were tired of second-guessing quality and dealing with unreliable shipping.
              </p>
              <p>
                So, we built the solution ourselves. We established direct relationships with distributors to curate a collection that meets the highest global standards. Every pair of shoes that enters our warehouse is meticulously checked for authenticity and quality.
              </p>
              <p>
                Today, EVON isn't just a store; it's a community for those who understand that what you wear on your feet drives how you move through the world.
              </p>
            </div>
          </div>

          {/* Story Image (Beautifully rounded with a subtle shadow) */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200">
            {/* Replace this Unsplash link with a photo of your shop, your team, or a cool lifestyle sneaker shot! */}
            <img 
              src="https://images.unsplash.com/photo-1552346154-21d32810baa3?w=800&auto=format&fit=crop&q=80" 
              alt="The EVON Collection" 
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

      {/* 🌟 3. CORE VALUES SECTION 🌟 */}
      <div className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">The EVON Standard</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Value 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-950 mb-3">100% Authentic</h4>
              <p className="text-slate-600 font-medium">We guarantee the authenticity of every single item we sell. No fakes, no replicas, just the real deal.</p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-950 mb-3">Curated Quality</h4>
              <p className="text-slate-600 font-medium">We don't just sell everything. We hand-pick the best silhouettes, colorways, and materials for our customers.</p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h4 className="text-xl font-bold text-slate-950 mb-3">Fast Support</h4>
              <p className="text-slate-600 font-medium">Have a question about sizing or styling? Our dedicated support team is always ready to assist you via WhatsApp.</p>
            </div>

          </div>
        </div>
      </div>

      {/* 🌟 4. FINAL CALL TO ACTION 🌟 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h3 className="text-3xl md:text-4xl font-black text-slate-950 mb-8">Ready to step up your game?</h3>
        <Link 
          to="/products" 
          className="inline-flex items-center justify-center px-10 py-5 bg-slate-950 hover:bg-indigo-600 text-white rounded-full font-extrabold text-lg transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1"
        >
          Explore The Collection
        </Link>
      </div>

    </div>
  );
};

export default AboutUs;