const express = require('express');
const router = express.Router();
const request = require('request');
const nodemailer = require('nodemailer');


router.get('/send', (req, res) => {
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
          secure: false,
          port: 25,
          auth: {
            user: 'adesvidz@gmail.com',
            pass: 'Godisgood$123'
          },
          tls: {
              rejectUnauthorized: false
          }
      });

      let HelperOptions = {
          from: 'combo@mail.com',
          to: '951985@gmail.com',
          subject: 'Majeni Contact Request',
          text: 'Hello',
          html: outputData
      };



      transporter.sendMail(HelperOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log("The message was sent!");
          console.log(info);
      });

  });
  module.exports = router;
