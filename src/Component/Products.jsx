import React from 'react';
import { Link } from 'react-router';

// Dummy data
const products = [
  {
    id: 1,
    name: 'Rustwood Classic',
    price: 125.00,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSoldOut: false,
  },
  {
    id: 2,
    name: 'Casual Core - Black',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSoldOut: true,
  },
  {
    id: 3,
    name: 'Casual Core - White',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSoldOut: true,
  },
  {
    id: 4,
    name: 'Volcanic Edge',
    price: 140.00,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSoldOut: false,
  },
  {
    id: 5,
    name: 'Urban Street',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSoldOut: false,
  },
  {
    id: 6,
    name: 'Phantom High',
    price: 165.00,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSoldOut: false,
  },
];

const Products = () => {
  return (
    // TOTAL BG FIX: Changed to bg-white
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Toolbar - Updated for Light Theme */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-200 gap-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            <span className="font-medium tracking-wide">Filters</span>
          </button>

          <div className="hidden md:flex items-center gap-3 text-gray-400">
            <button className="hover:text-indigo-600 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h7v16H4zm9 0h7v16h-7z"/></svg></button>
            <button className="hover:text-indigo-600 transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2 4h6v16H2zm7 0h6v16H9zm7 0h6v16h-6z"/></svg></button>
            <button className="text-black transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2 4h4v16H2zm5 0h4v16H7zm5 0h4v16h-4zm5 0h4v16h-4z"/></svg></button>
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 pl-5 pr-10 rounded-full focus:outline-none focus:border-indigo-500 cursor-pointer font-medium tracking-wide shadow-sm">
              <option>Sort by latest</option>
              <option>Sort by price: low to high</option>
              <option>Sort by price: high to low</option>
              <option>Sort by popularity</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              
              {/* DIV FIXES: 
                1. bg-white (Div background is white)
                2. aspect-square (Makes it perfectly square)
                3. border-gray-100 (Subtle border so white doesn't blend completely into the white page until hovered)
              */}
              <div className="relative overflow-hidden bg-white aspect-square flex items-center justify-center transition-all duration-300 border border-gray-100 group-hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] rounded-2xl">
                
                {/* Wishlist Heart Icon */}
                <button className="absolute top-4 left-4 z-20 text-gray-400 hover:text-rose-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>

                {/* Sold Out Badge */}
                {product.isSoldOut && (
                  <div className="absolute top-4 right-4 z-20 bg-gray-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-sm tracking-widest uppercase shadow-md">
                    Sold Out
                  </div>
                )}

                {/* IMAGE ZOOM FIX:
                  1. scale-125: Image starts zoomed in by default.
                  2. group-hover:scale-95: On hover, it shrinks down, revealing the white div background!
                */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform scale-125 transition-transform duration-700 ease-in-out group-hover:scale-95 z-10"
                />

                {/* Hover Overlay Button ("Select Options") */}
                <div className="absolute inset-0 bg-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-[2px]">
                  <Link 
                    to={`/product/${product.id}`}
                    className="bg-black text-white font-bold py-3 px-8 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-indigo-600 hover:scale-105 shadow-2xl"
                  >
                    Select options
                  </Link>
                </div>
              </div>

              {/* Product Info (Text colors updated for white background) */}
              <div className="mt-5 text-left">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors tracking-wide">
                    {product.name}
                  </h3>
                </Link>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-gray-500 font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Products;