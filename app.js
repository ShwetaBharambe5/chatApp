const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const userLoginRoutes = require('./routes/userLogin');
const chatRoomRoutes = require('./routes/chatRoom');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('', userLoginRoutes);
app.use(chatRoomRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
