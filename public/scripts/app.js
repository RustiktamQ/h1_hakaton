let container = document.getElementById("calendar");

async function sendGetRequest(number) {
    const date = new Date();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let url = `http://localhost:3000/v1/getDay/${number}.${month}.${year}`;

    let result = await fetch(url);
    console.log(result.body)
}

function selectCircle(selectedIndex) {
    let circles = document.querySelectorAll(".selectDate");
    circles.forEach((circle, index) => {
        if (index === selectedIndex - 1) {
            circle.classList.add("selected");
        } else {
            circle.classList.remove("selected");
        }
    });
}

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
let lastDayOfMonth = new Date(nextMonthDate - 1);
let numberOfDays = lastDayOfMonth.getDate() + 1;


for (let i = 1; i < numberOfDays; i++) {
    let circle = document.createElement("div");
    circle.classList.add("selectDate");
    if (i == 29) {
        circle.classList.add("selected");
    }
    circle.textContent = i;
    container.appendChild(circle);

    circle.addEventListener("click", function() {
        selectCircle(i);
        sendGetRequest(i);
    });
}