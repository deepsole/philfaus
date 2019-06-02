const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');


const mongoose = require('mongoose');

const driversRoutes = require('./routes/drivers');
const userRoutes = require('./routes/user');


const app = express();

mongoose.connect('mongodb://ade:86D8QhA25DUBX6xl@cluster0-shard-00-00-uyc3o.mongodb.net:27017,cluster0-shard-00-01-uyc3o.mongodb.net:27017,cluster0-shard-00-02-uyc3o.mongodb.net:27017/philfaus?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=false', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
  next();
});




app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'adesvidz@gmail.com',
      pass: 'Godisgood$123'
    },
  });

  let mailOptions = {
    from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
    to: '951985@gmail.com', // list of receivers
    subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}




app.use('/api/drivers', driversRoutes);
app.use('/api/user', userRoutes);


module.exports = app;
