// Get Firebase Auth instance
const auth = firebase.auth();

// Handle Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        })
        .catch((error) => {
            const errorMessage = error.message;
            showMessage(errorMessage, 'error');
        });
});

// Handle Register
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return user.updateProfile({
                displayName: fullName
            });
        })
        .then(() => {
            showMessage('Registration successful! Redirecting to login...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        })
        .catch((error) => {
            const errorMessage = error.message;
            showMessage(errorMessage, 'error');
        });
});

// Check Authentication Status
function checkAuth() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                reject('User not logged in');
            }
        });
    });
}

// Logout Function
function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
}

// Show Message Function
function showMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = type === 'error' ? 'error-message' : 'success-message';
    document.querySelector('.auth-box').appendChild(messageElement);
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

// Use this function to protect pages that require authentication
function requireAuth() {
    checkAuth().catch(() => {
        window.location.href = 'login.html';
    });
}
