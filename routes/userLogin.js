const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/login', (req, res, next) => {
    res.send('<form action="/login" method="POST"><input type="text" name="user"><button type="submit">Login</button></form>');
});

router.post('/login', (req, res, next) => {
    const username = req.body.user;

    // Store username in local storage
    res.setHeader('Set-Cookie', `username=${username}`);

    res.redirect('/');
});

module.exports = router;
