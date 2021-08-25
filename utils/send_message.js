const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'samvelavagyan91@gmail.com',
        pass: 'AvagyanSam'
    },
    from: 'Mailer Test <samvelavagyan91@gmail.com>',    
  }    
)

const mailer = message => {
  transporter.sendMail(message,(err,info) => {
    if(err) return console.log(err);
    console.log(info);
  })
}

module.exports = mailer;