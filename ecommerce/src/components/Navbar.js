import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

// Navbar component - Navigation bar with links and cart/wishlist counts
function Navbar({ cartCount, wishlistCount }) {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img
            className="logo-icon"
            src={`${process.env.PUBLIC_URL}/aurastyle-logo.svg`}
            alt="AuraStyle logo"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = `${process.env.PUBLIC_URL}/aurastyle-mark.svg`;
            }}
          />
        </Link>

        {/* Hamburger menu for mobile */}
        <div
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation links */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" onClick={closeMenu}>
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={closeMenu}>
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link" onClick={closeMenu}>
              🛒 Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/wishlist" className="nav-link" onClick={closeMenu}>
              ❤️ Wishlist {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/order-summary" className="nav-link" onClick={closeMenu}>
              📦 Orders
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
