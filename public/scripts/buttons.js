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


async function renderButtons() {
    let mainHeader = document.getElementById('mainHeaderButtons');
    let mobileHeader = document.getElementById('mobileHeaderButtons');
    if (cookieExists("token")) {
        let token = getCookie("token");
        let exist = await checkToken(token);

        if (exist) {
            mainHeader.innerHTML = `<a href="/profile/" class="profileButton">Профиль</a><button class="mobileNavButton" onclick="openMobNav()"><i class='bx bx-menu'></i></button>`;
            mobileHeader.innerHTML = `<a href="/profile/" class="mobProfileButton">Профиль</a>`;
        } else {
            mainHeader.innerHTML = `<a href="/login/" class="navLink">Войти</a>
            <a href="/register/" class="profileButton">Регистрация</a>
            <button class="mobileNavButton" onclick="openMobNav()"><i class='bx bx-menu'></i></button>`;
            mobileHeader.innerHTML = `<a href="/login/" class="mobNavLink">Войти</a>
            <a href="/register/" class="mobProfileButton">Регистрация</a>`;
        }
    } else {
        mainHeader.innerHTML = `<a href="/login/" class="navLink">Войти</a>
        <a href="/register/" class="profileButton">Регистрация</a>
        <button class="mobileNavButton" onclick="openMobNav()"><i class='bx bx-menu'></i></button>`;
        mobileHeader.innerHTML = `<a href="/login/" class="mobNavLink">Войти</a>
        <a href="/register/" class="mobProfileButton">Регистрация</a>`;
    }
}

renderButtons()