// officials.js

let officials = [
    { id: 1, name: "je arr", position: "Captain", committee: "Committee on Peace & Order", contact: "0912-345-6789", status: "Active" },
    { id: 2, name: "althea", position: "Secretary", committee: "Office Admin", contact: "0998-765-4321", status: "Active" },
    { id: 3, name: "rein", position: "Kagawad", committee: "Committee on Infrastructure", contact: "0911-222-3333", status: "Inactive" }
];

let currentStatus = "Active";

function initOfficials() {
    console.log("Officials Loaded");
    renderOfficials();
}

function renderOfficials() {
    const grid = document.getElementById('officials-grid');
    if(!grid) return; // Stop if HTML is missing

    grid.innerHTML = officials.map(official => {
        const initials = official.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const statusColor = official.status === 'Active' ? 'status-active' : 'status-inactive';

        return `
            <div class="official-card">
                <div class="profile-avatar">${initials}</div>
                <h3 class="off-name">${official.name}</h3>
                <div class="off-role">${official.position}</div>
                
                <div class="off-details">
                    ${official.committee ? `<div class="detail-row"><i data-lucide="briefcase" width="14"></i> ${official.committee}</div>` : ''}
                    <div class="detail-row"><i data-lucide="phone" width="14"></i> ${official.contact || 'No contact'}</div>
                    <div class="detail-row" style="margin-top:8px; font-weight:500;">
                        <span class="status-dot ${statusColor}"></span> ${official.status}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Sidebar Logic
function openOfficialSidebar() {
    const sidebar = document.getElementById('official-sidebar');
    if(sidebar) sidebar.classList.add('open');
}

function closeOfficialSidebar() {
    const sidebar = document.getElementById('official-sidebar');
    if(sidebar) sidebar.classList.remove('open');
}

function addOfficial() {
    const name = document.getElementById('off-name').value;
    const position = document.getElementById('off-position').value;

    if(!name) { alert("Please enter a name"); return; }

    officials.push({
        id: Date.now(),
        name,
        position,
        committee: document.getElementById('off-committee').value,
        contact: document.getElementById('off-contact').value,
        status: currentStatus
    });

    renderOfficials();
    closeOfficialSidebar();
}