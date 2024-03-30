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

    
    let eventsFromDB = (await connection.query("SELECT * FROM events_per_month"))[0];
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


    events.forEach((el) => {
        let thisEvents = [el.title, el.category, el.date, el.image, el.url];
        let sql = "INSERT INTO events_per_month(title, category, date, image, url) VALUES (?, ?, ?, ?, ?)";
     
        connection.query(sql, thisEvents, (err) => {
            if(err) console.log(err);
        });
    });
    
    connection.end();
    events = [];
}

updater();