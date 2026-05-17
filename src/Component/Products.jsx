import React, { useState, useEffect } from 'react';
import { Link } from 'react-router'; 
const Products = () => {
  // 1. Create state to hold the data and track loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Use useEffect to fetch the data the second the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data); // Save the MongoDB data to our React state
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false); // Turn off the loading screen
      }
    };

    fetchProducts();
  }, []); // The empty array means this only runs once when the component mounts

  // 3. Show a loading screen while waiting for the database
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-slate-900"></div>
      </div>
    );
  }

  // 4. Draw the UI!
  return (
    // 🚨 Increased from max-w-7xl to max-w-[90rem] to give the cards a massive canvas!
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-12 tracking-tight">Latest Arrivals</h2>
      
      {/* 🚨 THE CRITICAL FIX: Changed from grid-cols-4 to max grid-cols-3 and increased the gap! */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
        
        {products.length === 0 ? (
          <p className="text-slate-500 col-span-full text-center py-20 text-2xl font-bold">No products found. Go add some in the Admin Dashboard!</p>
        ) : (
          products.map((product) => {
            return (
              <div key={product._id} className="group relative bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-3 flex flex-col">

                {/* 1. PRODUCT IMAGE LINK (Massive 500px height!) */}
                <Link to={`/product/${product._id}`} className="block w-full h-[400px] md:h-[500px] bg-slate-50 overflow-hidden relative">
                  <img
                    src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/600'}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  />
                </Link>

                {/* 2. PRODUCT INFO (Massive padding, larger text) */}
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4 gap-4">

                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 line-clamp-1">
                      <Link to={`/product/${product._id}`}>
                        {product.name}
                      </Link>
                    </h3>

                    <p className="text-2xl md:text-3xl font-black text-indigo-600">৳{product.price}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-auto pt-6">
                    <span className={`inline-flex items-center px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest ${product.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {product.status}
                    </span>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;