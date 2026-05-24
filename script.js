let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(){
    // Remove active class
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    // Add active class
    slides[currentSlide].classList.add("active");

    // Next slide
    currentSlide++;

    // Restart slideshow
    if(currentSlide >= slides.length){
        currentSlide = 0;
    }
}

// First Slide
showSlide();

// Auto Slide
setInterval(showSlide, 3000);

/* =========================================
   CART LOGIC (With Subtotal & Checkout Section)
   ========================================= */
let cartCount = 0;
let cartItemsContainer = document.getElementById("cart-items");

// New variable to calculate and store the running total sum
let runningCartTotal = 0; 

function updateCheckoutUI() {
    const checkoutSection = document.getElementById("checkout-section");
    const subtotalAmount = document.getElementById("subtotal-amount");

    if (cartCount > 0) {
        // Items exist: show section and update numeric text
        checkoutSection.style.display = "block";
        subtotalAmount.innerText = "₹" + runningCartTotal;
    } else {
        // Cart is empty: hide section completely
        checkoutSection.style.display = "none";
    }
}

/* ADD TO CART */
function addToCart(name, brand, price, image){
    // Increase Count
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;

    // Parse the price string (e.g., "₹999" -> 999) and add it to total
    let priceNumeric = parseInt(price.replace(/[^0-9]/g, ''));
    runningCartTotal += priceNumeric;

    // MESSAGE
    let message = document.getElementById("message-box");
    message.innerText = name + " added to cart";
    message.classList.add("show");

    setTimeout(() => {
        message.classList.remove("show");
    }, 2000);

    // CREATE ITEM
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // We pass the raw numeric price value inside dataset attributes for quantity recalculations
    cartItem.innerHTML = `
        <img src="${image}">
        <div class="cart-details">
            <h4>${name}</h4>
            <p class="cart-brand">${brand}</p>
            <p class="cart-price" data-base-price="${priceNumeric}">${price}</p>
            <div class="quantity-box">
                <button onclick="decreaseQty(this)">-</button>
                <span>1</span>
                <button onclick="increaseQty(this)">+</button>
            </div>
        </div>
    `;

    // APPEND ITEM
    cartItemsContainer.appendChild(cartItem);

    // Refresh display visibility and prices
    updateCheckoutUI();
}

/* OPEN CART */
function openCart(){
    document.getElementById("cart-sidebar").classList.add("active");
}

/* CLOSE CART */
document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-sidebar").classList.remove("active");
});

/* INCREASE QUANTITY */
function increaseQty(button){
    let quantitySpan = button.parentElement.querySelector("span");
    let currentQty = parseInt(quantitySpan.innerText);
    
    // Grab the item's base unit price from data attribute
    let priceElement = button.closest(".cart-details").querySelector(".cart-price");
    let basePrice = parseInt(priceElement.getAttribute("data-base-price"));

    // Increment local layout counts
    quantitySpan.innerText = currentQty + 1;
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;

    // Add to main global math total
    runningCartTotal += basePrice;
    updateCheckoutUI();
}

/* DECREASE QUANTITY */
function decreaseQty(button){
    let quantitySpan = button.parentElement.querySelector("span");
    let currentQty = parseInt(quantitySpan.innerText);

    // Grab the item's base unit price from data attribute
    let priceElement = button.closest(".cart-details").querySelector(".cart-price");
    let basePrice = parseInt(priceElement.getAttribute("data-base-price"));

    if(currentQty > 1){
        // Decrement local layout counts
        quantitySpan.innerText = currentQty - 1;
        cartCount--;
        document.getElementById("cart-count").innerText = cartCount;

        // Subtract from main global math total
        runningCartTotal -= basePrice;
        updateCheckoutUI();
    } else {
        // Optional feature: If quantity hits 0, delete the HTML element entirely
        let cartItemRow = button.closest(".cart-item");
        cartItemRow.remove();

        cartCount--;
        document.getElementById("cart-count").innerText = cartCount;
        runningCartTotal -= basePrice;
        updateCheckoutUI();
    }
}

/* =========================
   WISHLIST
========================= */
let wishlistContainer = document.getElementById("wishlist-items");

/* ADD TO WISHLIST */
function addToWishlist(name, brand, price, image){
    // MESSAGE
    let message = document.getElementById("message-box");
    message.innerText = name + " added to wishlist";
    message.classList.add("show");

    setTimeout(() => {
        message.classList.remove("show");
    }, 2000);

    // CREATE ITEM
    let wishlistItem = document.createElement("div");
    wishlistItem.classList.add("wishlist-item");

    wishlistItem.innerHTML = `
        <img src="${image}">
        <div class="wishlist-details">
            <h4>${name}</h4>
            <p class="wishlist-brand">${brand}</p>
            <p class="wishlist-price">${price}</p>
        </div>
    `;

    // APPEND ITEM
    wishlistContainer.appendChild(wishlistItem);
}

/* OPEN WISHLIST */
function openWishlist(){
    document.getElementById("wishlist-sidebar").classList.add("active");
}

/* CLOSE WISHLIST */
document.getElementById("close-wishlist").addEventListener("click", () => {
    document.getElementById("wishlist-sidebar").classList.remove("active");
});

/* =========================
   DARK MODE
========================= */
function toggleDarkMode(){
    document.body.classList.toggle("dark-mode");
}

/* =========================
   LOGIN MODAL
========================= */
function openLogin(){
    document.getElementById("login-modal").classList.add("active");
}

/* CLOSE LOGIN */
document.getElementById("close-login").addEventListener("click", () => {
    document.getElementById("login-modal").classList.remove("active");
});

/* =========================
   LOGIN VALIDATION & SUBMIT
========================= */
const emailInput = document.getElementById('login-email');
const loginBtn = document.querySelector('.login-btn');

// Helper function to check strict email layouts
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Watch character strokes in real-time to toggle button activation state
emailInput.addEventListener('input', function() {
    const emailValue = emailInput.value.trim();

    if (isValidEmail(emailValue)) {
        loginBtn.disabled = false;
        loginBtn.style.opacity = "1";
        loginBtn.style.cursor = "pointer";
    } else {
        loginBtn.disabled = true;
        loginBtn.style.opacity = "0.5";
        loginBtn.style.cursor = "not-allowed";
    }
});

// Final credentials verification on successful activation click
loginBtn.addEventListener('click', function() {
    let password = document.getElementById("login-password").value;
    const emailValue  = emailInput.value.trim();
    let error = document.getElementById("login-error");
    
    // Creating a placeholder login error display if missing from your CSS styles
    let error = document.getElementById("login-error");
    if(!error) {
        error = document.createElement("p");
        error.id = "login-error";
        error.style.color = "red";
        error.style.marginTop = "10px";
        document.querySelector(".login-box").insertBefore(error, document.querySelector(".signup-text"));
    }

    /* PASSWORD VALIDATION */
    if(password.length < 6){
        error.style.color = "red";
        error.innerText = "Password must be at least 6 characters";
        return;
    }

    /* SUCCESS ACTIONS */
    error.style.color = "green";
    error.innerText = "Login Successful ✓";

    setTimeout(() => {
        document.getElementById("login-modal").classList.remove("active");
        error.innerText = "";
        emailInput.value = "";
        document.getElementById("login-password").value = "";
        
        // Reset login button back to safe disabled lock states
        loginBtn.disabled = true;
        loginBtn.style.opacity = "0.5";
        loginBtn.style.cursor = "not-allowed";
    }, 1500);
});