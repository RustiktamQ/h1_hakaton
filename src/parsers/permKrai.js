const getHtml = require('../libs/getHtml.js');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


async function getPermKraiEvents(pagen) {
    const html = await getHtml(`https://www.permkrai.ru/ajax/events/index.php?PAGEN_1=${pagen}`);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    let regex = /url\((.*?)\)/;

    // collections
    const titleCollection = document.querySelectorAll('.inner > p');
    const categoryCollection = document.querySelectorAll('.title');
    const dateCollection = document.querySelectorAll('.date');
    const imgCollection = document.querySelectorAll('.image');
    const urlCollection = document.querySelectorAll('a');

    // arrays
    const titles = Array.from(titleCollection).map(el => el.textContent);
    const categories = Array.from(categoryCollection).map(el => el.textContent);

    const dates = Array.from(dateCollection).map(el => {
        let stringDate = el.textContent.trim()
        return stringDate.slice(0, 5);
    });

    const images = Array.from(imgCollection).map(el => {
        return 'https://www.permkrai.ru' + el.style['background-image'].match(regex)[1]
    });

    const urls = Array.from(urlCollection).map(el => {
        return 'https://www.permkrai.ru' + el.href
    });

    let dataEvents = [];
    for(let i = 0; i < titles.length; i++) {
        dataEvents[i] = {
            title: titles[i],
            category: categories[i],
            date: dates[i],
            image: images[i],
            url: urls[i]
        }
    }

    console.log(dataEvents);
}

module.exports = getPermKraiEvents;