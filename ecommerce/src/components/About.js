import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About StyleCart</h1>
        <div className="about-content">
          <p>
            StyleCart is a modern fashion ecommerce website created for stylish and trendy
            fashion lovers.
          </p>
          <p>
            We provide premium clothing collections, latest fashion trends, and affordable
            outfits for everyone.
          </p>
          <div className="about-features">
            <div className="feature">
              <h3>🎯 Our Mission</h3>
              <p>To make fashion accessible and affordable for everyone.</p>
            </div>
            <div className="feature">
              <h3>✨ Quality</h3>
              <p>Premium clothing collections with the latest trends.</p>
            </div>
            <div className="feature">
              <h3>💰 Best Prices</h3>
              <p>Great discounts and offers on all products.</p>
            </div>
            <div className="feature">
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
