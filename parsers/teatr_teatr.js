const getHtml = require('../libs/getHtml.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/**
 * парсер с сайта https://teatr-teatr.com
 * @param {string} day - строковый день месяца (2, 3)
 * @param {string} month - строковый номер месяца (02, 03)
 * @returns {Object[]} массив обьектов событий
 */
async function getTeatrTeatrEvents(day, month) {
    let html;
    if (day == 'all') {
        html = await getHtml(`https://teatr-teatr.com/afisha/?month=${month}.2024`);
    } else {
        html = await getHtml(`https://teatr-teatr.com/afisha/?month=${month}.2024&day=${day}`);
    }

    const dom = new JSDOM(html);
    const document = dom.window.document;
    const site = 'https://teatr-teatr.com';

    const titleCollection = document.querySelectorAll('.poster-card__title > a');
    // const categoryCollection = document.querySelectorAll('.title');
    const dateCollection = document.querySelectorAll('.poster-card__date > .poster-card__day > .poster-card__number');
    const imgCollection = document.querySelectorAll('.poster-card__image > img');
    const urlCollection = document.querySelectorAll('.poster-card__title > a');
    
    const titles = Array.from(titleCollection).map(el => el.textContent.trim());
    const dates = Array.from(dateCollection).map(el => el.textContent.trim() + `.${month}`);
    const images = Array.from(imgCollection).map(el => site + el.src);
    const urls = Array.from(urlCollection).map(el => site + el.href);

    let dataEvents = [];
    for(let i = 0; i < titles.length; i++) {
        dataEvents[i] = {
            title: titles[i],
            category: 'Премьера',
            date: dates[i],
            image: images[i],
            url: urls[i]
        }
    }

    return dataEvents;
}

// getTeatrTeatrEvents('03', 'all');

module.exports = getTeatrTeatrEvents;