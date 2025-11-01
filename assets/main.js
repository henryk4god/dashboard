// App data - Add your apps here
const apps = [
    {
        id: 'daily-devotional',
        name: 'Daily Devotional',
        description: 'Daily Bible teachings and inspirational content for spiritual growth and deeper connection with God.',
        url: 'https://henryk4god.github.io/daily-bible-teaching/',
        icon: '📖',
        type: 'external'
    },
    {
        id: 'prayer-system-guide',
        name: 'Prayer System Guide',
        description: 'A comprehensive guide to developing and maintaining an effective prayer system for consistent spiritual practice.',
        url: 'https://henryk4god.github.io/Prayer-System-/',
        icon: '🙏',
        type: 'external'
    },
    {
        id: 'warfare-prayer',
        name: 'Daily Warfare Prayer',
        description: 'Powerful spiritual warfare prayers for protection, victory, and overcoming daily spiritual battles.',
        url: 'https://henryk4god.github.io/warfare/',
        icon: '🛡️',
        type: 'external'
    },
    {
        id: 'freedom-prayer',
        name: 'Freedom Prayer',
        description: 'Transformative prayers focused on deliverance, healing, and finding true freedom in Christ.',
        url: 'https://henryk4god.github.io/Ascestra-Prayer-Freedom-/',
        icon: '🕊️',
        type: 'external'
    },
    {
        id: 'dream-interpreter',
        name: 'Dream Interpreter',
        description: 'Biblical tools and resources for interpreting dreams and understanding spiritual messages.',
        url: 'https://henryk4god.github.io/dream/',
        icon: '💭',
        type: 'external'
    },
    {
        id: 'prayer-tracker',
        name: 'Prayer Tracker',
        description: 'Track your prayer requests, monitor progress, and witness how God answers prayers over time.',
        url: 'https://henryk4god.github.io/Prayer-Tracker-/',
        icon: '📝',
        type: 'external'
    },
    {
        id: 'intercessors-template',
        name: 'Intercessors Template',
        description: 'Essential resources and templates for building and maintaining intercessory prayer ministry.',
        url: 'https://henryk4god.github.io/Intercessors-Template-/',
        icon: '✝️',
        type: 'external'
    }
    // ADD NEW APPS HERE - Follow the same format as above
    /*
    {
        id: 'your-app-id',
        name: 'Your App Name',
        description: 'Brief description of what the app does',
        url: 'https://your-github-username.github.io/repository-name/',
        icon: '🔤',
        type: 'external'
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
const appCache = new Map();

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

// Open an app in full-width container
async function openApp(appId) {
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
    
    try {
        // Load app content
        await loadAppContent(app);
    } catch (error) {
        console.error('Error loading app:', error);
        showErrorState(app, error);
    }
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

// Load app content
async function loadAppContent(app) {
    // Check cache first
    if (appCache.has(app.id)) {
        appContainer.innerHTML = appCache.get(app.id);
        reinitializeAppScripts();
        return;
    }
    
    try {
        // Fetch the app content
        const response = await fetch(app.url);
        if (!response.ok) {
            throw new Error(`Failed to load: ${response.status} ${response.statusText}`);
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract the main content - adjust selectors based on your app structure
        let contentElement = doc.querySelector('main') || 
                            doc.querySelector('.container') || 
                            doc.querySelector('.app-container') ||
                            doc.querySelector('#app') ||
                            doc.body;
        
        // Create a clean container for the app
        const appContent = document.createElement('div');
        appContent.className = 'app-content-full';
        appContent.innerHTML = contentElement.innerHTML;
        
        // Cache the content
        appCache.set(app.id, appContent.innerHTML);
        
        // Display the app
        appContainer.innerHTML = '';
        appContainer.appendChild(appContent);
        
        // Reinitialize scripts
        reinitializeAppScripts();
        
    } catch (error) {
        throw error;
    }
}

// Reinitialize scripts for the loaded app
function reinitializeAppScripts() {
    const scripts = appContainer.querySelectorAll('script');
    
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        
        // Copy all attributes
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        
        // Handle external scripts
        if (oldScript.src) {
            newScript.src = oldScript.src;
        } else {
            // Handle inline scripts
            newScript.textContent = oldScript.textContent;
        }
        
        // Replace the old script with new one
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
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
