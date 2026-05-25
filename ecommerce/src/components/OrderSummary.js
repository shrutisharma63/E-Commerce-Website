import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleImageError } from '../utils/imageFallback';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/OrderSummary.css';

// OrderSummary component - Show order summary and delivery tracking
function OrderSummary({ cart }) {
  // State for order confirmation
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('Processing');

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  useScrollReveal();

  // Handle place order
  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      setOrderPlaced(true);
      // Simulate order processing
      setTimeout(() => setDeliveryStatus('Shipped'), 2000);
      setTimeout(() => setDeliveryStatus('Out for Delivery'), 4000);
      setTimeout(() => setDeliveryStatus('Delivered'), 6000);
    }
  };

  // Get delivery progress percentage
  const getProgress = () => {
    switch (deliveryStatus) {
      case 'Processing':
        return 25;
      case 'Shipped':
        return 50;
      case 'Out for Delivery':
        return 75;
      case 'Delivered':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="order-summary">
      <div className="order-container">
        <h1>Order Summary</h1>

        {cart.length === 0 ? (
          // Empty Cart Message
          <div className="empty-order reveal reveal-zoom">
            <p>Your cart is empty. Add items to place an order.</p>
            <Link to="/products" className="shop-now-btn">
              Shop Now
            </Link>
          </div>
        ) : (
          // Order Content
          <div className="order-content">
            {/* Order Items */}
            <div className="order-items reveal reveal-left">
              <h2>Items in Your Order</h2>
              <div className="items-list">
                {cart.map(item => (
                  <div key={item.id} className="order-item">
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
                    <div className="item-info">
                      {item.brand && <p className="item-brand">{item.brand}</p>}
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <span className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals */}
            <div className="order-totals reveal reveal-right" style={{ '--delay': '0.05s' }}>
              <h2>Payment Details</h2>
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-row">
                <span>Tax (10%):</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="total-row final-total">
                <span>Total Amount:</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Delivery Tracking */}
            <div className="delivery-tracking reveal reveal-zoom" style={{ '--delay': '0.1s' }}>
              <h2>Track Your Delivery</h2>

              {!orderPlaced ? (
                <>
                  <p className="tracking-info">Place your order to track delivery status</p>
                  <button className="place-order-btn" onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                </>
              ) : (
                <>
                  {/* Progress Bar */}
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${getProgress()}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Status Steps */}
                  <div className="status-steps">
                    <div className={`step ${deliveryStatus === 'Processing' || getProgress() >= 25 ? 'active' : ''}`}>
                      <div className="step-icon">1️⃣</div>
                      <p>Processing</p>
                    </div>
                    <div className={`step ${getProgress() >= 50 ? 'active' : ''}`}>
                      <div className="step-icon">2️⃣</div>
                      <p>Shipped</p>
                    </div>
                    <div className={`step ${getProgress() >= 75 ? 'active' : ''}`}>
                      <div className="step-icon">3️⃣</div>
                      <p>Out for Delivery</p>
                    </div>
                    <div className={`step ${deliveryStatus === 'Delivered' ? 'active' : ''}`}>
                      <div className="step-icon">4️⃣</div>
                      <p>Delivered</p>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div className="current-status">
                    <p className="status-label">Current Status:</p>
                    <p className="status-value">{deliveryStatus}</p>
                    {deliveryStatus === 'Delivered' && (
                      <p className="status-message">✓ Your order has been delivered!</p>
                    )}
                  </div>

                  {/* Delivery Location */}
                  <div className="delivery-location">
                    <h3>📍 Delivery Location</h3>
                    <div className="map-placeholder">
                      <p>📦 Your package is on its way to:</p>
                      <p className="address">123 Main Street, City, State 12345</p>
                      <p className="delivery-date">Estimated Delivery: {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="order-actions">
                    <Link to="/products" className="continue-shopping-btn">
                      Continue Shopping
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
