// checkout.js

document.addEventListener('DOMContentLoaded', function() {
    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Display cart summary
    displayCartSummary(cart);
    
    // Handle form submission
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
});

function displayCartSummary(cart) {
    const cartSummaryDiv = document.getElementById('cart-summary');
    let subtotal = 0;
    const
