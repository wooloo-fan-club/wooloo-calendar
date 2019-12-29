var { RedditSimple } = require("reddit-simple")
const Swal = require('sweetalert2')

let today = new Date()
let currentMonth = today.getMonth()
let currentYear = today.getFullYear()
let selectYear = document.getElementById("year")
let selectMonth = document.getElementById("month")

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

let monthAndYear = document.getElementById("monthAndYear")
document.getElementById("month").onchange = () => {
    jump();
}

document.getElementById("year").onchange = () => {
    jump();
}

document.getElementById("next").onclick = () => {
    next();
}

document.getElementById("previous").onclick = () => {
    previous();
}

showCalendar(currentMonth, currentYear)

function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
    let firstDay = new Date(year, month).getDay()
    let daysInMonth = 32 - (new Date(year, month, 32).getDate())

    let tbl = document.getElementById("calendar-body")

    tbl.innerHTML = ''
    monthAndYear.innerHTML = months[month] + " " + year
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth) {
                break;
            }

            else {
                let cell = document.createElement("td");
                cell.onclick = () => {
                    RedditSimple.RandomPost('wooloo').then((post) => {
                        let data = post[0].data
                        let title = data.title
                        let url = data.url
                        if (url != null) {
                            Swal.fire({
                                title: data.title,
                                imageUrl: url,
                                imageHeight: 400,
                                confirmButtonText: 'Thank you Wooloo! Baaaaaa!'
                            })
                        } else {
                            Swal.fire({
                                title: data.title,
                                confirmButtonText: 'Thank you Wooloo! Baaaaaa!'
                            }
                            )
                        };
                    }
                    )
                }
                let cellText = document.createTextNode(date);
                if (year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth()) || (date > today.getDate() && month === today.getMonth() && year === today.getFullYear())) {
                    cell.style.color = '#d1d8e3';
                    cell.onclick = function () {
                        return false;
                    };
                }// color dates that havent happened
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

