// Add these new functions to your existing main.js

// Support Popup Functions
function initSupportPopup() {
    const supportToggle = document.getElementById('support-toggle');
    const supportPopup = document.getElementById('support-popup');
    const closeSupport = document.getElementById('close-support');
    
    // Show popup when toggle is clicked
    supportToggle.addEventListener('click', function() {
        supportPopup.classList.remove('hidden');
    });
    
    // Close popup when X is clicked
    closeSupport.addEventListener('click', closeSupportPopup);
    
    // Close popup when clicking outside the card
    supportPopup.addEventListener('click', function(e) {
        if (e.target === supportPopup) {
            closeSupportPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !supportPopup.classList.contains('hidden')) {
            closeSupportPopup();
        }
    });
    
    // Show popup automatically after 3 seconds on first visit
    setTimeout(() => {
        const hasSeenPopup = localStorage.getItem('hasSeenSupportPopup');
        if (!hasSeenPopup) {
            supportPopup.classList.remove('hidden');
            localStorage.setItem('hasSeenSupportPopup', 'true');
        }
    }, 3000);
}

function closeSupportPopup() {
    const supportPopup = document.getElementById('support-popup');
    supportPopup.classList.add('hidden');
}

function copyAccountNumber() {
    const accountNumber = document.getElementById('account-number');
    const copyBtn = document.querySelector('.copy-btn');
    
    navigator.clipboard.writeText('2023268027').then(() => {
        // Visual feedback
        copyBtn.textContent = '✅';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = '📋';
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = '2023268027';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyBtn.textContent = '✅';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
            copyBtn.textContent = '📋';
            copyBtn.classList.remove('copied');
        }, 2000);
    });
}

function handleSupport() {
    const supportCard = document.querySelector('.support-card');
    
    // Show success message
    supportCard.innerHTML = `
        <div class="support-success">
            <div class="success-icon">🎉</div>
            <h4>Thank You for Your Support!</h4>
            <p>Your generosity is greatly appreciated and will help us continue our ministry work.</p>
            <p><strong>God bless you abundantly!</strong></p>
            <button class="support-btn primary" onclick="closeSupportPopup()" style="margin-top: 20px;">
                Close
            </button>
        </div>
    `;
    
    // Track support (you can integrate with analytics here)
    console.log('User indicated they supported the ministry');
}

// Update your existing initDashboard function to include support popup
function initDashboard() {
    renderAppCards();
    setupEventListeners();
    initSupportPopup(); // Add this line
    
    // Check for deep linking
    if (window.location.hash && !window.location.hash.startsWith('#support')) {
        const appId = window.location.hash.substring(1);
        const app = apps.find(a => a.id === appId);
        if (app) {
            setTimeout(() => openApp(appId), 500);
        }
    }
}

// Make support functions globally available
window.copyAccountNumber = copyAccountNumber;
window.handleSupport = handleSupport;
window.closeSupportPopup = closeSupportPopup;

// The rest of your existing JavaScript remains the same...
// [Keep all your existing app functionality code here]

// App data - Add your apps here
const apps = [
    {
        id: 'daily-devotional',
        name: 'Daily Devotional',
        description: 'Daily Bible teachings and inspirational content for spiritual growth and deeper connection with God.',
        url: 'https://henryk4god.github.io/daily-bible-teaching/',
        icon: '📖'
    },
    {
        id: 'prayer-system-guide',
        name: 'Prayer System Guide',
        description: 'A comprehensive guide to developing and maintaining an effective prayer system for consistent spiritual practice.',
        url: 'https://henryk4god.github.io/Prayer-System-/',
        icon: '🙏'
    },
    {
        id: 'warfare-prayer',
        name: 'Daily Warfare Prayer',
        description: 'Powerful spiritual warfare prayers for protection, victory, and overcoming daily spiritual battles.',
        url: 'https://henryk4god.github.io/warfare/',
        icon: '🛡️'
    },
    {
        id: 'freedom-prayer',
        name: 'Freedom Prayer',
        description: 'Transformative prayers focused on deliverance, healing, and finding true freedom in Christ.',
        url: 'https://henryk4god.github.io/Ascestra-Prayer-Freedom-/',
        icon: '🕊️'
    },
    {
        id: 'dream-interpreter',
        name: 'Dream Interpreter',
        description: 'Biblical tools and resources for interpreting dreams and understanding spiritual messages.',
        url: 'https://michyritebiz.systeme.io/dinterp',
        icon: '💭'
    },
    {
        id: 'prayer-tracker',
        name: 'Prayer Tracker',
        description: 'Track your prayer requests, monitor progress, and witness how God answers prayers over time.',
        url: 'https://henryk4god.github.io/Prayer-Tracker-/',
        icon: '📝'
    },
    {
        id: 'intercessors-template',
        name: 'Intercessors Template',
        description: 'Essential resources and templates for building and maintaining intercessory prayer ministry.',
        url: 'https://henryk4god.github.io/Intercessors-Template-/',
        icon: '✝️'
    }
    // ADD NEW APPS HERE - Follow the same format as above
    /*
    {
        id: 'your-app-id',
        name: 'Your App Name',
        description: 'Brief description of what the app does',
        url: 'https://your-github-username.github.io/repository-name/',
        icon: '🔤'
    },
    */
];

// DOM Elements
const dashboard = document.getElementById('dashboard');
const appContainer = document.getElementById('app-container');
const appsGrid = document.getElementById('apps-grid');
const globalBackButton = document.getElementById('global-back-button');

// State management
let currentAppId = null;

// Initialize the dashboard
function initDashboard() {
    renderAppCards();
    setupEventListeners();
    
    // Check for deep linking
    if (window.location.hash) {
        const appId = window.location.hash.substring(1);
        const app = apps.find(a => a.id === appId);
        if (app) {
            setTimeout(() => openApp(appId), 500);
        }
    }
}

// Render app cards in the dashboard
function renderAppCards() {
    appsGrid.innerHTML = '';
    
    apps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <div class="app-icon">${app.icon}</div>
            <div class="app-content">
                <h3>${app.name}</h3>
                <p>${app.description}</p>
                <button class="app-button" data-app-id="${app.id}">Open App</button>
            </div>
        `;
        appsGrid.appendChild(card);
    });
}

// Set up event listeners
function setupEventListeners() {
    // App card buttons and cards
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('app-button')) {
            const appId = e.target.getAttribute('data-app-id');
            openApp(appId);
        }
        
        if (e.target.closest('.app-card')) {
            const card = e.target.closest('.app-card');
            const button = card.querySelector('.app-button');
            if (button && !e.target.classList.contains('app-button')) {
                const appId = button.getAttribute('data-app-id');
                openApp(appId);
            }
        }
    });
    
    // Global back button
    globalBackButton.addEventListener('click', closeCurrentApp);
    
    // Handle browser back button
    window.addEventListener('popstate', function(event) {
        if (currentAppId) {
            closeCurrentApp();
        }
    });
}

// Open an app in full-screen iframe
function openApp(appId) {
    const app = apps.find(a => a.id === appId);
    if (!app) return;
    
    currentAppId = appId;
    
    // Update URL for deep linking
    window.history.pushState({ appId }, '', `#${appId}`);
    
    // Show loading state
    showLoadingState(app);
    
    // Hide dashboard and show app container
    dashboard.classList.remove('active-view');
    dashboard.classList.add('hidden-view');
    appContainer.classList.add('active');
    globalBackButton.classList.remove('hidden');
    
    // Create and load iframe
    loadAppInIframe(app);
}

// Show loading state
function showLoadingState(app) {
    appContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading ${app.name}...</div>
        </div>
    `;
}

// Load app in iframe
function loadAppInIframe(app) {
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.className = 'app-iframe';
    iframe.src = app.url;
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    
    // Handle iframe load
    iframe.onload = function() {
        console.log(`${app.name} loaded successfully`);
    };
    
    // Handle iframe errors
    iframe.onerror = function() {
        showErrorState(app, new Error('Failed to load application'));
    };
    
    // Replace loading with iframe after a short delay to show loading state
    setTimeout(() => {
        appContainer.innerHTML = '';
        appContainer.appendChild(iframe);
    }, 1000);
}

// Show error state
function showErrorState(app, error) {
    appContainer.innerHTML = `
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <div class="error-title">Unable to Load ${app.name}</div>
            <div class="error-text">
                There was a problem loading the application.<br>
                <small>Error: ${error.message}</small>
            </div>
            <button class="retry-button" onclick="retryAppLoad('${app.id}')">Try Again</button>
            <button class="retry-button" onclick="closeCurrentApp()" style="margin-top: 10px; background: #6c757d;">Back to Dashboard</button>
        </div>
    `;
}

// Retry loading an app
function retryAppLoad(appId) {
    const app = apps.find(a => a.id === appId);
    if (app) {
        openApp(appId);
    }
}

// Close current app and return to dashboard
function closeCurrentApp() {
    if (!currentAppId) return;
    
    // Clear app container
    appContainer.innerHTML = '';
    appContainer.classList.remove('active');
    
    // Show dashboard
    dashboard.classList.remove('hidden-view');
    dashboard.classList.add('active-view');
    globalBackButton.classList.add('hidden');
    
    // Update URL
    if (window.location.hash) {
        window.history.pushState({}, '', window.location.pathname);
    }
    
    currentAppId = null;
}

// Make functions globally available for HTML onclick
window.retryAppLoad = retryAppLoad;
window.closeCurrentApp = closeCurrentApp;

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);
