const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'test.2002@internet.ru',
        pass: '1Samvel2002'
    },
    from: 'Mailer Test <test.2002@internet.ru>',    
  }    
)

const mailer = message => {
  transporter.sendMail(message,(err,info) => {
    if(err) return console.log(err);
    console.log(info);
  })
}

module.exports = mailer;