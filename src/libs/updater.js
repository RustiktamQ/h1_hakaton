const mysql = require('mysql2');
const getPerMonth = require('./getEventsMonth.js');

const updater = async () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'event_lents',
        password: ''
    }).promise();

    let eventsParsed = await getPerMonth.all();
    let tempTitles = [];
    let eventsParsedUniq = [
        
    ]
    eventsParsed.forEach(el => {
        if (!tempTitles.includes(el.title)) {
            tempTitles.push(el.title);
            eventsParsedUniq.push(el);
        }
    });

    
    let eventsFromDB = (await connection.query("SELECT * FROM events"))[0];
    let events = [];

    let flag
    eventsParsedUniq.forEach(parsed => {
        flag = true;
        eventsFromDB.forEach(db => {
            if (parsed.title == db.title) flag = false;
            return;
        });

        if (flag) events.push(parsed);
    });

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    events.forEach((el) => {
        let thisEvents = [el.title, el.category, el.date+`.${currentYear}`, el.image, el.url];
        let sql = "INSERT INTO events(title, category, date, image, url) VALUES (?, ?, ?, ?, ?)";
     
        connection.query(sql, thisEvents, (err) => {
            if(err) console.log(err);
        });
    });
    
    connection.end();
    events = [];
}

module.exports = {
    updater: updater,
    startUpdaterPerDay: function() {
        const month = 24 * 60 * 60 * 1000;
        setInterval(this.updater, month);
    }
};