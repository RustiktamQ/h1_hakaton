const mysql = require("mysql2");
const express = require('express');
const router = express.Router();

router.get('/getEvent/all', async (_, res) => {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "event_lents",
        password: ''
      }).promise();
      
    const allEvents = (await connection.query("SELECT * FROM events"))[0];

    res.status(200).json(allEvents);
    connection.end();
});

router.get('/getDay/:date', async (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "event_lents",
    password: ''
  }).promise();

  const date = req.params.date;
  const sql = "SELECT * FROM events WHERE date = ?";
  const eventsPerDay = (await connection.query(sql, [date]))[0];

  res.status(200).json(eventsPerDay);
  connection.end();
});

router.get('/getExpired', async (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "event_lents",
    password: ''
  }).promise();

  const currentDate = new Date();
  const day = ('0' + currentDate.getDate()).slice(-2);
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const year = currentDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  const sql = "SELECT * FROM `events` WHERE date < ?";
  const eventsExpired = (await connection.query(sql, [formattedDate]))[0];

  res.status(200).json(eventsExpired);
  connection.end();
});

module.exports = router;