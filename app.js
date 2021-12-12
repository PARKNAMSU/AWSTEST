const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');

app.use(cookieParser());
app.use(express.json());
app.use(express.text());

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hellow World!!');
});

https.createServer(
    {
        key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'),
    },
    app
).listen(80);

//app.listen(80, () => console.log('localhost:5000 opened!!'));