// Sample product data (replace with your actual product data)
const products = [
    {
        id: 1,
        name: "Smartphone X",
        price: 599.99,
        description: "Latest model with advanced features.",
        image: "images/smartphone-x.jpg"
    },
    {
        id: 2,
        name: "Laptop Pro",
        price: 1299.99,
        description: "Powerful laptop for professionals.",
        image: "images/laptop-pro.jpg"
    },
    // Add more products here
];

// products.js

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCountElement = document.getElementById('badge');
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification('Product added to cart!');
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p class="product-description">${product.description}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;

    return card;
}

function displayProducts() {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// Event delegation for add to cart buttons
document.getElementById('product-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.getAttribute('data-id');
        addToCart(productId);
    }
});

// Show notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Load products and update cart count when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p class="product-description">${product.description}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;

    return card;
}

function displayProducts() {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// Add to cart functionality
function addToCart(productId) {
    // Implement your add to cart logic here
    console.log(`Product ${productId} added to cart`);
}

// Event delegation for add to cart buttons
document.getElementById('product-container').addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = e.target.getAttribute('data-id');
        addToCart(productId);
    }
});

// Load products when the page is ready
document.addEventListener('DOMContentLoaded', displayProducts);
