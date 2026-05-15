// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './Component/Navbar';
import Hero from './Component/Hero';

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Hero></Hero>
      <main className="pt-20 min-h-screen bg-gray-50">
        <Routes>
          {/* Static Routes */}
          {/* <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} /> */}

          {/* Dynamic Routes (Notice the :id) */}
          {/* <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout/:id" element={<OrderPage />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;