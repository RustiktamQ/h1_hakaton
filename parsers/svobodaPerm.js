const getHtml = require('../libs/getHtml.js');
const convertedMonths = require('../libs/convertMonths.js');
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
    const daysCollection = document.querySelectorAll('.afisha-event > .afisha-info > .afisha-date > span');
    const monthsCollection = document.querySelectorAll('.afisha-event > .afisha-info > .afisha-date');
    const imgCollection = document.querySelectorAll('.afisha-event > .afisha-image > picture > img');
    const urlCollection = document.querySelectorAll('.afisha-event > .afisha-meta > .afisha-more');


    const titles = Array.from(titleCollection).map(el => el.textContent.trim());
    const days = Array.from(daysCollection).map(el => el.textContent.trim());
    const months = Array.from(monthsCollection).map(el => {
        const textParts = el.textContent.trim().split('\t');
        const month = textParts[0].split(' ');
        return month[1];
    });
    const images = Array.from(imgCollection).map(el => el.src);
    const urls = Array.from(urlCollection).map(el => el.href);

    let dataEvents = [];
    for(let i = 0; i < titles.length; i++) {
        dataEvents[i] = {
            title: titles[i],
            category: 'Концерт',
            date: days[i] + '.' + convertedMonths[months[i]],
            image: images[i],
            url: urls[i]
        }
    }

    return dataEvents;
}

module.exports = getSvobodaPermEvents;