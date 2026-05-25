import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductListing from './components/ProductListing';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import OrderSummary from './components/OrderSummary';
import About from './components/About';
import ContactUs from './components/ContactUs';
import { useSmoothScrollMotion } from './hooks/useSmoothScrollMotion';
import './App.css';

function App() {
  useSmoothScrollMotion();

  // State management for cart and wishlist
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Function to add product to cart
  const addToCart = (product) => {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      // If exists, increase quantity
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If new product, add with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Function to update cart item quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Function to add product to wishlist
  const addToWishlist = (product) => {
    // Check if product already in wishlist
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  // Function to remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  // Function to move product from wishlist to cart
  const moveWishlistToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar - shown on all pages */}
        <Navbar
          cartCount={cart.length}
          wishlistCount={wishlist.length}
        />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/about" element={<About />} />
          
          <Route path="/contact" element={<ContactUs />} />
          
          <Route
            path="/products"
            element={
              <ProductListing
                addToCart={addToCart}
                addToWishlist={addToWishlist}
                wishlist={wishlist}
              />
            }
          />
          
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                updateCartQuantity={updateCartQuantity}
              />
            }
          />
          
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                removeFromWishlist={removeFromWishlist}
                moveWishlistToCart={moveWishlistToCart}
              />
            }
          />
          
          <Route
            path="/order-summary"
            element={
              <OrderSummary
                cart={cart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
