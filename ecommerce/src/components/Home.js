import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import '../styles/Home.css';

// Home component - Landing page with slideshow and offers
function Home() {
  // State for slideshow
  const [currentSlide, setCurrentSlide] = useState(0);

  // Clothing products for slideshow
  const clothingProducts = products.filter(p => p.category === 'Clothing');

  // Auto-rotate slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % clothingProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [clothingProducts.length]);

  // Go to next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % clothingProducts.length);
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + clothingProducts.length) % clothingProducts.length);
  };

  // Get featured products with high discounts
  const featuredProducts = products
    .filter(p => p.discount >= 40)
    .slice(0, 6);

  return (
    <div className="home">
      {/* Hero Slideshow Section */}
      <div className="hero-slideshow">
        <div className="slideshow-container">
          {/* Slides */}
          <div className="slides-wrapper">
            {clothingProducts.map((product, index) => (
              <div
                key={product.id}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="slide-content">
                  <div className="slide-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} className="slide-img" />
                    ) : (
                      <span className="slide-icon">{product.image}</span>
                    )}
                  </div>
                  <div className="slide-text">
                    {product.brand && <p className="slide-brand">{product.brand}</p>}
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="slide-price">
                      <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="discount-badge">{product.discount}% OFF</span>
                    </div>
                    <Link to="/products" className="slide-btn">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button className="slide-control prev" onClick={prevSlide}>
            ❮
          </button>

          {/* Next Button */}
          <button className="slide-control next" onClick={nextSlide}>
            ❯
          </button>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {clothingProducts.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
        </div>

        {/* Animated Background */}
        <div className="hero-background"></div>
      </div>

      {/* Flash Deals Section */}
      <section className="flash-deals">
        <div className="flash-container">
          <div className="flash-header">
            <h2>⚡ FLASH DEALS - Limited Time Offers!</h2>
            <p>Save up to 50% on selected items</p>
          </div>

          {/* Featured Products Grid */}
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="deal-card">
                <div className="deal-image">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="deal-img" />
                  ) : (
                    <span className="deal-icon">{product.image}</span>
                  )}
                  <div className="deal-badge">{product.discount}% OFF</div>
                </div>
                <div className="deal-details">
                  {product.brand && <p className="deal-brand">{product.brand}</p>}
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <div className="deal-prices">
                    <span className="old-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="new-price">₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="savings">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/products" className="view-all-deals">
            View All Deals →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Get your products delivered quickly</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Payment</h3>
            <p>Multiple payment options available</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day money-back guarantee</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure</h3>
            <p>Your data is safe with us</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/products" className="category-box" style={{ color: '#FF6B6B' }}>
            <span className="category-icon">🎧</span>
            <span>Electronics</span>
          </Link>
          <Link to="/products" className="category-box" style={{ color: '#4ECDC4' }}>
            <span className="category-icon">👕</span>
            <span>Clothing</span>
          </Link>
          <Link to="/products" className="category-box" style={{ color: '#FFD93D' }}>
            <span className="category-icon">📖</span>
            <span>Books</span>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Subscribe for Exclusive Offers!</h2>
          <p>Get 15% off your first purchase + early access to sales</p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
