import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Products = () => {
  // 1. Create state to hold the data and track loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Use useEffect to fetch the data the second the page loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        
        if (response.ok) {
          setProducts(data); // Save the MongoDB data to our React state
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false); // Turn off the loading screen
      }
    };

    fetchProducts();
  }, []); // The empty array means this only runs once when the component mounts

  // 3. Show a loading screen while waiting for the database
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  // 4. Draw the UI!
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Latest Arrivals</h2>
      
      {/* CSS Grid for the product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        {products.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-10">No products found. Go add some in the Admin Dashboard!</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
              
              {/* Product Image Link */}
              <Link to={`/product/${product._id}`} className="block w-full aspect-square bg-gray-100 overflow-hidden">
                {/* We use [0] to grab the first image from the Cloudinary array as the thumbnail */}
                <img 
                  src={product.images && product.images.length > 0 ? product.images[0].url : 'https://via.placeholder.com/400'} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                    <Link to={`/product/${product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-lg font-extrabold text-gray-900 ml-4">${product.price}</p>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.status}
                  </span>
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