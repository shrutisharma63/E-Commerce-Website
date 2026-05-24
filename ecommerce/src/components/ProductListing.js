import React, { useState } from 'react';
import { products, getCategories } from '../data/products';
import '../styles/ProductListing.css';

// ProductListing component - Display products with category tabs
function ProductListing({ addToCart, addToWishlist, wishlist }) {
  // State to track selected category
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get all categories
  const categories = getCategories();

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(product => product.category === selectedCategory);

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <div className="product-listing">
      <div className="product-container">
        <h1>Our Products</h1>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`tab-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              {/* Product Image */}
              <div className="product-image">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="product-img" />
                ) : (
                  <span className="product-icon">{product.image}</span>
                )}
                {/* Discount Badge */}
                {product.discount && (
                  <div className="discount-badge">
                    {product.discount}% OFF
                  </div>
                )}
              </div>

              {/* Wishlist Heart Button */}
              <button
                className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => addToWishlist(product)}
                title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                ❤️
              </button>

              {/* Product Details */}
              <div className="product-details">
                {product.brand && <p className="product-brand">{product.brand}</p>}
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
              </div>

              {/* Product Footer */}
              <div className="product-footer">
                <div className="price-section">
                  {product.originalPrice && (
                    <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                  <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="savings">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductListing;
