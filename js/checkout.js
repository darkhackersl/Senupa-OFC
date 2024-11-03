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
    const cartItemsHtml = cart.map(item => {
        subtotal += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');
    
    cartSummaryDiv.innerHTML = cartItemsHtml;
    
    // Update subtotal, shipping, and total amounts
    document.getElementById('subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total-amount').textContent = `$${(subtotal + 5).toFixed(2)}`;
}

function handleCheckout(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(document.getElementById('checkoutForm'));
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const apartment = formData.get('apartment');
    const city = formData.get('city');
    const state = formData.get('state');
    const zipCode = formData.get('zipCode');
    const paymentMethod = formData.get('paymentMethod');
    
    // Process payment and send order to server
    // (Implement your payment gateway integration here)
    
    // Clear cart and localStorage
    localStorage.removeItem('cart');
    window.location.href = 'order-success.html';
}
