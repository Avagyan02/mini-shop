const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: "samvel.avagyan.02@bk.ru",
        pass: "IVvcNhZ3YuptkKZXwQ"
    },
    from: 'Mailer Test <samvel.avagyan.02@bk.ru>',    
  }    
)

let message = `<div><h1>You registered</h1></div>`
const mailer = message => {
  transporter.sendMail(message,(err,info) => {
    if(err) return console.log(err);
    console.log(info);
  })
}

module.exports = mailer;