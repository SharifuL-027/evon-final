import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        
        if (response.ok) {
          // 🎯 PRO TRICK: We use .slice(0, 3) to only grab the 3 newest items!
          setFeatured(data.slice(0, 3)); 
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading || featured.length === 0) {
    return null; // Keep it invisible until it successfully loads
  }

  return (
    <div className="bg-white py-24 sm:py-32 relative overflow-hidden">
      
      {/* Cool Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-sm font-black text-indigo-500 uppercase tracking-[0.2em] mb-3">Signature Collection</h2>
            <h3 className="text-4xl md:text-5xl font-black poppins-bold text-black tracking-tight">Our Featured Products</h3>
          </div>
          <Link to="/products" className="group flex items-center gap-2 text-white font-bold hover:text-indigo-400 transition-colors">
            View All Products
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {featured.map((product) => (
            <div key={product._id} className="group relative bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-3 flex flex-col">

              {/* Image Section */}
              <Link to={`/product/${product._id}`} className="block w-full h-[350px] lg:h-[450px] bg-slate-800 overflow-hidden relative">
                <img
                  src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/600'}
                  alt={product.name}
                  className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out" 
                />
                
                {/* Premium floating badge */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                  Featured
                </div>
              </Link>

              {/* Info Section */}
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{product.brand || 'EVON'}</p>
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h4 className="text-2xl font-black text-white line-clamp-1 hover:text-indigo-400 transition-colors">
                    <Link to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </h4>
                </div>
                <div className="mt-auto pt-6 flex justify-between items-end">
                  <p className="text-2xl font-black text-indigo-400">৳{product.price}</p>
                  <Link to={`/product/${product._id}`} className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturedProducts;