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
const appFrame = document.getElementById('app-frame');
const backButton = document.getElementById('back-button');
const appTitle = document.getElementById('app-title');
const appFrameContainer = document.getElementById('app-frame-container');

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
    });
    
    // Back button
    backButton.addEventListener('click', closeApp);
}

// Open an app in the iframe
function openApp(appId) {
    const app = apps.find(a => a.id === appId);
    if (!app) return;
    
    // Update UI
    appTitle.textContent = app.name;
    
    // Show loading state
    appFrameContainer.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: #f8f9fa;">
            <div style="text-align: center;">
                <div class="loading" style="width: 40px; height: 40px; margin: 0 auto 20px;"></div>
                <p style="color: #6c757d; font-size: 1.1rem;">Loading ${app.name}...</p>
            </div>
        </div>
    `;
    
    // Load the app after a brief delay to show loading state
    setTimeout(() => {
        appFrameContainer.innerHTML = `<iframe id="app-frame" class="app-frame" src="${app.url}" frameborder="0"></iframe>`;
    }, 500);
    
    // Switch views
    dashboard.classList.add('hidden');
    appContainer.classList.remove('hidden');
    
    // Update the app frame reference
    setTimeout(() => {
        appFrame = document.getElementById('app-frame');
    }, 600);
}

// Close the app and return to dashboard
function closeApp() {
    // Clear iframe
    if (appFrameContainer) {
        appFrameContainer.innerHTML = '';
    }
    
    // Switch views
    appContainer.classList.add('hidden');
    dashboard.classList.remove('hidden');
}

// Handle browser back button
window.addEventListener('popstate', function(event) {
    if (!appContainer.classList.contains('hidden')) {
        closeApp();
    }
});

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);
