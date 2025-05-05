/**
 * Concatenates two objects and all of their values
 * 
 * @param {Object} object1
 * @param {Object} object2
 * @returns {Object} A new object with all the values of object1 and object2
 * 
 * @example
 * let obj1 = {1: ['a'], 2: ['b']};
 * let obj2 = {2: ['c', 'd'], 3: ['e']};
 * 
 * let concat = concatEvents(obj1, obj2);
 * assert(concat == {1: ['a'], 2: ['b', 'c', 'd'], 3: ['e']});
 */
function concatEvents(object1, object2) {

    // not sure if these copies are necessary...
    let return_obj = structuredClone(object1);
    let object2_copy = structuredClone(object2);
    for (const key in object2_copy) {
        if (return_obj[key]) {
            return_obj[key] = return_obj[key].concat(object2_copy[key]);
        } else {
            return_obj[key] = object2_copy[key];
        }
    }
    return return_obj;
}

/**
 * checks if date1 is before date2
 * 
 * @param {String} date1 in the format 'MM-DD-YYYY'
 * @param {String} date2 in the format 'MM-DD-YYYY'
 * @returns {Boolean} true if date1 is before date2, false otherwise
 */
function dateBefore(date1, date2) {

    if (!date1 || !date2) {
        return false;
    }
    let date1_split = date1.split('-');
    let date2_split = date2.split('-');
    for (let i = 0; i < date1_split.length; i++) {
        if (parseInt(date1_split[i]) < parseInt(date2_split[i])) {
            return true;
        } else if (parseInt(date1_split[i]) > parseInt(date2_split[i])) {
            return false;
        }
    }
    return false;
}

function test_concatEvents() {
    let obj1 = {1: ['a'], 2: ['b']};
    let obj2 = {2: ['c', 'd'], 3: ['e']};

    console.log(obj1);
    console.log(obj2);

    let concat = concatEvents(obj1, obj2);

    console.log(concat);

    obj1[1].shift();
    obj1[2].shift();

    console.log(concat);

    obj2[2].shift();
    obj2[3].shift();

    console.log(concat);
}

/**
 * adds the flyers associated with an event to the page
 * 
 * @param {Object} event
 */
function addEventFlyer(event) {
    console.log(event);
    const eventFlyer = document.createElement('img');
    eventFlyer.src = `/assets/event-assets/${event.image}`;
    eventFlyer.alt = event.title;
    eventFlyer.className = 'event-flyer';

    const eventFlyerContainer = document.getElementById('events-flyers');
    eventFlyerContainer.appendChild(eventFlyer);
}

/**
 * clears all the event flyers from the page
 */
function clearEventFlyers() {
    const eventFlyerContainer = document.getElementById('events-flyers');
    eventFlyerContainer.innerHTML = '';
}

/**
 * deselects all elements with the given selector
 * 
 * @param {String} selector
 */
function deselectAll(selector) {
    document.querySelectorAll(selector).forEach(element => {
        element.classList.remove('selected');
    });
}

/**
 * dynamically sets the right margin of the last flyer in the events-flyers container
 * 
 * @todo doesn't work, approximating with css rn
 */
function updateLastFlyerMargin() {
    const flyersContainer = document.querySelector('.events-flyers');
    const flyers = flyersContainer.querySelectorAll('.event-flyer');
    const lastFlyer = flyers[flyers.length - 1];

    if (lastFlyer) {
        const containerWidth = flyersContainer.offsetWidth;
        const flyerWidth = lastFlyer.offsetWidth;
        const marginRight = containerWidth - flyerWidth;

        lastFlyer.style.marginRight = `${marginRight}px`;
    }
}

let months_visited = []; // strings of the form 'MM-YYYY'
let events_flyers_locked = false;
let selected_date;

/**
 * sets up the calendar
 */
function calendarSetup() {
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

        let month_str = `${month + 1}-${year}`;
        for (let day = 1; day <= daysInMonth; day++) {
            let combined_events_obj = concatEvents(events_obj, recurring_events_obj);
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-cell';

            const dayCellText = document.createElement('div');
            dayCellText.className = 'day';
            dayCellText.textContent = day;
            dayCell.appendChild(dayCellText);
            if (day == currentDate.getDate() && month == currentDate.getMonth() && year == currentDate.getFullYear()) {
                dayCell.classList.add('current-day');
            }
            let date = new Date(year, month, day);
            let date_str = date.toISOString().split('T')[0].trim();

            const eventContainerElement = document.createElement('div');
            eventContainerElement.className = 'calendar-event-marker-container';
            dayCell.appendChild(eventContainerElement);
            
            if (combined_events_obj[date_str]) {
                combined_events_obj[date_str].forEach(event => {
                    const eventElement = document.createElement('div');
                    eventElement.className = 'calendar-event-marker';
                    eventElement.textContent = '•';
                    eventContainerElement.appendChild(eventElement);

                    if (months_visited.indexOf(month_str) == -1 &&
                        event['recurrence_period'] != 'None' &&
                        dateBefore(date_str, event['recurrence_end_date'])) {
                        
                        let recurrance_period_map = {
                            'Daily': 1,
                            'Weekly': 7,
                            'Biweekly': 14,
                            'Monthly': 30,
                            'Yearly': 365
                        };
                        let recurrance_period_days = recurrance_period_map[event.recurrence_period];
                        let next_day = date.getDate() + recurrance_period_days;
                        
                        next_month = date.getMonth();
                        next_year = date.getFullYear();
                        if (next_day > daysInMonth) {
                            next_day = next_day - daysInMonth;
                            next_month++;
                            if (next_month > 11) {
                                next_month = 0;
                                next_year++;
                            }
                        }

                        let next_date = new Date(`${next_month + 1}-${next_day}-${next_year}`);
                        
                        // next_date.setDate(next_date.getDate() + recurrance_period_days);
                        let next_date_str = next_date.toISOString().split('T')[0].trim();
                        if (!recurring_events_obj[next_date_str]) {
                            recurring_events_obj[next_date_str] = [];
                        }
                        recurring_events_obj[next_date_str].push(event);
                    }

                });
            }
            
            // BUG: if you select a day and then select another day without unclicking the first one, weird things happen
            dayCell.addEventListener('mouseover', () => {
                if (!combined_events_obj[date_str] || events_flyers_locked) {
                    return;
                }
                combined_events_obj[date_str].forEach(event => {
                    addEventFlyer(event);
                });
            });
            dayCell.addEventListener('click', () => {
                if (events_flyers_locked && selected_date != date_str) {
                    selected_date = date_str;
                    deselectAll('.calendar-cell');
                    clearEventFlyers();
                    combined_events_obj[date_str].forEach(event => {
                        addEventFlyer(event);
                    });
                    dayCell.classList.add('selected');
                } else {
                    events_flyers_locked = !events_flyers_locked;
                    selected_date = date_str;
    
                    if (events_flyers_locked) {
                        dayCell.classList.add('selected');
                    } else {
                        dayCell.classList.remove('selected');
                    }
                }

            });
            dayCell.addEventListener('mouseout', () => {
                if (!events_flyers_locked) {
                    clearEventFlyers();
                }
            });
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

        if (months_visited.indexOf(month_str) == -1){
            months_visited.push(`${month + 1}-${year}`);
        }
    }

    renderCalendar(displayedMonth, displayedYear);
}

let events_obj = {}
let recurring_events_obj = {} // holds next occurance of recurring events
let header = []

document.addEventListener('DOMContentLoaded', () => {
    fetch("/data/events.csv")
        .then(response => response.text())
        .then(text => text.split('\n'))
        .then(events => events.forEach((event, index) => {
            if (index == 0) {
                header = event.split(',');
                header.forEach((value, index) => {header[index] = value.trim()});
            } else {
                let event_obj = {}

                let letter_index = 0;
                let value_index = 0;
                let current_value = '';
                let escaping = false;
                while (true) {

                    if (!escaping) {
                        if (letter_index == event.length || 
                            event[letter_index] == ',') {
                            current_value = current_value.trim();
                            event_obj[header[value_index]] = current_value;
                            current_value = '';
                            value_index++;
                        } else if (event[letter_index] == '"') {
                            escaping = true;
                        } else {
                            current_value += event[letter_index];
                        }
                    } else if (escaping) {
                        if (event[letter_index] == '"') {
                            escaping = false;
                        } else {
                            current_value += event[letter_index];
                        }
                    } 
                    
                    if (letter_index >= event.length) {
                        break;
                    }

                    letter_index++;
                }

                // console.log(event_obj);
                let date_str = String(event_obj['date']).trim();
                if (!events_obj[date_str]) {
                    events_obj[date_str] = [];
                }
                
                events_obj[date_str].push(event_obj);
            }
        }))
        .then(() => calendarSetup())
        .catch(error => console.error(error));    

    // updateLastFlyerMargin();
    
});