import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';

// Components
import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
import Products from './Component/Products';
import AdminLogin from './Component/AdminLogin';
import ProtectedRoute from './Component/ProtectedRoute';
import AdminDashboard from './Component/AdminDashboard'; 
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
        
        {/* =========================================
            CUSTOMER ROUTES (Uses the Navbar)
            ========================================= */}
        <Route element={<StoreLayout />}>
          {/* Both Hero and Products show on the Home page */}
          <Route path="/" element={<><Hero /><Products /></>} />
          
          {/* Only Products show on the Products page */}
          <Route path="/products" element={<Products />} />
        </Route>


        {/* =========================================
            ADMIN ROUTES (NO Navbar!)
            ========================================= */}
        
        {/* Admin Login - Standalone clean page */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard - Protected by Firebase Auth */}
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