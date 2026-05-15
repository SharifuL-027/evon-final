import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Dummy initial data for testing the UI
const initialProducts = [
  { id: 1, name: 'Rustwood Classic', price: 125, stock: 'In Stock', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100' },
  { id: 2, name: 'Casual Core - Black', price: 85, stock: 'Sold Out', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=100' },
];

const dummyOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: 'Oct 24, 2023', total: '$125.00', status: 'Pending' },
  { id: '#ORD-002', customer: 'Jane Smith', date: 'Oct 23, 2023', total: '$250.00', status: 'Shipped' },
  { id: '#ORD-003', customer: 'Mike Ross', date: 'Oct 21, 2023', total: '$85.00', status: 'Delivered' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState(initialProducts);
  
  // Modal states for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null means "Adding new", object means "Editing"

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteProduct = (id) => {
    if(window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
      // TODO: Later, add your Express.js DELETE API call here
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <span className="text-2xl font-extrabold text-indigo-600 tracking-widest">EVON ADMIN</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'products' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            Products
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            Orders
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* === PRODUCTS TAB === */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
              <button onClick={openAddModal} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm transition-colors">
                + Add Product
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="p-4 font-medium">Product</th>
                    <th className="p-4 font-medium">Price</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                        <span className="font-semibold text-gray-900">{product.name}</span>
                      </td>
                      <td className="p-4 text-gray-600">${product.price.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${product.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => openEditModal(product)} className="text-indigo-600 hover:text-indigo-900 font-medium mr-4">Edit</button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-900 font-medium">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* === ORDERS TAB === */}
        {activeTab === 'orders' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Orders</h1>
            
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Total</th>
                    <th className="p-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dummyOrders.map((order, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-semibold text-gray-900">{order.id}</td>
                      <td className="p-4 text-gray-600">{order.customer}</td>
                      <td className="p-4 text-gray-500">{order.date}</td>
                      <td className="p-4 font-medium text-gray-900">{order.total}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* 3. ADD/EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form className="p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input type="text" defaultValue={editingProduct?.name || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input type="number" defaultValue={editingProduct?.price || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option>In Stock</option>
                    <option>Sold Out</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input type="text" defaultValue={editingProduct?.image || ''} placeholder="https://..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;