// calendar.js

let calDate = new Date(2025, 11, 1); // Dec 2025
let selectedDate = null;
let selectedColor = 'blue';

let calEvents = [
    { id: 1, date: '2025-12-05', title: 'Community Meeting', class: 'bg-blue' },
    { id: 2, date: '2025-12-12', title: 'Health Drive', class: 'bg-green' },
    { id: 3, date: '2025-12-18', title: 'Holiday', class: 'bg-red' },
    { id: 4, date: '2025-12-22', title: 'Training', class: 'bg-purple' },
    { id: 5, date: '2025-12-27', title: 'Town Hall', class: 'bg-orange' }
];

function initCalendar() {
    renderCalGrid();
}

function changeMonth(offset) {
    calDate.setMonth(calDate.getMonth() + offset);
    renderCalGrid();
}

function renderCalGrid() {
    const grid = document.getElementById('calendar-grid');
    if(!grid) return; // Stop if calendar HTML isn't loaded

    const year = calDate.getFullYear();
    const month = calDate.getMonth();

    const monthDisplay = document.getElementById('month-display');
    if(monthDisplay) {
        monthDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    grid.innerHTML = '';

    // Empty cells
    for(let i=0; i<firstDayIndex; i++) {
        const div = document.createElement('div');
        div.className = 'cal-cell';
        div.style.backgroundColor = '#f9fafb';
        grid.appendChild(div);
    }

    // Day cells
    for(let day=1; day<=daysInMonth; day++) {
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const dayEvents = calEvents.filter(e => e.date === dateStr);
        const isSelected = selectedDate && selectedDate.getDate() === day;

        const cell = document.createElement('div');
        cell.className = `cal-cell ${isSelected ? 'active-day' : ''}`;
        cell.onclick = () => openSidebar(year, month, day);

        let html = `<span class="cal-num">${day}</span>`;
        dayEvents.forEach(ev => {
            html += `<div class="cal-event ${ev.class}">${ev.title}</div>`;
        });

        cell.innerHTML = html;
        grid.appendChild(cell);
    }
}

// Sidebar functions
function openSidebar(year, month, day) {
    selectedDate = new Date(year, month, day);
    document.getElementById('selected-date-display').textContent = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    document.getElementById('cal-sidebar').classList.add('open');
    renderCalGrid();
}

function closeSidebar() {
    document.getElementById('cal-sidebar').classList.remove('open');
    selectedDate = null;
    renderCalGrid();
}

function addEvent() {
    const title = document.getElementById('event-title-input').value.trim();
    if (!title || !selectedDate) {
        alert("Please enter a title");
        return;
    }

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');

    calEvents.push({
        id: Date.now(),
        date: `${year}-${month}-${day}`,
        title: title,
        class: 'bg-blue' // Default color
    });

    renderCalGrid();
    closeSidebar();
}