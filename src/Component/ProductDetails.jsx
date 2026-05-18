import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: 'center center',
    transform: 'scale(1)',
  });

  // =========================================
  // 🌟 MOCK REVIEW DATA (5 Reviews) 🌟
  // =========================================
  // =========================================
  // 🌟 MOCK REVIEW DATA (2026 Version) 🌟
  // =========================================
  const reviews = [
    {
      id: 1,
      name: "Tahmina Akter",
      date: "October 12, 2026",
      rating: 5,
      comment: "Absolutely love the quality! The material is exactly as described and it fits perfectly. Delivery was super fast too.",
      images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=60"]
    },
    {
      id: 2,
      name: "Sarah Rahman",
      date: "November 05, 2026",
      rating: 5,
      comment: "Premium packaging and the color is gorgeous. I wore it to an event and got so many compliments! Highly recommend EVON.",
      images: [
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=500&auto=format&fit=crop&q=60"
      ]
    },
    {
      id: 3,
      name: "Nadia Islam",
      date: "December 01, 2026",
      rating: 4,
      comment: "Very beautiful and comfortable. Dropping one star because the delivery took an extra day, but the product itself is flawless.",
      images: []
    },
    {
      id: 4,
      name: "Ayesha S.",
      date: "January 15, 2026",
      rating: 5,
      comment: "Worth every Taka! The stitching is top-notch and the inner material feels very luxurious. Will definitely order again.",
      images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60"]
    },
    {
      id: 5,
      name: "Fariha K.",
      date: "February 20, 2026",
      rating: 5,
      comment: "I was skeptical about buying online, but EVON proved me wrong. Exactly like the pictures!",
      images: []
    }
  ];

  // Helper function to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg key={index} className={`w-5 h-5 ${index < rating ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-slate-700'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
          if (data.images && data.images.length > 0) setMainImage(data.images[0].url);
          if (data.sizes && data.sizes.length > 0) setSelectedSize(data.sizes[0]);
          if (data.colors && data.colors.length > 0) setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: 'scale(2.5)' });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transformOrigin: 'center center', transform: 'scale(1)' });
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    
    const orderData = {
      productId: product._id,
      productName: product.name,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      totalAmount: (product.price * quantity).toFixed(2),
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerAddress: customerInfo.address
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        alert('🎉 Order Placed Successfully!');
        setIsOrderModalOpen(false);
        setCustomerInfo({ name: '', phone: '', address: '' });
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="max-w-7xl w-full mx-auto bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 animate-pulse flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2 bg-slate-100 h-[400px] md:h-[600px] rounded-3xl"></div>
          <div className="w-full lg:w-1/2 flex flex-col pt-10 gap-6">
            <div className="h-6 bg-slate-100 rounded-full w-1/4"></div>
            <div className="h-12 bg-slate-100 rounded-full w-3/4"></div>
            <div className="h-16 bg-slate-100 rounded-2xl w-1/3"></div>
            <div className="h-32 bg-slate-100 rounded-3xl w-full mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 text-2xl font-bold text-slate-800 antialiased">Product not found!</div>;

  const orderTotal = (product.price * quantity).toFixed(2);

  return (
    <div className="min-h-screen poppins-regular bg-[#f8f9fa] pt-32 pb-20 px-4 sm:px-6 lg:px-8 font-sans antialiased relative">
      
      {/* ========================================= */}
      {/* MAIN PRODUCT CARD */}
      {/* ========================================= */}
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden p-8 md:p-12 border border-slate-100 mb-12">
        <div className="flex flex-col lg:flex-row gap-16">
          
          <div className="w-full lg:w-1/2">
            <div
              className="w-full bg-slate-50 rounded-3xl overflow-hidden mb-6 flex justify-center items-center h-[400px] md:h-[600px] cursor-zoom-in relative group"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={mainImage || 'https://via.placeholder.com/800'}
                alt={product.name}
                className="w-full h-full object-contain pointer-events-none transition-transform duration-150 ease-out p-4"
                style={zoomStyle}
              />
            </div>

            <div className="flex justify-center lg:justify-start gap-4">
              {product.images && product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(img.url)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-[3px] transition-all duration-300 ${
                    mainImage === img.url ? 'border-slate-900 shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img src={img.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col text-left py-4">
            
            <div className="flex flex-wrap gap-3 mb-5">
              {product.category && <span className="bg-slate-100 text-slate-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{product.category}</span>}
              {product.stockQuantity <= 5 && product.stockQuantity > 0 && <span className="bg-orange-50 text-orange-600 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">Low Stock</span>}
            </div>

            <p className="text-sm text-slate-400 poppins-extrabold font-bold tracking-widest uppercase mb-2">
              By <span className="text-slate-900 poppins-extrabold font-black">{product.brand || 'EVON'}</span>
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-end gap-5 mb-8 pb-8 border-b border-slate-100">
              <span className="text-5xl font-black text-slate-900">
                ৳{product.price?.toFixed(2)}
              </span>
              
              {product.highestPrice && product.highestPrice > product.price && (
                <span className="text-2xl font-bold text-slate-400 line-through mb-1.5 decoration-slate-300">
                  ৳{product.highestPrice?.toFixed(2)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 bg-slate-50 p-6 rounded-3xl border border-slate-100">
              {product.material && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Material</span>
                  <span className="font-bold text-slate-800">{product.material}</span>
                </div>
              )}
              {product.gender && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Gender</span>
                  <span className="font-bold text-slate-800">{product.gender}</span>
                </div>
              )}
              {product.season && (
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Season</span>
                  <span className="font-bold text-slate-800">{product.season}</span>
                </div>
              )}
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-1">Status</span>
                <span className={`font-bold ${product.status === 'In Stock' ? 'text-emerald-500' : 'text-rose-500'}`}>{product.status}</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-black text-slate-900 mb-4 tracking-tight">The Details</h3>
              <p className="text-base text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 mb-10">
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex-1">
                  <label className="block text-xs font-black text-slate-800 mb-4 uppercase tracking-widest">Select Size (EU)</label>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 rounded-2xl font-black text-sm transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-slate-900 text-white shadow-lg scale-110 border-none'
                            : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="flex-1">
                  <label className="block text-xs font-black text-slate-800 mb-4 uppercase tracking-widest">Select Color</label>
                  <div className="flex flex-wrap gap-4">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color }}
                        className={`w-12 h-12 rounded-full transition-all duration-300 shadow-sm border border-slate-200 ${
                          selectedColor === color ? 'scale-125 shadow-lg ring-4 ring-offset-4 ring-slate-200' : 'hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
              <div className="flex items-center bg-white border border-slate-200 rounded-2xl h-16 w-full sm:w-40 p-1 shadow-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 h-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-black text-xl transition-all">-</button>
                <span className="flex-1 text-center font-black text-lg text-slate-800">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex-1 h-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl font-black text-xl transition-all">+</button>
              </div>

    <button 
  onClick={() => setIsOrderModalOpen(true)}
  className="w-full bg-gradient-to-r from-slate-900 to-black hover:from-slate-800 hover:to-black text-white h-14 sm:h-16 rounded-full font-black text-lg sm:text-xl transition-all flex justify-center items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-[0.98]"
>
  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
  </svg>
  Order Now : ৳ {orderTotal}
</button>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* 🌟 NEW: DARK BLUISH-BLACK REVIEWS SECTION 🌟 */}
      {/* ========================================= */}
      <div className="max-w-7xl mx-auto bg-slate-950 rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-800">
        
        {/* Review Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-slate-800 pb-8 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Customer Reviews</h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex">{renderStars(5)}</div>
              <span className="font-bold text-slate-300 text-lg">4.8 out of 5 <span className="text-slate-500 font-medium text-sm ml-1">({reviews.length} Reviews)</span></span>
            </div>
          </div>
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            Write a Review
          </button>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.id} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-colors flex flex-col h-full">
              
              {/* User Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-white font-bold text-lg">{review.name}</p>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mt-1">{review.date}</p>
                </div>
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-slate-300 leading-relaxed font-medium mb-6 flex-grow">
                "{review.comment}"
              </p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-3 mt-auto">
                  {review.images.map((imgUrl, idx) => (
                    <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden border border-slate-700 cursor-pointer hover:border-indigo-500 transition-all">
                      <img src={imgUrl} alt={`Review by ${review.name}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

      {/* ========================================= */}
      {/* 🎯 THE CHECKOUT MODAL (Unchanged) */}
      {/* ========================================= */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
            
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Complete Order</h3>
                <p className="text-sm font-bold text-slate-500 mt-1">Cash on Delivery</p>
              </div>
              <button onClick={() => setIsOrderModalOpen(false)} className="bg-white p-2 rounded-full text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={submitOrder} className="p-8 space-y-5">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                   <img src={mainImage} className="w-16 h-16 rounded-xl object-cover border border-slate-200" alt="order summary" />
                   <div>
                      <p className="font-black text-slate-900 line-clamp-1">{product.name}</p>
                      <p className="text-xs font-bold text-slate-500 mt-1">Unit Price: ৳{product.price?.toFixed(2)}</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-4">
                   <div className="bg-white p-3 rounded-xl border border-slate-100 text-center shadow-sm">
                      <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Size</span>
                      <span className="font-bold text-slate-800 text-base">{selectedSize || 'N/A'}</span>
                   </div>
                   <div className="bg-white p-3 rounded-xl border border-slate-100 text-center shadow-sm flex flex-col items-center justify-center">
                      <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Color</span>
                      <div className="w-6 h-6 rounded-full shadow-sm border border-slate-200" style={{ backgroundColor: selectedColor || '#ccc' }}></div>
                   </div>
                   <div className="bg-white p-3 rounded-xl border border-slate-100 text-center shadow-sm">
                      <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Qty</span>
                      <span className="font-bold text-slate-800 text-base">{quantity}</span>
                   </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none transition-all font-medium" 
                  placeholder="Enter your name" 
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none transition-all font-medium" 
                  placeholder="e.g. 017XXXXXXX" 
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Delivery Address *</label>
                <textarea 
                  required
                  rows="3"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white outline-none transition-all font-medium" 
                  placeholder="House, Street, City" 
                ></textarea>
              </div>

              <button type="submit" className="w-full mt-4 flex items-center justify-between bg-gradient-to-r from-slate-800 to-black hover:from-slate-900 hover:to-black text-white px-6 py-5 rounded-xl transition-all shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:-translate-y-1">
                <span className="font-black text-lg uppercase tracking-wider">Confirm Order</span>
                <span className="font-black text-xl">৳{orderTotal}</span>
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;