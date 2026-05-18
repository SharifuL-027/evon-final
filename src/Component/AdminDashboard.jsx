import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  
  // --- STATES ---
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [imageFiles, setImageFiles] = useState([null, null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null, null]);

  const availableSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44'];
  const availableColors = [
    '#000000', '#FFFFFF', '#EF4444', '#3B82F6', '#22C55E', '#EAB308', '#A855F7', '#EC4899',
    '#64748B', '#B45309', '#1E3A8A', '#D1D5DB'
  ];

  // --- USE EFFECT (Perfectly structured to remove red lines!) ---
  useEffect(() => {
    const fetchAllData = async () => {
      // 1. Fetch Products
      try {
        const prodRes = await fetch('https://evonfits.onrender.com/api/products');
        if (prodRes.ok) setProducts(await prodRes.json());
      } catch (err) { console.error('Products error:', err); }
      finally { setIsLoadingProducts(false); }

      // 2. Fetch Orders
      try {
        const ordRes = await fetch('https://evonfits.onrender.com/api/orders');
        if (ordRes.ok) setOrders(await ordRes.json());
      } catch (err) { console.error('Orders error:', err); }
      finally { setIsLoadingOrders(false); }
    };

    fetchAllData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) { console.error('Error logging out:', error); }
  };

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) setSelectedSizes(selectedSizes.filter(s => s !== size));
    else setSelectedSizes([...selectedSizes, size]);
  };

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) setSelectedColors(selectedColors.filter(c => c !== color));
    else setSelectedColors([...selectedColors, color]);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = [...imageFiles];
      newFiles[index] = file;
      setImageFiles(newFiles);

      const newPreviews = [...imagePreviews];
      newPreviews[index] = URL.createObjectURL(file);
      setImagePreviews(newPreviews);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    
    const form = e.target;
    const formData = new FormData();
    
    formData.append('name', form.name.value);
    formData.append('price', form.price.value);
    formData.append('highestPrice', form.highestPrice.value);
    formData.append('brand', form.brand.value);
    formData.append('category', form.category.value);
    formData.append('stockQuantity', form.stockQuantity.value);
    formData.append('description', form.description.value);
    formData.append('material', form.material.value);
    formData.append('gender', form.gender.value);
    formData.append('season', form.season.value);

    // 🎯 THE CRITICAL FIX FOR ARRAYS
    selectedSizes.forEach(size => formData.append('sizes', size));
    selectedColors.forEach(color => formData.append('colors', color));

    imageFiles.forEach((file) => {
      if (file) formData.append('images', file);
    });

    try {
      const response = await fetch('https://evonfits.onrender.com/api/products', {
        method: 'POST',
        body: formData, 
      });

      if (response.ok) {
        alert('Product successfully added!');
        form.reset();
        setSelectedSizes([]);
        setSelectedColors([]);
        setImageFiles([null, null, null, null, null]);
        setImagePreviews([null, null, null, null, null]);
        
        // Refresh products list
        const newRes = await fetch('https://evonfits.onrender.com/api/products');
        if(newRes.ok) setProducts(await newRes.json());
        
        setActiveTab('products'); 
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleDeleteProduct = async (id) => {
    if(window.confirm("Are you sure you want to permanently delete this product?")) {
      try {
        const response = await fetch(`https://evonfits.onrender.comapi/products/${id}`, { method: 'DELETE' });
        if (response.ok) setProducts(products.filter(p => p._id !== id));
      } catch (error) { console.error('Error deleting product:', error); }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      
      {/* 1. EVON SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-sm z-10">
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <span className="text-2xl font-black text-indigo-600 tracking-widest uppercase">EVON ADMIN</span>
        </div>
        
        <nav className="flex-1 py-6 space-y-2 px-4">
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            Manage Products
          </button>
          
          <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            Waiting Orders
          </button>

          <button onClick={() => setActiveTab('add-product')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all mt-4 ${activeTab === 'add-product' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Add New Item
          </button>
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex justify-center items-center gap-2 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition-colors border border-rose-100">
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
           <h2 className="text-xl font-black text-slate-800">Welcome, Admin</h2>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          
          {/* === PRODUCTS TAB === */}
          {activeTab === 'products' && (
            <div className="animate-in fade-in duration-300">
              <h1 className="text-3xl font-black text-slate-900 mb-8">Manage Inventory</h1>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-widest font-black">
                      <th className="p-5">Product</th>
                      <th className="p-5">Price</th>
                      <th className="p-5">Status</th>
                      <th className="p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingProducts ? (
                      <tr><td colSpan="4" className="p-10 text-center text-slate-500 font-bold">Loading products...</td></tr>
                    ) : products.length === 0 ? (
                      <tr><td colSpan="4" className="p-10 text-center text-slate-500 font-bold">No products found. Click "Add New Item" to start!</td></tr>
                    ) : (
                      products.map((product) => (
                        <tr key={product._id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-5 flex items-center gap-4">
                            <img src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/150'} alt={product.name} className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 shadow-sm" />
                            <span className="font-bold text-slate-900">{product.name}</span>
                          </td>
                          <td className="p-5 text-slate-600 font-bold">৳{product.price.toFixed(2)}</td>
                          <td className="p-5">
                            <span className={`px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-wider ${product.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            <button onClick={() => handleDeleteProduct(product._id)} className="text-rose-600 hover:text-rose-900 font-bold bg-rose-50 px-4 py-2 rounded-lg transition-colors">Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* === ADD PRODUCT TAB === */}
          {activeTab === 'add-product' && (
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 animate-in fade-in duration-300">
              <h1 className="text-3xl font-black text-slate-900 mb-8">Create New Product</h1>
              
              <form onSubmit={handleSaveProduct} className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Product Name *</label>
                    <input type="text" name="name" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-medium transition-all" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Price (৳) *</label>
                    <input type="number" name="price" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-medium transition-all" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Highest Price (Crossed Out)</label>
                    <input type="number" name="highestPrice" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-medium transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Category *</label>
                    <select name="category" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold transition-all text-slate-700">
                      <option value="">Select category v</option>
                      <option value="Sneakers">Sneakers</option>
                      <option value="Heels">Heels</option>
                      <option value="Flats">Flats</option>
                      <option value="Boots">Boots</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Brand</label>
                    <input type="text" name="brand" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-medium transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Stock Quantity</label>
                    <input type="number" name="stockQuantity" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-medium transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Description</label>
                  <textarea name="description" rows="4" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-medium transition-all" required></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Material</label>
                    <select name="material" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700">
                      <option value="">Select material v</option>
                      <option value="Leather">Leather</option>
                      <option value="Suede">Suede</option>
                      <option value="Canvas">Canvas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Gender</label>
                    <select name="gender" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700">
                      <option value="">Select gender v</option>
                      <option value="Women">Women</option>
                      <option value="Men">Men</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-2 uppercase tracking-widest">Season</label>
                    <select name="season" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700">
                      <option value="">Select season v</option>
                      <option value="Summer">Summer</option>
                      <option value="Winter">Winter</option>
                      <option value="All Season">All Season</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-4 uppercase tracking-widest">Available Sizes (EU)</label>
                  <div className="flex flex-wrap gap-3">
                    {availableSizes.map(size => (
                      <button 
                        key={size} type="button" onClick={() => toggleSize(size)}
                        className={`w-14 h-14 border-2 rounded-xl font-black text-sm transition-all duration-200 ${
                          selectedSizes.includes(size) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-600 hover:text-indigo-600'
                        }`}
                      >{size}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-4 uppercase tracking-widest">Available Colors</label>
                  <div className="flex flex-wrap gap-4">
                    {availableColors.map(color => (
                      <button 
                        key={color} type="button" onClick={() => toggleColor(color)}
                        style={{ backgroundColor: color }}
                        className={`w-12 h-12 rounded-full transition-all shadow-sm border-2 ${selectedColors.includes(color) ? 'border-indigo-600 scale-125 shadow-lg ring-4 ring-offset-4 ring-indigo-100' : 'border-slate-200 hover:scale-110'}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-4 uppercase tracking-widest">Product Images (Up to 5)</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div key={index} className="relative aspect-square border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors overflow-hidden group">
                        <input type="file" accept="image/*" onChange={(e) => handleImageChange(index, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" required={index === 0 && !imageFiles[0]} />
                        {imagePreviews[index] ? (
                          <img src={imagePreviews[index]} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <svg className="w-8 h-8 text-slate-400 mb-2 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                            <span className="text-xs text-slate-500 font-bold tracking-wide">{index === 0 ? 'Main Image' : `Image ${index + 1}`}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-slate-100">
                  <button type="submit" disabled={isSubmitting} className={`flex items-center gap-3 px-10 py-4 rounded-xl font-black text-lg transition-all shadow-[0_10px_20px_rgba(79,70,229,0.2)] hover:-translate-y-1 ${isSubmitting ? 'bg-slate-400 cursor-not-allowed text-white' : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white'}`}>
                    {isSubmitting ? 'Uploading...' : 'Publish Product'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* === WAITING ORDERS TAB === */}
          {activeTab === 'orders' && (
            <div className="animate-in fade-in duration-300">
              <h1 className="text-3xl font-black text-slate-900 mb-8">Waiting Orders</h1>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-widest font-black">
                      <th className="p-5">Customer Info</th>
                      <th className="p-5">Product Details</th>
                      <th className="p-5">Total Amount</th>
                      <th className="p-5 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {isLoadingOrders ? (
                      <tr><td colSpan="4" className="p-10 text-center text-slate-500 font-bold">Loading orders...</td></tr>
                    ) : orders.length === 0 ? (
                      <tr><td colSpan="4" className="p-10 text-center text-slate-500 font-bold">No waiting orders yet.</td></tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-5">
                            <p className="font-bold text-slate-900 text-lg">{order.customerName}</p>
                            <p className="text-sm font-bold text-slate-500 mt-1">{order.customerPhone}</p>
                            <p className="text-xs font-bold text-slate-400 mt-1 max-w-[200px] truncate">{order.customerAddress}</p>
                          </td>
                          <td className="p-5">
                            <p className="font-black text-indigo-700 text-lg">{order.productName}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                              <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Size: {order.size || 'N/A'}</span>
                              <span className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                Color: <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: order.color || '#ccc' }}></span>
                              </span>
                              <span className="bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">Qty: {order.quantity}</span>
                            </div>
                          </td>
                          <td className="p-5">
                            <p className="font-black text-2xl text-slate-900">৳{order.totalAmount.toFixed(2)}</p>
                            <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mt-1">Cash on Delivery</p>
                          </td>
                          <td className="p-5 text-right text-sm font-bold text-slate-500">
                            {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;