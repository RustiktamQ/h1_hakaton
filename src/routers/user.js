const mysql = require('mysql2');
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

    const sql = "INSERT INTO users(username, password) VALUES (?, ?)";
    let userRes = await connection.query(sql, [username, password]);
    
    res.status(200).json({"username": username, "password": password});
    connection.end();
});

userRouter.post('/login', urlencodedParser, async (req, res) => {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        database: config.database,
        password: config.password,
    }).promise();
      
    const sql = "INSERT INTO users(username, password) VALUES (?, ?)";
    let userRes = await connection.query(sql, [username, password]);
    
    res.status(200).json({"username": username, "password": password});
});

module.exports = userRouter;