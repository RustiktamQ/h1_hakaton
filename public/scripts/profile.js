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
    let url = `/v1/user/getInfo/${token}`;
    let result = await fetch(url);
    let data = await result.json();
    
    return data;
}

let userData = getUserInfo(token);

async function renderPage(userData) {

}