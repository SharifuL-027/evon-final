// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './Component/Navbar';
import Hero from './Component/Hero';
import Products from './Component/Products';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      
      <main className="min-h-screen bg-slate-950">
        <Routes>
          
          {/* THE FIX: Render BOTH Hero and Products on the Homepage (/) */}
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <Products />
              </>
            } 
          />

          {/* You can keep this here if you still want a separate page dedicated just to products */}
          <Route path="/products" element={<Products />} />

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;