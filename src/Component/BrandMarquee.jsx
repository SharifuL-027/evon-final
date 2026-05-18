import React from 'react';

const BrandMarquee = () => {
  // Array of your top sneaker brands
  const brands = [
    "NIKE", "ADIDAS", "PUMA", "REEBOK", "NEW BALANCE",
    "JORDAN", "VANS", "ASICS", "CONVERSE", "UNDER ARMOUR"
  ];

  return (
    <div className="bg-[#FDFBF7] shadow-indigo-900/10 py-12 border-slate-100 overflow-hidden relative flex items-center">
      
      {/* 🌟 Premium Left & Right Fading Edges 🌟 */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* The Scrolling Track */}
      <div className="flex whitespace-nowrap animate-scroll items-center">
        
        {/* We duplicate the array to create a seamless infinite loop */}
        {[...brands, ...brands].map((brand, index) => (
          <div key={index} className="mx-12 md:mx-16 flex items-center justify-center">
            
            {/* CURRENT: Beautiful Text Logo Placeholder */}
            <span className="text-3xl md:text-4xl font-black text-slate-200 uppercase tracking-[0.2em] hover:text-slate-400 transition-colors cursor-default">
              {brand}
            </span>

            {/* FUTURE: How to use actual image logos */}
            {/* <img 
                src={`/images/logos/${brand.toLowerCase()}.png`} 
                alt={brand} 
                className="h-10 md:h-12 object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300" 
              /> 
            */}

          </div>
        ))}
      </div>

      {/* 🌟 Custom CSS Animation built directly into the component 🌟 */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          /* Change '30s' to speed up or slow down the scrolling */
          animation: scroll 30s linear infinite;
          width: max-content;
        }
        /* Pause the scrolling when the user hovers over it */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

    </div>
  );
};

export default BrandMarquee;