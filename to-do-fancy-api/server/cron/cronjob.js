const CronJob = require('cron').CronJob;
const Todo = require('../models/todo')
const User = require('../models/user')
const nodemailer = require('nodemailer');
const moment = require('moment');

function todo() {
  Todo.find().sort('description').then((rowsTodo) => {
    let today = moment(new Date()).format('YYYYMMD')

    rowsTodo.forEach((row) => {
      let deadline = moment(row.deadline).format('YYYYMMD')

      if (deadline - today == 1 && !row.status) {
        User.findOne({_id: row.userid}).then((result) => {
          mail(result.email)
          // console.log(result.email);
        })
      }
    })
  }).catch((reason) => {
    console.log(reason);
  })
}

function mail(email) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'finalprojecthacktiv8@gmail.com',
      pass: 'projecthacktiv8'
    }
  });

  var mailOptions = {
    from: 'finalprojecthacktiv8@gmail.com',
    to: email,
    subject: 'Todos Alarm',
    text: "There's a To Do List that should finish tommorow"
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// todo()

let Cron = new CronJob('0 0 6 * * *', function() {
  console.log('You will see this message when email sent');
  todo();
}, null, false, 'Asia/Jakarta');

Cron.start();
