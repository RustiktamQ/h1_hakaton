const permKraiParser = require('../parsers/permKrai.js');
const svobodaPermParser = require('../parsers/svobodaPerm.js');
const teatrTeatrParser = require('../parsers/teatr_teatr.js');

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;

async function getMonthPermKrai(currentMonth) {
    const eventsPerMonth = [];
    let perm = await permKraiParser(1);
    let i = 0;
    let page = 0;

    while(true) {
        if (perm.length-1 == i) {
            page++;
            i = 0;
            perm = await permKraiParser(page);
        }

        const month = perm[i].date.split('.')[1];
        if (month < currentMonth) break;

        if (month == currentMonth) {
            eventsPerMonth.push(perm[i]);
        }

        i++;
    }

    return eventsPerMonth;
}

// getMonthPermKrai(currentMonth);

async function getMonthSvoboda(currentMonth) {
    const eventsPerMonth = [];
    let svoboda = await svobodaPermParser();


    for(let i = 0; i < svoboda.length; i++) {
        const month = svoboda[i].date.split('.')[1];

        if (month == currentMonth) {
            eventsPerMonth.push(svoboda[i]);
        }
    }

    return eventsPerMonth;
}

// getMonthSvoboda(currentMonth);

async function getMonthTeatrTeatr(currentMonth) {
    let teatrTeatr = await teatrTeatrParser('all', '0'+currentMonth);

    return teatrTeatr;
}

// getMonthTeatrTeatr(currentMonth);