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
import FeaturedProducts from './Component/FeaturedProducts';
import AboutSummary from './Component/AboutSummary';
import Reviews from './Component/Reviews';
import Footer from './Component/Footer';
import ScrollToTop from './Component/ScrollToTop';
import BrandMarquee from './Component/BrandMarquee';

// 🌟 THE LAYOUT WRAPPER 🌟
const StoreLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <Outlet /> 
      </main>
      <Footer />
      <ScrollToTop/>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌟 EVERYTHING IS NOW INSIDE THIS WRAPPER 🌟 */}
        <Route element={<StoreLayout />}>
          
          {/* --- CUSTOMER FACING ROUTES --- */}
          <Route path="/" element={
            <>
              <Hero />
              <BrandMarquee/>
              <Products />
              <AboutSummary /> 
              <FeaturedProducts />
              <Reviews />
            </>
          } />        
          
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* --- ADMIN ROUTES (Now wrapped with Navbar and Footer!) --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;