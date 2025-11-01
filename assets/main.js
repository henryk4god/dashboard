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
