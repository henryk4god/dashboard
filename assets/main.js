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
const appsGrid = document.getElementById('apps-grid');
const appViews = document.getElementById('app-views');
const globalBackButton = document.getElementById('global-back-button');

// State management
let currentAppId = null;
const appCache = new Map();

// Initialize the dashboard
function initDashboard() {
    renderAppCards();
    setupEventListeners();
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
    // App card buttons
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

// Open an app
async function openApp(appId) {
    const app = apps.find(a => a.id === appId);
    if (!app) return;
    
    currentAppId = appId;
    
    // Update URL without reload
    window.history.pushState({ appId }, '', `#${appId}`);
    
    // Hide dashboard and show back button
    dashboard.classList.remove('active-view');
    dashboard.classList.add('hidden-view');
    globalBackButton.classList.remove('hidden');
    
    // Check if app is already loaded
    let appView = document.getElementById(`app-${appId}`);
    
    if (!appView) {
        // Create new app view
        appView = document.createElement('div');
        appView.id = `app-${appId}`;
        appView.className = 'app-view';
        appView.innerHTML = `
            <div class="app-view-header">
                <div class="app-view-title">${app.name}</div>
            </div>
            <div class="app-view-content">
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">Loading ${app.name}...</div>
                </div>
            </div>
        `;
        appViews.appendChild(appView);
        
        // Load the app content
        await loadAppContent(app, appView);
    }
    
    // Show the app view
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.remove('active');
    });
    appView.classList.add('active');
}

// Load app content
async function loadAppContent(app, appView) {
    try {
        const response = await fetch(app.url, {
            mode: 'cors',
            headers: {
                'Accept': 'text/html'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract the main content (you might need to adjust this based on your app structure)
        let content = doc.querySelector('main') || doc.querySelector('.container') || doc.querySelector('.app') || doc.body;
        
        // Create a container for the mini app
        const miniApp = document.createElement('div');
        miniApp.className = 'mini-app';
        miniApp.innerHTML = content.innerHTML;
        
        // Update the app view
        const appContent = appView.querySelector('.app-view-content');
        appContent.innerHTML = '';
        appContent.appendChild(miniApp);
        
        // Cache the loaded app
        appCache.set(app.id, miniApp.innerHTML);
        
        // Re-initialize any scripts (basic approach)
        reinitializeScripts(miniApp);
        
    } catch (error) {
        console.error('Error loading app:', error);
        showErrorState(app, appView, error);
    }
}

// Basic script reinitialization (for simple apps)
function reinitializeScripts(container) {
    // Remove existing scripts to avoid duplicates
    const existingScripts = container.querySelectorAll('script');
    existingScripts.forEach(script => script.remove());
    
    // Find and re-execute script tags (basic implementation)
    const scriptTags = container.querySelectorAll('script');
    scriptTags.forEach(oldScript => {
        const newScript = document.createElement('script');
        
        if (oldScript.src) {
            // External script
            newScript.src = oldScript.src;
        } else {
            // Inline script
            newScript.textContent = oldScript.textContent;
        }
        
        // Copy attributes
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        
        container.appendChild(newScript);
    });
}

// Show error state
function showErrorState(app, appView, error) {
    const appContent = appView.querySelector('.app-view-content');
    appContent.innerHTML = `
        <div class="error-state">
            <div class="error-icon">⚠️</div>
            <div class="error-text">
                Failed to load ${app.name}.<br>
                <small>${error.message}</small>
            </div>
            <button class="retry-button" onclick="retryLoadApp('${app.id}')">Retry</button>
        </div>
    `;
}

// Retry loading an app
function retryLoadApp(appId) {
    const appView = document.getElementById(`app-${appId}`);
    const app = apps.find(a => a.id === appId);
    
    if (app && appView) {
        loadAppContent(app, appView);
    }
}

// Close current app
function closeCurrentApp() {
    if (!currentAppId) return;
    
    // Hide current app view
    const currentAppView = document.getElementById(`app-${currentAppId}`);
    if (currentAppView) {
        currentAppView.classList.remove('active');
    }
    
    // Show dashboard
    dashboard.classList.remove('hidden-view');
    dashboard.classList.add('active-view');
    globalBackButton.classList.add('hidden');
    
    // Update URL
    window.history.pushState({}, '', window.location.pathname);
    
    currentAppId = null;
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);

// Handle initial URL hash
window.addEventListener('load', function() {
    if (window.location.hash) {
        const appId = window.location.hash.substring(1);
        const app = apps.find(a => a.id === appId);
        if (app) {
            setTimeout(() => openApp(appId), 100);
        }
    }
});
