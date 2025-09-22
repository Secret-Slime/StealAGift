import { loadLoginForm, loadRegistrationForm, loadGiftForm, loadUndefinedRecieverView } from './script.js';

// Main application initialization
export function initApp() {
    // Create the main app container if it doesn't exist
    let appContainer = document.getElementById('app');
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.id = 'app';
        document.body.appendChild(appContainer);
    }

    // Check if user is already logged in
    const userId = localStorage.getItem('userId');
    const receiver = localStorage.getItem('receiver');

    if (userId) {
        // User is logged in
        if (receiver && receiver !== 'null') {
            // User has a receiver, load gift form
            loadGiftForm(userId);
        } else {
            // User needs to pick a receiver
            loadUndefinedRecieverView();
        }
        // Show logout button, hide login/register
        document.getElementById('logoutBtn').style.display = 'inline-block';
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('registerBtn').style.display = 'none';
    } else {
        // User is not logged in, show login form
        loadLoginForm();
        // Show login/register buttons, hide logout
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('loginBtn').style.display = 'inline-block';
        document.getElementById('registerBtn').style.display = 'inline-block';
    }
}

// Navigation functions (make them global for HTML onclick)
window.showLogin = function() {
    loadLoginForm();
};

window.showRegister = function() {
    loadRegistrationForm();
};

window.logout = function() {
    localStorage.removeItem('userId');
    localStorage.removeItem('receiver');
    localStorage.removeItem('username');
    initApp();
};

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
