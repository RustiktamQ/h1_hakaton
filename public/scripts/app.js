function getRussianMonthName(monthNumber) {
    let monthNames = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];
  
    let monthIndex = parseInt(monthNumber, 10) - 1;
  
    if (monthIndex >= 0 && monthIndex < 12) {
      return monthNames[monthIndex];
    } else {
      return "Неверный номер месяца";
    }
  }

function parseDate(date) {
    let splitedDate = date.split(".");
    month = getRussianMonthName(splitedDate[1]);
    date = `${splitedDate[0]} ${month} ${splitedDate[2]}`;

    return date;
}

function showPreview(banner, title, category, date, url, id) {
    let bannerWindow = document.getElementById("previewBanner");
    let titlePlace = document.getElementById("previewTitle");
    let categoryPlace = document.getElementById("previewCategory");
    let datePlace = document.getElementById("previewDate");
    let urlPlace = document.getElementById("previewLink");
    let idPlace = document.getElementById("previewId");

    if (banner.includes("permkrai.ru")) {
        banner = "/assets/fillerImage.png";
    }
    bannerWindow.style.backgroundImage = `url(${banner})`;
    titlePlace.innerText = title;
    categoryPlace.innerText = category;
    datePlace.innerText = date;
    urlPlace.href = url;
    idPlace.innerText = id;
}   

async function sendGetRequest(number) {
    let container = document.getElementById("cardsList");

    let date = new Date();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let url = `/v1/getDay/${number}.${month}.${year}`;

    let result = await fetch(url);
    let data = await result.json();

    container.innerHTML = "";
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            let parsedDate = parseDate(data[i].date);

            let card = document.createElement("div");
            card.classList.add("activityCard");
            card.innerHTML = `<div class="topInfo">
                                  <div class="cardCategory">${data[i].category}</div>
                                  <a href="${data[i].url}" target="_blank" class="cardLink"><i class='bx bx-link-external'></i></a>
                              </div>
                              <div class="bottomInfo">
                                  <div class="cardTitle">${data[i].title}</div>
                                  <div class="cardDate">${parsedDate}</div>
                              </div>`;
            container.appendChild(card);

            if (i == 0) {
                showPreview(data[i].image, data[i].title, data[i].category, parsedDate, data[i].url, data[i].id);
            }

            card.addEventListener("click", function() {
                showPreview(data[i].image, data[i].title, data[i].category, parsedDate, data[i].url, data[i].id);
            });
        }
    } else {
        container.innerHTML = "<h1 class='errorOutput'>Мероприятий не найдено</h1>";
    }
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

let container = document.getElementById("calendar");
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
let lastDayOfMonth = new Date(nextMonthDate - 1);
let numberOfDays = lastDayOfMonth.getDate() + 1;


for (let i = 1; i < numberOfDays; i++) {
    let circle = document.createElement("div");
    circle.classList.add("selectDate");

    let today = new Date();
    let day = today.getDate()

    if (i == day) {
        circle.classList.add("selected");
        sendGetRequest(day);
    }
    circle.textContent = i;
    container.appendChild(circle);

    circle.addEventListener("click", function() {
        selectCircle(i);
        sendGetRequest(i);
    });
}


function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');

    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}
function cookieExists(cookieName) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');

    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName + "=") === 0) {
            return true;
        }
    }
    return false;
}

async function checkToken(token) {
    let url = `/v1/user/checkToken/${token}`;
    let result = await fetch(url);
    let data = await result.json();
    
    return data.code == 1;
}


async function wantToVisit(id, token) {
    let url = `/v1/visit/${id}`;

    let formData = new URLSearchParams();
    formData.append('token', token);

    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
    })
    let data = await result.json();

    return data;
}

async function disableVisit() {
    let button = document.getElementById("visitButton");
    if (cookieExists("token")) {
        if ((await checkToken(getCookie("token")))) {
            button.removeAttribute("disabled");
        } else {
            button.setAttribute('disabled', 'disabled');
        }
    } else {
        button.setAttribute('disabled', 'disabled');
    }

    button.addEventListener("click", async function() {
        let previewId = document.getElementById("previewId").innerText;
        await wantToVisit(previewId ,getCookie("token"));
    });
}

disableVisit();