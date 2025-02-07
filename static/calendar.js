document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.querySelector('.calendar');
    const currentDate = new Date();
    let displayedMonth = currentDate.getMonth();
    let displayedYear = currentDate.getFullYear();

    function renderCalendar(month, year) {
        calendar.innerHTML = '<h1>Calendar</h1>';

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        const calendarHeader = document.createElement('div');
        calendarHeader.className = 'calendar-header';
        calendarHeader.innerHTML = `
            <button class="prev-month">&#9664;</button>
            <span>${monthNames[month]} ${year}</span>
            <button class="next-month">&#9654;</button>
        `;
        calendar.appendChild(calendarHeader);

        const calendarBody = document.createElement('div');
        calendarBody.className = 'calendar-body';
        calendar.appendChild(calendarBody);

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            calendarBody.appendChild(dayElement);
        });

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-cell empty';
            calendarBody.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-cell';
            dayCell.textContent = day;
            if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                dayCell.classList.add('current-day');
            }
            calendarBody.appendChild(dayCell);
        }

        document.querySelector('.prev-month').addEventListener('click', () => {
            displayedMonth--;
            if (displayedMonth < 0) {
                displayedMonth = 11;
                displayedYear--;
            }
            renderCalendar(displayedMonth, displayedYear);
        });

        document.querySelector('.next-month').addEventListener('click', () => {
            displayedMonth++;
            if (displayedMonth > 11) {
                displayedMonth = 0;
                displayedYear++;
            }
            renderCalendar(displayedMonth, displayedYear);
        });
    }

    renderCalendar(displayedMonth, displayedYear);
});
