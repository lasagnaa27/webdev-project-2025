// admin.js

function loadModule(moduleName) {
    // 1. Update Title and Sidebar
    const titleElement = document.getElementById('page-title');
    if(titleElement) {
        titleElement.innerText = moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
    }

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const navLink = document.getElementById(`nav-${moduleName}`);
    if(navLink) navLink.classList.add('active');

    // 2. Fetch the HTML content
    const contentArea = document.getElementById('content-area');

    fetch(`${moduleName}.html`)
        .then(response => {
            if (!response.ok) throw new Error("Page not found");
            return response.text();
        })
        .then(html => {
            // 3. Inject the HTML
            contentArea.innerHTML = html;

            // 4. Re-initialize Icons (Lucide)
            if(window.lucide) lucide.createIcons();

            // 5. TRIGGER THE SPECIFIC SCRIPT
            // This is the part that fixes the "empty" or "frozen" pages
            switch(moduleName) {
                case 'dashboard':
                    if (typeof initDashboard === 'function') initDashboard();
                    break;
                case 'announcements':
                    if (typeof initAnnouncements === 'function') initAnnouncements();
                    break;
                case 'calendar':
                    if (typeof initCalendar === 'function') initCalendar();
                    break;
                case 'officials':
                    if (typeof initOfficials === 'function') initOfficials();
                    break;
            }
        })
        .catch(err => {
            contentArea.innerHTML = `<p style="color:red; padding: 20px;">Error loading page: ${err.message}</p>`;
        });
}

// Load Dashboard by default when the page opens
document.addEventListener('DOMContentLoaded', () => {
    loadModule('dashboard');
});