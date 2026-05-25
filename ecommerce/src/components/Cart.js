import React from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageFallback';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Cart.css';

// Cart component - Display shopping cart items
function Cart({ cart, removeFromCart, updateCartQuantity }) {
  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate total items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useScrollReveal();

  return (
    <div className="cart">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          // Empty Cart Message
          <div className="empty-cart reveal reveal-zoom">
            <p>Your cart is empty</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Cart Items
          <div className="cart-content">
            {/* Cart Items List */}
            <div className="cart-items reveal reveal-left">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
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
                    <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="quantity-control">
                    <button
                      className="qty-btn"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="item-total">
                    <p>₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="cart-summary reveal reveal-right" style={{ '--delay': '0.05s' }}>
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>₹{(totalPrice * 0.1).toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{(totalPrice + totalPrice * 0.1).toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-info">
                <p>Total Items: {totalItems}</p>
              </div>
              <Link to="/order-summary" className="checkout-btn">
                Proceed to Checkout
              </Link>
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

export default Cart;
