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

function getRussianMonthName(monthNumber) {
    const monthNames = [
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
  
    const monthIndex = parseInt(monthNumber, 10) - 1;
  
    if (monthIndex >= 0 && monthIndex < 12) {
      return monthNames[monthIndex];
    } else {
      return "Неверный номер месяца";
    }
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

async function checkToken(token) {
    let url = `/v1/user/checkToken/${token}`;
    let result = await fetch(url);
    let data = await result.json();
    
    return data.code == 1;
}

let token = getCookie("token");
async function checkAuthorization(token) {
    if (cookieExists("token")) {
        if (!(await checkToken(token))) {
            window.location.href = "/";
        }
    } else {
        window.location.href = "/";
    }
}

checkAuthorization(token);

async function getUserInfo(token) {
    let url = `/v1/user/getInfo/${token}`;
    let result = await fetch(url);
    let data = await result.json();
    
    return data;
}

async function getUserEvents(token) {
    let visitedEvents = (await getUserInfo(token)).visited_events;
    
    if (visitedEvents == null) {
        return null;
    }
    let events = "";
    for (let i = 0; i < visitedEvents.events.length; i++) {
        events += visitedEvents.events[i] + "&";
    }
    events = events.slice(0, -1);
    let url = `/v1/getEvents/${events}`;
    let result = await fetch(url);
    let data = await result.json();
    
    return data;
}

async function getUserName(token) {
    let userName = (await getUserInfo(token)).username;
    return userName;
}

function parseDate(date) {
    let splitedDate = date.split(".");
    month = getRussianMonthName(splitedDate[1]);
    date = `${splitedDate[0]} ${month} ${splitedDate[2]}`;

    return date;
}

function sanitizeString(input) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;'
  };
  
  const reg = /[&<>"'/]/ig;
  
  return input.replace(reg, (match) => (map[match]));
}

async function renderPage(token) {
    let userData = await getUserEvents(token);
    let container = document.getElementById("cardsList");
    if (userData != null) {
        for (let i = 0; i < userData.length; i++) {
            let parsedDate = parseDate(userData[i].date);

            let card = document.createElement("div");
            card.classList.add("activityCard");
            card.innerHTML = `<div class="topInfo">
                                  <div class="cardCategory">${userData[i].category}</div>
                                  <a href="${userData[i].url}" target="_blank" class="cardLink"><i class='bx bx-link-external'></i></a>
                              </div>
                              <div class="bottomInfo">
                                  <div class="cardTitle">${sanitizeString(userData[i].title)}</div>
                                  <div class="cardDate">${parsedDate}</div>
                              </div>`;
            container.appendChild(card);
        }
    } else {
        container.innerHTML = "<h1 class='errorOutput'>Нет посещений</h1>";
    }

    nameOfUser = await getUserName(token);
    document.getElementById("userName").innerHTML = nameOfUser;
}

renderPage(token);
