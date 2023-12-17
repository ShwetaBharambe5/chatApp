const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', (req, res, next) => {
    const username = req.cookies.username; // Retrieve username from cookies

    const existingMessages = fs.readFileSync('message.txt', 'utf8').split('\n').filter(msg => msg.trim() !== '');

    let messageHtml = '';

    // Display existing messages in order (newest first)
    for (let i = 0; i<= existingMessages.length - 1; i++) {
        const msgObj = JSON.parse(existingMessages[i]);
        messageHtml += `<p>${msgObj.username}: ${msgObj.message}</p>`;
    }

    // Construct the HTML content with form and messages
    const htmlContent = `
        <form action="/" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>
        ${messageHtml}
    `;

    // Send the complete HTML response
    res.send(htmlContent);
});

router.post('/', (req, res, next) => {
    const username = req.cookies.username; // Retrieve username from cookies
    const message = req.body.message;

    // Store the message in the file with username
    const messageObj = { username, message };
    fs.appendFileSync('message.txt', JSON.stringify(messageObj) + '\n');

    // Redirect to '/' after sending the message
    res.redirect('/');
});

module.exports = router;
