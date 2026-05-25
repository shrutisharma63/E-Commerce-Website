import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/About.css';

function About() {
  useScrollReveal();

  return (
    <div className="about-page">
      <div className="about-container reveal reveal-zoom">
        <h1>About AuraStyle</h1>
        <div className="about-content reveal reveal-left">
          <p>
            AuraStyle is a modern fashion ecommerce website created for stylish and trendy
            fashion lovers.
          </p>
          <p>
            We provide premium clothing collections, latest fashion trends, and affordable
            outfits for everyone.
          </p>
          <div className="about-features">
            <div className="feature reveal reveal-left" style={{ '--delay': '0.05s' }}>
              <h3>🎯 Our Mission</h3>
              <p>To make fashion accessible and affordable for everyone.</p>
            </div>
            <div className="feature reveal reveal-right" style={{ '--delay': '0.1s' }}>
              <h3>✨ Quality</h3>
              <p>Premium clothing collections with the latest trends.</p>
            </div>
            <div className="feature reveal reveal-left" style={{ '--delay': '0.15s' }}>
              <h3>💰 Best Prices</h3>
              <p>Great discounts and offers on all products.</p>
            </div>
            <div className="feature reveal reveal-right" style={{ '--delay': '0.2s' }}>
              <h3>🚚 Fast Delivery</h3>
              <p>Quick and reliable shipping to your doorstep.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
