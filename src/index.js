const express = require('express');
const updater = require('./libs/updater.js');
const router = require('./router/index.js');

updater.startUpdaterPerDay();

const app = express();
app.use('/v1', router);

app.use('/', (_, res) => {
    res.send('ok!');
});

app.listen(3000);