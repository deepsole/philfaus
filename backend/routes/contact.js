const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');

router.post('/send', (req, res) => {
    console.log('What??? Toi Day chua?');
    const outputData = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secureConnection: true,
        auth: {
            user: 'adesvidz@gmail.com',
            pass: 'Godisgood$123'
        },
        tls: {
            chipers: "SSLv3"
        }
    });

    var mailOptions = {
        from: "donotreply@deea.thebuffalogroup.com",
        to: "951985@gmail.com",
        //to: 'BoggsW@deea.thebuffalogroup.com, WhitlockC@deea.thebuffalogroup.com, BasraD@deea.thebuffalogroup.com, KideY@deea.thebuffalogroup.com, LeK@deea.thebuffalogroup.com',
        subject: 'New Message From: ' + req.body.name,
        // text: "this is the email's body text..."

    text:
      'From ' +
      req.body.name +
      '\nEmail: ' +
      req.body.email +
      '\nMessage: ' +
        req.body.message +
        '\n' +
        '\n' +
        'This email and any attachment(s) are from The PMO Tracker Development (Cool)Team and are intended only for fun chat :) It may contain information that you may not interested. If you have received this communication in error, please ignore it :)',

    // html:
    //   'From: ' +
    //   req.body.name  +
    //   '<h4>Email: </h4>' +
    //   req.body.email +
    //   '<p>    ' +
    //   req.body.message +
    //   '</p>',

    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) console.log(error);
        else console.log("Message sent successfully: " + info.response);
    });


});
module.exports = router;
