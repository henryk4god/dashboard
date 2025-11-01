// assets/main.js
document.addEventListener('DOMContentLoaded', function() {
    // App configuration - ADD NEW APPS HERE
    const apps = [
        {
            id: 'Deliverance Prayer',
            title: 'Deliverance Prayer App',
            description: 'Daily Bible verses and devotional content to inspire your spiritual journey.',
            icon: '📖',
            url: 'apps/bible-devotional/index.html'
        },
        {
            id: 'dream-interpreter',
            title: 'Dream Interpreter',
            description: 'Understand the meaning behind your dreams with our interpretation tool.',
            icon: '💭',
            url: 'apps/dream-interpreter/index.html'
        },
        {
            id: 'prayer-generator',
            title: 'Prayer Generator',
            description: 'Generate personalized prayers for various occasions and needs.',
            icon: '🙏',
            url: 'apps/prayer-generator/index.html'
        },
        {
            id: 'markdown-ebook',
            title: 'Markdown Web eBook',
            description: 'Create and read eBooks in Markdown format with a beautiful interface.',
            icon: '📚',
            url: 'apps/markdown-ebook/index.html'
        }
        // ADD NEW APPS HERE - follow the same format as above
    ];

    const dashboard = document.getElementById('dashboard');
    const appContainer = document.getElementById('appContainer');
    const appsGrid = document.getElementById('appsGrid');
    const backButton = document.getElementById('backButton');
    const appTitle = document.getElementById('appTitle');
    const appFrame = document.getElementById('appFrame');

    // Generate app cards
    function renderAppCards() {
        appsGrid.innerHTML = '';
        
        apps.forEach(app => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.innerHTML = `
                <div class="app-icon">${app.icon}</div>
                <div class="app-card-content">
                    <h3>${app.title}</h3>
                    <p>${app.description}</p>
                    <button class="app-button" data-app-id="${app.id}">Open App</button>
                </div>
            `;
            appsGrid.appendChild(card);
        });

        // Add event listeners to app buttons
        document.querySelectorAll('.app-button').forEach(button => {
            button.addEventListener('click', function() {
                const appId = this.getAttribute('data-app-id');
                openApp(appId);
            });
        });
    }

    // Open an app in the iframe
    function openApp(appId) {
        const app = apps.find(a => a.id === appId);
        if (app) {
            appTitle.textContent = app.title;
            appFrame.src = app.url;
            
            // Show app container, hide dashboard
            dashboard.classList.add('hidden');
            appContainer.classList.remove('hidden');
        }
    }

    // Return to dashboard
    function returnToDashboard() {
        appFrame.src = '';
        appContainer.classList.add('hidden');
        dashboard.classList.remove('hidden');
    }

    // Event listeners
    backButton.addEventListener('click', returnToDashboard);

    // Initialize the dashboard
    renderAppCards();
});
