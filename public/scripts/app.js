let container = document.getElementById("calendar");

function sendGetRequest(number) {
    let url = "http://127.0.0.1:5500/public/?day=" + number;

    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("GET запрос отправлен успешно.");
            } else {
                console.error("Ошибка при отправке GET запроса:", response.statusText);
            }
        })
        .catch(error => {
            console.error("Ошибка при отправке GET запроса:", error);
        });
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