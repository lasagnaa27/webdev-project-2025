const announcementData = [
    { title: "Annual Barangay Fiesta", date: "Dec 15, 2025", category: "Community Events", desc: "Join us for food and games.", color: "#3b82f6" },
    { title: "Free Medical Check-up", date: "Dec 05, 2025", category: "Health Services", desc: "Bring your health cards.", color: "#22c55e" },
    { title: "Flood Warning", date: "Nov 28, 2025", category: "Advisory", desc: "Heavy rainfall expected.", color: "#ef4444" }
];

function initAnnouncements() {
    renderFilters();
    renderList('All');
}

function renderFilters() {
    const container = document.getElementById('announcement-filters');
    if(!container) return;
    const filters = ['All', 'Community Events', 'Health Services', 'Advisory'];

    container.innerHTML = filters.map(f =>
        `<button class="filter-btn ${f === 'All' ? 'active' : ''}" onclick="filterAnnouncements('${f}', this)">${f}</button>`
    ).join('');
}

function filterAnnouncements(category, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
    renderList(category);
}

function renderList(filter) {
    const list = document.getElementById('announcements-list');
    const filtered = filter === 'All' ? announcementData : announcementData.filter(a => a.category === filter);

    list.innerHTML = filtered.map(item => `
        <div class="announce-card" style="border-left-color: ${item.color}">
            <div class="card-header">
                <h3 class="card-title">${item.title}</h3>
                <span class="priority-badge">HIGH</span>
            </div>
            <div class="card-meta">
                <span>${item.date}</span>
                <span class="category-badge" style="background:${item.color}">${item.category}</span>
            </div>
            <p class="card-desc">${item.desc}</p>
        </div>
    `).join('');
}

// Open the modal
function openModal() {
    document.getElementById('announcement-modal').classList.remove('hidden');
}

// Close the modal
function closeModal() {
    document.getElementById('announcement-modal').classList.add('hidden');
}

// Save the new announcement
function saveAnnouncement(event) {
    event.preventDefault(); // Stop page refresh

    // 1. Get values from inputs
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const dateInput = document.getElementById('date').value;
    const desc = document.getElementById('desc').value;

    // 2. Determine color based on category
    let color = "#3b82f6"; // Default blue
    if(category === "Health Services") color = "#22c55e"; // Green
    if(category === "Advisory") color = "#ef4444";        // Red

    // 3. Add to the array (Format date slightly to match your style)
    const newAnnouncement = {
        title: title,
        date: new Date(dateInput).toDateString().split(' ').slice(1).join(' '), // Ex: "Oct 24 2025"
        category: category,
        desc: desc,
        color: color
    };

    announcementData.unshift(newAnnouncement); // Add to top of list

    // 4. Refresh the list and close modal
    renderList('All');
    closeModal();
    document.getElementById('add-form').reset(); // Clear form
}

// --- Modal Logic ---

function openModal() {
    const modal = document.getElementById('announcement-modal');
    if (modal) {
        modal.classList.remove('hidden');
    } else {
        console.error("Error: Modal HTML element not found!");
    }
}

function closeModal() {
    const modal = document.getElementById('announcement-modal');
    if (modal) modal.classList.add('hidden');
}

function saveAnnouncement(event) {
    event.preventDefault(); // Stop page reload

    // Get values
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const dateInput = document.getElementById('date').value;
    const desc = document.getElementById('desc').value;

    // Set color
    let color = "#3b82f6";
    if(category === "Health Services") color = "#22c55e";
    if(category === "Advisory") color = "#ef4444";

    // Add to list
    const newItem = {
        title,
        date: dateInput,
        category,
        desc,
        color
    };

    // Add to top of array and refresh
    announcementData.unshift(newItem);
    renderList('All');

    // Close and cleanup
    closeModal();
    document.getElementById('add-form').reset();
}