const { Client } = require('whatsapp-web.js');
var QRCode = require('qrcode');
const client = new Client();
const fs = require('fs');
const express = require('express');
const app = express();

const SESSION_FILE_PATH = './session.json';

app.get('/connect', function (req, res) {
    client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        console.log('QR RECEIVED', qr);
        QRCode.toDataURL(qr, function (err, url) {
            res.send(
                `
                <img src="${url}">`
            );
        })
    });
});


client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    console.log('MESSAGE RECEIVED', msg);
    if (msg.body == 'ping') {
        msg.reply('pong');
    }
});

client.initialize();

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})