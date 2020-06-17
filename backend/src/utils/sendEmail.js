const nodemailer = require('nodemailer');

const emailAuthentication = {
  user: 'dswojcickoski@outlook.com',
  pass: '12daniel13',
  from: 'dswojcickoski@outlook.com'
}

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: emailAuthentication.user,
    pass: emailAuthentication.pass
  }
});

module.exports = {
  async sendCode(to, subject, text) {
    var returnedCode;

    const mailOptions = {
      from: emailAuthentication.from,
      to: to,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        returnedCode = error;
      } else {
        returnedCode = 'OK';
      }
      return returnedCode;
    });
  }
}