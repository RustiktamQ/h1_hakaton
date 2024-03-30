const mysql = require('mysql2');
const config = require('../config.js');
const express = require('express');
const eventRouter = express.Router();

const urlencodedParser = express.urlencoded({extended: false});

eventRouter.get('/getEvent/all', async (_, res) => {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        database: config.database,
        password: config.password,
      }).promise();
      
    const allEvents = (await connection.query("SELECT * FROM events"))[0];

    res.status(200).json(allEvents);
    connection.end();
});

eventRouter.get('/getDay/:date', async (req, res) => {
  const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
  }).promise();

  const date = req.params.date;
  const sql = "SELECT * FROM events WHERE date = ?";
  const eventsPerDay = (await connection.query(sql, [date]))[0];

  res.status(200).json(eventsPerDay);
  connection.end();
});

eventRouter.get('/getExpired', async (req, res) => {
  const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
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

eventRouter.post('/visit/:id', urlencodedParser, async (req, res) => {
  const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password,
  }).promise();

  const token = req.body.token;
  const idEvent = req.params.id;

  const sqlCheck = "SELECT * FROM events WHERE id = ?";
  let resultCheck = (await connection.query(sqlCheck, [idEvent]))[0];

  if (resultCheck.length < 1) {
    res.status(404).json({"message": "Такого события нету!", "code": -2});
    return false;
  }

  const sqlGetVisited = "SELECT visited_events FROM users WHERE token = ?";
  let resultVisited = (await connection.query(sqlGetVisited, [token]))[0][0].visited_events;

  let visitedEvents;
  if (resultVisited == null) {
    visitedEvents = {
      events: [idEvent],
    }
  } else {
    if (!resultVisited.events.includes(idEvent)) {
      resultVisited.events.push(idEvent);
    } else {
      res.status(300).json({"message": "Вы уже посещали это событие!", "code": -3});
      return false;
    }

    visitedEvents = resultVisited;
  }

  const sql = "UPDATE users SET visited_events = ? WHERE token = ?";
  let result = (await connection.query(sql, [JSON.stringify(visitedEvents), token]))[0];

  res.status(200).json({"message": "Вы успешно подписались на событие!", "code": 1});
});

module.exports = eventRouter;