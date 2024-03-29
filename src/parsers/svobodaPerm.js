const getHtml = require('../libs/getHtml.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/**
 * парсер с сайта https://svoboda-perm.ru/events
 * @returns {Object[]} массив обьектов событий
 */

async function getSvobodaPermEvents() {
    const html = await getHtml(`https://svoboda-perm.ru/events/`);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const site = 'https://svoboda-perm.ru/events';

    const titleCollection = document.querySelectorAll('.afisha-event > .afisha-info > a > h2');
    // const category;
    const dateCollection = document.querySelectorAll('.afisha-event > .afisha-info > .afisha-date > span');
    const imgCollection = document.querySelectorAll('.afisha-event > .afisha-image > picture > img');
    const urlCollection = document.querySelectorAll('.afisha-event > .afisha-meta > .afisha-more');


    const titles = Array.from(titleCollection).map(el => el.textContent.trim());
    const dates = Array.from(dateCollection).map(el => el.textContent.trim());
    const images = Array.from(imgCollection).map(el => el.src);
    const urls = Array.from(urlCollection).map(el => el.href);

    let dataEvents = [];
    for(let i = 0; i < titles.length; i++) {
        dataEvents[i] = {
            title: titles[i],
            category: 'svoboda_perm',
            date: dates[i],
            image: images[i],
            url: urls[i]
        }
    }

    return dataEvents;
}

// getSvobodaPermEvents();

module.exports = getSvobodaPermEvents;