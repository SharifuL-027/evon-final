import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router'; 

const ProductDetails = () => {
  const { id } = useParams(); 
  
  // Real Data States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  
  // --- NEW: State to track the zoom effect ---
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: 'center center',
    transform: 'scale(1)'
  });
  
  const [selectedSize, setSelectedSize] = useState('42');
  const [selectedColor, setSelectedColor] = useState('Black');
  const dummySizes = ['39', '40', '41', '42', '43', '44'];
  const dummyColors = [{ name: 'Red', hex: '#ef4444' }, { name: 'Black', hex: '#111827' }, { name: 'White', hex: '#f9fafb' }];

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setMainImage(data.images[0].url);
          }
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]); 

  // --- NEW: Functions to handle the mouse hover zoom ---
  const handleMouseMove = (e) => {
    // Calculate exactly where the user's mouse is over the image
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Move the zoom focus to that exact spot and scale it up 2.5x
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.5)' // Change this number to make it zoom more or less!
    });
  };

  const handleMouseLeave = () => {
    // Reset back to normal when the mouse leaves the picture
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-20 text-2xl font-bold">Product not found!</div>;
  }

  return (
    <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. MAIN IMAGE WITH HOVER ZOOM */}
      <div 
        className="w-full bg-gray-50 rounded-3xl overflow-hidden mb-6 flex justify-center items-center h-[400px] sm:h-[500px] md:h-[700px] cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img 
          src={mainImage || 'https://via.placeholder.com/800'} 
          alt={product.name} 
          // CHANGED: object-cover is now object-contain to prevent cropping!
          className="w-full h-full object-contain mix-blend-multiply pointer-events-none transition-transform duration-150 ease-out" 
          style={zoomStyle}
        />
      </div>

      {/* 2. THUMBNAILS */}
      <div className="flex justify-center gap-4 mb-12">
        {product.images && product.images.map((img, index) => (
          <button 
            key={index} 
            onClick={() => setMainImage(img.url)}
            className={`w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all ${mainImage === img.url ? 'border-gray-900 opacity-100 scale-105 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'}`}
          >
            <img src={img.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* --- DETAILS SECTION --- */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* 3. NAME & PRICE */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          {product.name}
        </h1>
        <p className="text-3xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>

        {/* 4. RATING & STOCK STATUS */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-6 h-6 ${i === 4 ? 'opacity-50' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-bold text-gray-700">4.9</span>
          </div>

          <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>

          {/* Dynamic Stock Badge */}
          <div className={`flex items-center gap-2 font-bold ${product.status === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
            {product.status === 'In Stock' ? (
              <><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Available in Stock</>
            ) : (
              <><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> Sold Out</>
            )}
          </div>
        </div>

        {/* 5. DESCRIPTION */}
        <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl">
          {product.description}
        </p>

        {/* 6. SIZES & COLORS (UI Only) */}
        <div className="flex flex-col sm:flex-row gap-8 mb-10">
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Size (EU)</label>
              <div className="flex gap-2">
                {dummySizes.slice(0, 4).map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)} className={`w-12 h-12 rounded-lg font-bold border-2 transition-all ${selectedSize === s ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}>{s}</button>
                ))}
              </div>
           </div>
           <div>
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Color</label>
              <div className="flex gap-2">
                {dummyColors.map((c) => (
                  <button key={c.name} onClick={() => setSelectedColor(c.name)} className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor === c.name ? 'border-gray-900 p-1' : 'border-transparent'}`}>
                    <div className="w-full h-full rounded-full border border-gray-200" style={{ backgroundColor: c.hex }}></div>
                  </button>
                ))}
              </div>
           </div>
        </div>

        {/* 7. CASH ON DELIVERY */}
        <div className="flex items-center gap-3 bg-indigo-50 text-indigo-700 px-6 py-3 rounded-full font-bold mb-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          Cash on Delivery Available
        </div>

        {/* 8. ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
          <button className="flex-1 bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50 py-4 rounded-xl font-bold text-lg transition-colors flex justify-center items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            Add to Cart
          </button>
          <button className="flex-1 bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-xl shadow-gray-900/20">
            Order Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;