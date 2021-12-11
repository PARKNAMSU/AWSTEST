const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(express.text());

app.use('/user',userRouter);

app.get('/',(req,res) => {
    res.send('Hellow World!!');
});

app.listen(5000,() => console.log('localhost:5000 opened!!'));