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

function parseDate(date) {
    let splitedDate = date.split(".");
    month = getRussianMonthName(splitedDate[1]);
    date = `${splitedDate[0]} ${month} ${splitedDate[2]}`;

    return date;
}

async function sendGetRequest() {
    let container = document.getElementById("cardsList");

    let url = `http://localhost:3000/v1/getExpired`;

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
        }
    } else {
        container.innerHTML = "<h1 class='errorOutput'>Мероприятий не найдено</h1>";
    }
}

sendGetRequest();