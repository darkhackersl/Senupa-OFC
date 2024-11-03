// script.js

// Cart functionality
let cartCount = 0;
let cartItems = [];

function updateCartBadge() {
    const badge = document.getElementById('badge');
    if (badge) {
        badge.innerHTML = cartCount;
    }
}

function addToCart(productId, productName, price, image) {
    cartCount++;
    cartItems.push({
        id: productId,
        name: productName,
        price: price,
        image: image,
        quantity: 1
    });
    updateCartBadge();
    saveCartToLocalStorage();
    showNotification('Product added to cart!');
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartCount', cartCount);
}

function loadCartFromLocalStorage() {
    const savedItems = localStorage.getItem('cartItems');
    const savedCount = localStorage.getItem('cartCount');
    if (savedItems) {
        cartItems = JSON.parse(savedItems);
    }
    if (savedCount) {
        cartCount = parseInt(savedCount);
        updateCartBadge();
    }
}

// Search functionality
function searchProducts() {
    const searchInput = document.getElementById('input');
    const searchTerm = searchInput.value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Image slider functionality
function initializeSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('#containerSlider img');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.style.display = 'none');
        slides[index].style.display = 'block';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-slide every 3 seconds
    setInterval(nextSlide, 3000);

    // Initialize first slide
    showSlide(currentSlide);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Product detail page functionality
function loadProductDetails(productId) {
    fetch(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${productId}`)
        .then(response => response.json())
        .then(product => {
            displayProductDetails(product);
        })
        .catch(error => {
            console.error('Error loading product details:', error);
            showNotification('Error loading product details');
        });
}

function displayProductDetails(product) {
    const container = document.getElementById('productDetails');
    if (container) {
        container.innerHTML = `
            <h1>${product.name}</h1>
            <h4>${product.brand}</h4>
            <div class="price">Price: Rs ${product.price}</div>
            <div class="description">${product.description}</div>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.preview}')">
                Add to Cart
            </button>
        `;
    }
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    
    // Initialize slider if it exists
    if (document.getElementById('containerSlider')) {
        initializeSlider();
    }

    // Add search functionality
    const searchInput = document.getElementById('input');
    if (searchInput) {
        searchInput.addEventListener('input', searchProducts);
    }
});

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #333;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        animation: fadeIn 0.5s, fadeOut 0.5s 2.5s;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    .error {
        border: 1px solid red;
    }
`;
document.head.appendChild(style);
