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
    const password = md5(req.body.password);

    const sqlCheck = "SELECT * FROM `users` WHERE username = ? AND password = ?";
    let userResCheck = (await connection.query(sqlCheck, [username, password]))[0];

    if (userResCheck.length > 0) {
        res.cookie('mess', '{"message": "Такой пользователь уже зарегистрирован!", "code": -1}', { maxAge: 2000 });
        connection.end();
        res.redirect('/register');
        //res.status(200).json({"message": "Такой пользователь уже зарегистрирован!", "code": -1});
        return false;
    }

    const token = md5(username + password);

    const sql = "INSERT INTO users(username, password, token) VALUES (?, ?, ?)";
    let userRes = await connection.query(sql, [username, password, token]);

    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000; 

    res.cookie('token', token, {maxAge: oneMonthInMilliseconds});
    connection.end();
    res.redirect('/profile');
    //res.status(200).json({"username": username, "password": password, "token": token});
    return;
});

userRouter.post('/login', urlencodedParser, async (req, res) => {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        database: config.database,
        password: config.password,
    }).promise();

    const username = req.body.username;
    const password = md5(req.body.password);
      
    const sql = "SELECT * FROM `users` WHERE username = ? AND password = ?";
    let userRes = (await connection.query(sql, [username, password]))[0][0];

    if (!userRes) {
        res.cookie('mess', '{"message": "Неверный логин или пароль!", "code": -2}', { maxAge: 2000 });
        connection.end();
        res.redirect('/login');
        //res.status(400).json({"message": "Такой пользователь не найден!", "code": -2});
        return false;
    }

    //res.status(200).json({"token": md5(userRes.username + userRes.password)});
    const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000; 

    res.cookie('token', md5(userRes.username + userRes.password), {maxAge: oneMonthInMilliseconds});
    connection.end();
    res.redirect('/profile');
    return;
});

userRouter.get('/getInfo/:token', async (req, res) => {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        database: config.database,
        password: config.password,
    }).promise();

    const token = req.params.token;

    const sql = "SELECT * FROM users WHERE token = ?";
    let userRes = (await connection.query(sql, [token]))[0][0];

    if (!userRes) {
        res.status(200).json({"message": "Пользователь не найден!", "code": -2})
        connection.end();
        return false;
    }; 

    res.status(200).json({"username": userRes.username, "visited_events": userRes.visited_events}); 
    connection.end();
    return;
});

userRouter.get('/checkToken/:token', async (req, res) => {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        database: config.database,
        password: config.password,
    }).promise();

    const token = req.params.token;
    
    const sql = "SELECT * FROM users WHERE token = ?";
    let userRes = (await connection.query(sql, [token]))[0][0];

    if (!userRes) {
        res.status(200).json({"message": "Токен не действителен!", "code": "-2"})
        connection.end();
        return false;
    }

    res.status(200).json({"message": "token aviable!", "code": "1"}); 
    connection.end();
    return;
});

module.exports = userRouter;