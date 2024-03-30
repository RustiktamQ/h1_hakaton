const mysql = require('mysql2');
const md5 = require('md5');
const config = require('../config.js');
const express = require('express');
const userRouter = express.Router();

const urlencodedParser = express.urlencoded({extended: false});

userRouter.post('/register', urlencodedParser, async (req, res) => {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        database: config.database,
        password: config.password,
    }).promise();
      
    const username = req.body.username;
    const password = req.body.password;

    const sqlCheck = "SELECT * FROM `users` WHERE username = ? AND password = ?";
    let userResCheck = (await connection.query(sqlCheck, [username, password]))[0];

    if (userResCheck.length > 0) {
        res.status(200).json({"message": "Такой пользователь уже зарегистрирован!", "code": -1});
        return false;
    }

    const token = md5(username + password);

    const sql = "INSERT INTO users(username, password, token) VALUES (?, ?, ?)";
    let userRes = await connection.query(sql, [username, password, token]);
    
    res.status(200).json({"username": username, "password": password, "token": token});
    connection.end();
});

userRouter.post('/login', urlencodedParser, async (req, res) => {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        database: config.database,
        password: config.password,
    }).promise();

    const username = req.body.username;
    const password = req.body.password;
      
    const sql = "SELECT * FROM `users` WHERE username = ? AND password = ?";
    let userRes = (await connection.query(sql, [username, password]))[0][0];

    res.status(200).json({"token": md5(userRes.username + userRes.password)});
});

module.exports = userRouter;