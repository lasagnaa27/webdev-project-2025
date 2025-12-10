// dashboard.js

// Mock Data
const dashboardData = {
    totalAnnouncements: 12,
    totalEvents: 45,
    todaysEvent: {
        title: "Quarterly Barangay Assembly",
        time: "2:00 PM - 4:00 PM",
        location: "Barangay Hall Main Court"
    },
    recentAnnouncement: {
        title: "Scheduled Power Interruption",
        date: "Dec 8, 2025",
        excerpt: "Notice of power interruption for Zone 3 and 4 due to maintenance works by MERALCO."
    }
};

function initDashboard() {
    console.log("Dashboard Loaded");
    loadDashboardData();
}

function loadDashboardData() {
    // Helper to safely set text content
    const setSafeText = (id, text) => {
        const el = document.getElementById(id);
        if(el) el.textContent = text;
    };

    setSafeText('total-announcements-count', dashboardData.totalAnnouncements);
    setSafeText('total-events-count', dashboardData.totalEvents);

    // Load Today's Event
    const eventContainer = document.getElementById('todays-event-content');
    if (eventContainer && dashboardData.todaysEvent) {
        eventContainer.classList.remove('placeholder-content');
        eventContainer.innerHTML = `
            <div style="margin-bottom: 8px; font-weight: 600; font-size: 1.1em; color: white;">
                ${dashboardData.todaysEvent.title}
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <i data-lucide="clock" width="16"></i> ${dashboardData.todaysEvent.time}
            </div>
             <div style="display: flex; align-items: center; gap: 8px;">
                <i data-lucide="map-pin" width="16"></i> ${dashboardData.todaysEvent.location}
            </div>
        `;
    }

    // Load Recent Announcement
    const announceContainer = document.getElementById('recent-announcement-content');
    if (announceContainer && dashboardData.recentAnnouncement) {
        announceContainer.innerHTML = `
            <div style="text-align: left; width: 100%;">
                <div style="font-weight: 600; font-size: 1.05em; color: white; margin-bottom: 4px;">
                    ${dashboardData.recentAnnouncement.title}
                </div>
                 <div style="font-size: 0.85em; color: #94a3b8; margin-bottom: 12px;">
                    ${dashboardData.recentAnnouncement.date}
                </div>
                <p style="line-height: 1.5;">
                    "${dashboardData.recentAnnouncement.excerpt}"
                </p>
            </div>
        `;
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}