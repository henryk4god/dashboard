// App data - Add your apps here
const apps = [
    {
        id: 'daily-devotional',
        name: 'Daily Devotional',
        description: 'Daily Bible teachings and inspirational content for spiritual growth.',
        url: 'https://henryk4god.github.io/daily-bible-teaching/',
        icon: '📖'
    },
    {
        id: 'prayer-system-guide',
        name: 'Prayer System Guide',
        description: 'A comprehensive guide to developing and maintaining an effective prayer system.',
        url: 'https://henryk4god.github.io/Prayer-System-/',
        icon: '🙏'
    },
    {
        id: 'warfare-prayer',
        name: 'Daily Warfare Prayer',
        description: 'Spiritual warfare prayers for protection and victory in daily battles.',
        url: 'https://henryk4god.github.io/warfare/',
        icon: '🛡️'
    },
    {
        id: 'freedom-prayer',
        name: 'Freedom Prayer',
        description: 'Prayers focused on deliverance and finding freedom in Christ.',
        url: 'https://henryk4god.github.io/Ascestra-Prayer-Freedom-/',
        icon: '🕊️'
    },
    {
        id: 'dream-interpreter',
        name: 'Dream Interpreter',
        description: 'Tools and resources for interpreting dreams from a biblical perspective.',
        url: 'https://henryk4god.github.io/dream/',
        icon: '💭'
    },
    {
        id: 'prayer-tracker',
        name: 'Prayer Tracker',
        description: 'Track your prayer requests and see how God answers them over time.',
        url: 'https://henryk4god.github.io/Prayer-Tracker-/',
        icon: '📝'
    },
    {
        id: 'intercessors-template',
        name: 'Intercessors Template',
        description: 'Resources and templates for intercessory prayer ministry.',
        url: 'https://henryk4god.github.io/Intercessors-Template-/',
        icon: '✝️'
    }
    // ADD NEW APPS HERE - Follow the same format as above
];

// DOM Elements
const dashboard = document.getElementById('dashboard');
const appContainer = document.getElementById('app-container');
const appsGrid = document.getElementById('apps-grid');
const appFrame = document.getElementById('app-frame');
const backButton = document.getElementById('back-button');
const appTitle = document.getElementById('app-title');

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
    appFrame.src = app.url;
    
    // Switch views
    dashboard.classList.add('hidden');
    appContainer.classList.remove('hidden');
}

// Close the app and return to dashboard
function closeApp() {
    // Clear iframe
    appFrame.src = '';
    
    // Switch views
    appContainer.classList.add('hidden');
    dashboard.classList.remove('hidden');
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);
