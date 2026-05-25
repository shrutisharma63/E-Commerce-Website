import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { handleImageError } from '../utils/imageFallback';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/Home.css';

const FLASH_DEAL_STORAGE_KEY = 'flashDealsEndAt';

const getFlashDealEnd = () => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(FLASH_DEAL_STORAGE_KEY);
    if (stored) {
      const parsed = new Date(stored);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed;
      }
    }

    const end = new Date();
    end.setDate(end.getDate() + 5);
    end.setHours(23, 59, 59, 999);
    window.localStorage.setItem(FLASH_DEAL_STORAGE_KEY, end.toISOString());
    return end;
  }

  const end = new Date();
  end.setDate(end.getDate() + 5);
  end.setHours(23, 59, 59, 999);
  return end;
};

const getTimeRemaining = (endTime) => {
  const totalMs = Math.max(endTime - new Date(), 0);
  const days = Math.floor(totalMs / 86400000);
  const hours = Math.floor((totalMs % 86400000) / 3600000);
  const minutes = Math.floor((totalMs % 3600000) / 60000);
  const seconds = Math.floor((totalMs % 60000) / 1000);

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
  };
};

// Home component - Landing page with slideshow and offers
function Home() {
  // State for slideshow
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flashDealEndsAt] = useState(() => getFlashDealEnd());
  const [flashTimeLeft, setFlashTimeLeft] = useState(() => getTimeRemaining(flashDealEndsAt));

  // Clothing products for slideshow
  const clothingProducts = products.filter(p => p.category === 'Clothing');

  // Auto-rotate slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % clothingProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [clothingProducts.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlashTimeLeft(getTimeRemaining(flashDealEndsAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [flashDealEndsAt]);

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

  useScrollReveal();

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
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="slide-img"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        onError={handleImageError}
                      />
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
      <section className="flash-deals reveal">
        <div className="flash-container">
          <div className="flash-header">
            <h2>⚡ FLASH DEALS - Limited Time Offers!</h2>
            <p>Save up to 50% on selected items</p>
            <div className="flash-timer" aria-live="polite">
              <span className="timer-label">Deal ends in</span>
              <div className="timer-units">
                <div className="timer-unit">
                  <span className="timer-value">{String(flashTimeLeft.days).padStart(2, '0')}</span>
                  <span className="timer-text">Days</span>
                </div>
                <div className="timer-unit">
                  <span className="timer-value">{String(flashTimeLeft.hours).padStart(2, '0')}</span>
                  <span className="timer-text">Hours</span>
                </div>
                <div className="timer-unit">
                  <span className="timer-value">{String(flashTimeLeft.minutes).padStart(2, '0')}</span>
                  <span className="timer-text">Mins</span>
                </div>
                <div className="timer-unit">
                  <span className="timer-value">{String(flashTimeLeft.seconds).padStart(2, '0')}</span>
                  <span className="timer-text">Secs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Products Grid */}
          <div className="featured-grid">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="deal-card reveal reveal-zoom"
                style={{ '--delay': `${index * 0.06}s` }}
              >
                <div className="deal-image">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="deal-img"
                      loading="lazy"
                      onError={handleImageError}
                    />
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
      <section className="features reveal">
        <div className="features-container">
          <div className="feature-card reveal reveal-left" style={{ '--delay': '0.05s' }}>
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Get your products delivered quickly</p>
          </div>
          <div className="feature-card reveal reveal-right" style={{ '--delay': '0.1s' }}>
            <div className="feature-icon">💳</div>
            <h3>Easy Payment</h3>
            <p>Multiple payment options available</p>
          </div>
          <div className="feature-card reveal reveal-left" style={{ '--delay': '0.15s' }}>
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day money-back guarantee</p>
          </div>
          <div className="feature-card reveal reveal-right" style={{ '--delay': '0.2s' }}>
            <div className="feature-icon">🛡️</div>
            <h3>Secure</h3>
            <p>Your data is safe with us</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories reveal">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/products" className="category-box reveal reveal-left" style={{ '--delay': '0.05s' }}>
            <span className="category-icon">🎧</span>
            <span>Electronics</span>
          </Link>
          <Link to="/products" className="category-box reveal reveal-zoom" style={{ '--delay': '0.1s' }}>
            <span className="category-icon">👕</span>
            <span>Clothing</span>
          </Link>
          <Link to="/products" className="category-box reveal reveal-right" style={{ '--delay': '0.15s' }}>
            <span className="category-icon">📖</span>
            <span>Books</span>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter reveal">
        <div className="newsletter-content reveal reveal-zoom">
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
