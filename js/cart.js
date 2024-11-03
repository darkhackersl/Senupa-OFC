// cart.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    cartContainer.appendChild(totalElement);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== parseInt(productId));
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('badge');
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartCount();
});

// Event delegation for remove buttons
document.getElementById('cart-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item')) {
        const productId = e.target.getAttribute('data-id');
        removeFromCart(productId);
    }
});
