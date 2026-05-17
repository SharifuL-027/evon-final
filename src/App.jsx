import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router'; 

// Components
import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
import Products from './Component/Products';
import AdminLogin from './Component/AdminLogin';
import ProtectedRoute from './Component/ProtectedRoute';
import AdminDashboard from './Component/AdminDashboard'; 
import ProductDetails from './Component/ProductDetails';

const StoreLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <Outlet /> 
      </main>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* --- CUSTOMER FACING ROUTES (With Navbar) --- */}
        <Route element={<StoreLayout />}>
          <Route path="/" element={<><Hero /><Products /></>} />        
          <Route path="/products" element={<Products />} />
          {/* MOVED THIS INSIDE! Now it gets the Navbar! */}
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        {/* --- ADMIN ROUTES (No Navbar) --- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;