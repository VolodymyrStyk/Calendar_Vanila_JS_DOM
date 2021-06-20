const showCalendar = () => {
    tableContainer.style.visibility.toString() === 'visible' ? tableContainer.style.visibility = 'hidden' : tableContainer.style.visibility = 'visible';
}

const getMonthStartDay = (year, month) => {
    return new Date(year, month, 1).getDay();
}

const checkIntercalaryMonth = (year) => {
    return (year % 4 !== 0 || year % 100 === 0 && year % 400 !== 0);
}

const getQuantityMonthDays = (year, month) => {
    if (month === 1) {
        if (checkIntercalaryMonth(year)) {
            return 29;
        } else {
            return 28;
        }
    }
    if ([-1, 0, 2, 4, 6, 7, 9, 11].includes(month)) {
        return 31;
    }
    if ([3, 5, 8, 10].includes(month)) {
        return 30;
    }
}

const renderCalendarData = (year = initYear, month = initMonth) => {
    calendarDataAll.innerText = '';
    const listOfDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const tableRowTitle = document.createElement('div');
    tableRowTitle.classList.add('calendar-row-title');
    for (const listOfDay of listOfDays) {
        const tableData = document.createElement('div');
        tableData.classList.add('calendar-days-title');
        tableData.innerText = listOfDay;
        tableRowTitle.append(tableData);
    }
    calendarDataAll.appendChild(tableRowTitle);

    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth();
    const currDay = currDate.getDate();

    let day = 1;
    let nextMonthStartDay = 1;
    const lastDayInPreviousMonth = getQuantityMonthDays(year, month - 1);

    let lastDayInMonth = getQuantityMonthDays(year, month);
    let firstDayWeek = getMonthStartDay(year, month);
    let startDateRender = lastDayInPreviousMonth - firstDayWeek;

    for (let i = 0; i < 6; i++) {
        const tableRow = document.createElement('div');
        tableRow.classList.add('calendar-row');
        for (let j = 0; j < 7; j++) {
            const tableData = document.createElement('div');
            tableData.classList.add('calendar-days');
            if (!(i || firstDayWeek <= j) && (day < lastDayInMonth)) {
                startDateRender++;
                tableData.innerText = ' ' + startDateRender + ' ';
                tableData.classList.add('non-active-days');
                tableRow.appendChild(tableData);
            }
            if ((i || firstDayWeek <= j) && (day <= lastDayInMonth)) {
                !j ? tableData.classList.add('table-sunday') : tableData.classList.add('table-usual')
                tableData.innerText = ' ' + day + ' ';
                tableRow.appendChild(tableData);
                if ((currYear === initYear) && (currMonth === initMonth) && (currDay === day)) {
                    tableData.classList.add('calendar-today');
                    tableData.innerHTML = `<div>${day}</div><div class="today-text">TODAY</div>`;
                }
                day++;
            }
            if (day > lastDayInMonth) {
                if (!tableData.innerText){
                    tableData.innerText = ' ' + nextMonthStartDay + ' ';
                    tableData.classList.add('non-active-days');
                    tableRow.appendChild(tableData);
                    nextMonthStartDay++;
                }
            }
        }
        calendarDataAll.appendChild(tableRow);
    }
    tableContainer.appendChild(calendarDataAll);
    document.body.appendChild(tableContainer);
}


const reRenderTable = (action) => {
    if (action === 'next') {
        if (initMonth >= 11) {
            initYear++;
            initMonth = 0;
        } else {
            initMonth++;
        }
    }
    if (action === 'previous') {
        if (initMonth === 0) {
            initYear--;
            initMonth = 11;
        } else {
            initMonth--;
        }
    }
    titleMonth.innerText = new Intl.DateTimeFormat('en-US', monthOptions).format(new Date(initYear, initMonth)).toUpperCase();
    titleYear.innerText = new Intl.DateTimeFormat('en-US', yearOptions).format(new Date(initYear, initMonth));
    renderCalendarData(initYear, initMonth);
}

const initDate = new Date();
let initYear = initDate.getFullYear();
let initMonth = initDate.getMonth();

//Create title
const tableContainer = document.createElement('div');
tableContainer.classList.add('table-container');
tableContainer.style.visibility = 'hidden';

const tableControl = document.createElement('div');
tableControl.classList.add('table-control');

const nextMonth = document.createElement('button');
nextMonth.innerHTML = '&#8250';
nextMonth.classList.add('btn-next');
nextMonth.onclick = function () {
    reRenderTable('next');
};

const previousMonth = document.createElement('button');
previousMonth.innerHTML = '&#8249';
previousMonth.classList.add('btn-previous');
previousMonth.onclick = function () {
    reRenderTable('previous');
};

const titleYear = document.createElement('span');
let yearOptions = {
    year: 'numeric'
};
titleYear.innerText = new Intl.DateTimeFormat('en-US', yearOptions).format(initDate);
titleYear.classList.add('title-year');

const titleMonth = document.createElement('span');
let monthOptions = {
    month: 'long',
};
titleMonth.innerText = new Intl.DateTimeFormat('en-US', monthOptions).format(initDate).toUpperCase();
titleMonth.classList.add('title-month');

tableControl.appendChild(previousMonth);
tableControl.appendChild(titleMonth);
tableControl.appendChild(titleYear);
tableControl.appendChild(nextMonth);
tableContainer.appendChild(tableControl);
const calendarDataAll = document.createElement('div');
calendarDataAll.classList.add('table-data-container');

renderCalendarData();
