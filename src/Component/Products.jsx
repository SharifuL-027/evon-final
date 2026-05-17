import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper Function for the WhatsApp link
  const getWhatsappUrl = (productName) => {
    // Replace this with your actual WhatsApp business number, keep the country code!
    // Current number format is: 880 (country) + 1605992460 (number)
    const phoneNumber = "8801605992460";
    const message = `Hello EVON Support! I want to order the "${productName}" shoe. Please guide me.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white">
      
      {/* Header (Kept Same) */}
      <div className="mb-16 border-b border-slate-100 pb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tighter mb-4">Latest Arrivals</h2>
        <p className="text-xl text-slate-600 max-w-2xl font-medium">Explore our premium shoe collection from global brands.</p>
      </div>
      
      {/* Grid (Kept Same) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        
        {products.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-[2.5rem] border border-slate-100">
             <svg className="w-20 h-20 text-slate-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
             <p className="text-slate-500 text-2xl font-bold">No products found!</p>
             <p className="text-slate-400 mt-2 font-medium">Head over to the Admin Dashboard to add some awesome shoes.</p>
          </div>
        ) : (
          products.map((product) => (
            // 🌟 1. CARD CONTAINER (Less rounded, new hover border color) 🌟
            <div key={product._id} className="group relative bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(99,102,241,0.08)] hover:border-indigo-100 transition-all duration-500 hover:-translate-y-3 flex flex-col">
              
              {/* 🌟 2. IMAGE SECTION (Switched object-cover to object-contain, added padding) 🌟 */}
              <div className="block w-full h-80 sm:h-96 bg-slate-50 overflow-hidden relative p-8 md:p-10">
                <img 
                  src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/600'} 
                  alt={product.name} 
                  // CHANGE: "object-contain" keeps the whole shoe visible
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                />
              </div>
              
              {/* 🌟 3. CONTENT CONTAINER (Completely redesigned layout based on image) 🌟 */}
              <div className="p-8 flex flex-col flex-grow">
                
                {/* 🌟 Brand Name Text (As seen in image) 🌟 */}
                <p className="text-sm font-medium text-slate-500 mb-1.5 antialiased">By EVON</p>
                
                {/* Product Title 🌟 */}
                <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight leading-tight mb-2 line-clamp-2">
                  {product.name}
                </h3>

                {/* 🌟 Review Stars Section (As seen in image) 🌟 */}
                {/* We mock the reviews to make the design work; can connect later. */}
                <div className="flex items-center gap-1.5 mb-5 text-amber-500">
                   {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                   ))}
                   <span className="text-slate-400 font-semibold text-sm ml-1.5 antialiased">(0)</span>
                </div>
                
                {/* Price (Kept same size/position) 🌟 */}
                <p className="text-3xl font-extrabold text-slate-950 tracking-tight mb-8">৳{product.price}</p>
                
                {/* 🌟 4. BUTTONS SECTION (Push to bottom, new rounded-full look) 🌟 */}
                <div className="mt-auto space-y-4 pt-4">
                  
                  {/* Action 1: "Order Now" -> Details/Checkout Page */}
                  <Link 
                    to={`/product/${product._id}`} 
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white h-14 rounded-full font-extrabold text-lg transition-all flex justify-center items-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    Order Now
                  </Link>

                  {/* 🌟 Action 2: "Order Via WhatsApp" (Official color/icon) 🌟 */}
                  <a 
                    href={getWhatsappUrl(product.name)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white h-14 rounded-full font-extrabold text-lg flex justify-center items-center gap-3 transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(37,211,102,0.15)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.3)]"
                  >
                    {/* Official WhatsApp SVG Icon */}
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Order Via WhatsApp
                  </a>
                </div>
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;