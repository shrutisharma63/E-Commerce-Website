import React from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageFallback';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Wishlist.css';

// Wishlist component - Display favorite products
function Wishlist({ wishlist, removeFromWishlist, moveWishlistToCart }) {
  useScrollReveal();

  return (
    <div className="wishlist">
      <div className="wishlist-container">
        <h1>My Wishlist</h1>

        {wishlist.length === 0 ? (
          // Empty Wishlist Message
          <div className="empty-wishlist reveal reveal-zoom">
            <p>Your wishlist is empty</p>
            <Link to="/products" className="start-shopping-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          // Wishlist Items
          <div className="wishlist-content">
            <div className="wishlist-items reveal reveal-left">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-item">
                  {/* Product Image */}
                  <div className="item-image">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="item-img"
                        loading="lazy"
                        onError={handleImageError}
                      />
                    ) : (
                      <span className="item-icon">{item.image}</span>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="item-details">
                    {item.brand && <p className="item-brand">{item.brand}</p>}
                    <h3>{item.name}</h3>
                    <p className="item-category">{item.category}</p>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="item-actions">
                    <button
                      className="add-to-cart-btn"
                      onClick={() => moveWishlistToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="remove-from-wishlist-btn"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Wishlist Summary */}
            <div className="wishlist-summary reveal reveal-right" style={{ '--delay': '0.05s' }}>
              <h2>Wishlist Summary</h2>
              <p>Total Items: <strong>{wishlist.length}</strong></p>
              <p>Total Value: <strong>₹{wishlist.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-IN')}</strong></p>
              <button
                className="add-all-to-cart-btn"
                onClick={() => {
                  wishlist.forEach(item => moveWishlistToCart(item));
                }}
              >
                Add All to Cart
              </button>
              <Link to="/products" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
