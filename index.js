const express = require('express');
const updater = require('./libs/updater.js');
const eventRouter = require('./routers/index.js');
const userRouter = require('./routers/user.js')

updater.startUpdaterPerDay();
// updater.updater();

const app = express();
app.use('/v1', eventRouter);
app.use('/v1/user', userRouter);
app.use(express.static('public'));

app.use('/', (_, res) => {
    res.send('ok!');
});

app.listen(3000);