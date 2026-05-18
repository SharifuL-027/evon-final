import React from 'react';

const Reviews = () => {
  // =========================================
  // 🌟 MOCK REVIEW DATA (With Your Images!) 🌟
  // =========================================
  const reviews = [
    {
      id: 1,
      name: "Tahmina Akter",
      date: "April 12, 2026",
      rating: 5,
      comment: "Absolutely love the quality! The material is exactly as described and it fits perfectly. Delivery was super fast too.",
      images: ["/public/images/rev-1.jpeg"]
    },
    {
      id: 2,
      name: "Sarah Rahman",
      date: "March 05, 2026",
      rating: 5,
      comment: "Premium packaging and the color is gorgeous. I wore it to an event and got so many compliments! Highly recommend EVON.",
      images: [
        "/public/images/rev-2.jpeg"
      ]
    },
    {
      id: 3,
      name: "Nadia Islam",
      date: "April 01, 2026",
      rating: 4,
      comment: "Very beautiful and comfortable. Dropping one star because the delivery took an extra day, but the product itself is flawless.",
      images: ['/public/images/rev-3.jpeg']
    },
    {
      id: 4,
      name: "Ayesha S.",
      date: "January 15, 2026",
      rating: 5,
      comment: "Worth every Taka! The stitching is top-notch and the inner material feels very luxurious. Will definitely order again.",
      images: ["/public/images/rev-4.jpeg"]
    },
    {
      id: 5,
      name: "Fariha K.",
      date: "February 20, 2026",
      rating: 5,
      comment: "I was skeptical about buying online, but EVON proved me wrong. Exactly like the pictures!",
      images: ['/public/images/rev-5.jpeg']
    }
  ];

  // Helper function to render glowing stars (Changed empty stars to light grey)
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg key={index} className={`w-5 h-5 ${index < rating ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    // 🚨 CHANGED: Background to white, border to light grey
    <div className="bg-white py-24 sm:py-32  relative overflow-hidden">
      
      {/* Background Glow - softened for white bg */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header - 🚨 CHANGED: Text to dark slate */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-black text-indigo-600 uppercase poppins-extrabold tracking-[0.2em] mb-3">Customer Reviews</h2>
          <h3 className="text-4xl md:text-5xl font-black poppins-extrabold text-slate-950 tracking-tight mb-6">Loved by thousands of Customer </h3>
          <div className="flex items-center justify-center gap-3">
            <div className="flex">{renderStars(5)}</div>
            <span className="font-bold text-slate-600 poppins-extrabold text-lg">4.9/5 Average Rating</span>
          </div>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {reviews.map(review => (
            // 🚨 THE FIX: bg-white, beautiful shadow-slate-200/50, hover lift effect
            <div key={review.id} className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-100 hover:border-slate-200 transition-all flex flex-col h-full shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/60 hover:-translate-y-2 cursor-default">
              
              {/* User Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  {/* 🚨 CHANGED: Name to very dark grey, date to light grey */}
                  <p className="text-slate-950 font-extrabold text-xl">{review.name}</p>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1.5">{review.date}</p>
                </div>
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Review Text - 🚨 CHANGED: Text to medium dark grey */}
              <p className="text-slate-600 text-lg leading-relaxed font-medium mb-8 flex-grow">
                "{review.comment}"
              </p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                // 🚨 CHANGED: Border color changed to light grey
                <div className="flex flex-wrap gap-4 mt-auto pt-6 border-t border-slate-100">
                  {review.images.map((imgUrl, idx) => (
                    // Borders on images changed to very light grey with a small shadow
                    <div key={idx} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-slate-50 hover:border-indigo-500 transition-all shadow-md shadow-slate-200/50">
                      <img src={imgUrl} alt={`Review by ${review.name}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Reviews;