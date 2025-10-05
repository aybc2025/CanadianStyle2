// ===================================
// Canadian Style Learner - Auth.js
// Simple Authentication with localStorage
// ===================================

// Check if user is already logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.includes('index.html')) {
        window.location.href = 'dashboard.html';
    } else if (!currentUser && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'index.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Toggle between login and register
    const registerBtn = document.getElementById('registerBtn');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    
    if (registerBtn) {
        registerBtn.addEventListener('click', showRegisterForm);
    }
    
    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', showLoginForm);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

// Handle Login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Create session
        const sessionData = {
            email: user.email,
            name: user.name,
            loginTime: new Date().toISOString(),
            remember: remember
        };
        
        localStorage.setItem('currentUser', JSON.stringify(sessionData));
        
        // Update last login
        user.lastLogin = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        showError('error-message', 'Invalid email or password. Please try again.');
    }
}

// Handle Register
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
    
    // Validation
    if (password.length < 6) {
        showError('register-error-message', 'Password must be at least 6 characters long.');
        return;
    }
    
    if (password !== passwordConfirm) {
        showError('register-error-message', 'Passwords do not match.');
        return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        showError('register-error-message', 'An account with this email already exists.');
        return;
    }
    
    // Create new user
    const newUser = {
        name: name,
        email: email,
        password: password, // In production, this should be hashed!
        createdAt: new Date().toISOString(),
        lastLogin: null
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Initialize user progress
    const userProgress = {
        email: email,
        chapters: {},
        quizzes: {},
        stats: {
            totalChaptersCompleted: 0,
            totalQuizzesTaken: 0,
            overallProgress: 0,
            streak: 0
        }
    };
    
    // Get all progress data
    const allProgress = JSON.parse(localStorage.getItem('userProgress') || '[]');
    allProgress.push(userProgress);
    localStorage.setItem('userProgress', JSON.stringify(allProgress));
    
    // Show success and redirect to login
    showSuccess('register-error-message', 'Account created successfully! Please sign in.');
    
    setTimeout(() => {
        showLoginForm();
    }, 1500);
}

// Handle Logout
function handleLogout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser && !currentUser.remember) {
        localStorage.removeItem('currentUser');
    } else {
        // Keep session but mark as logged out
        localStorage.removeItem('currentUser');
    }
    
    window.location.href = 'index.html';
}

// Show/Hide Forms
function showRegisterForm() {
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.register-form').style.display = 'block';
    hideError('error-message');
    hideError('register-error-message');
}

function showLoginForm() {
    document.querySelector('.login-form').style.display = 'block';
    document.querySelector('.register-form').style.display = 'none';
    hideError('error-message');
    hideError('register-error-message');
}

// Error/Success Messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.className = 'error-message';
    }
}

function showSuccess(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.className = 'success-message';
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Get current user
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Get user progress
function getUserProgress(email) {
    const allProgress = JSON.parse(localStorage.getItem('userProgress') || '[]');
    const userProgress = allProgress.find(p => p.email === email);
    
    if (!userProgress) {
        // Initialize if not exists
        const newProgress = {
            email: email,
            chapters: {},
            quizzes: {},
            stats: {
                totalChaptersCompleted: 0,
                totalQuizzesTaken: 0,
                overallProgress: 0,
                streak: 0
            }
        };
        allProgress.push(newProgress);
        localStorage.setItem('userProgress', JSON.stringify(allProgress));
        return newProgress;
    }
    
    return userProgress;
}

// Save user progress
function saveUserProgress(email, progressData) {
    const allProgress = JSON.parse(localStorage.getItem('userProgress') || '[]');
    const index = allProgress.findIndex(p => p.email === email);
    
    if (index !== -1) {
        allProgress[index] = progressData;
        localStorage.setItem('userProgress', JSON.stringify(allProgress));
        return true;
    }
    
    return false;
}

// Export functions for use in other files
window.auth = {
    getCurrentUser,
    getUserProgress,
    saveUserProgress,
    handleLogout
};
