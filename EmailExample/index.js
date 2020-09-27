var nodemailer = require('nodemailer');
var MailComposer = require("nodemailer/lib/mail-composer");

var transporter = nodemailer.createTransport('SMTP', {
  service: 'gmail',//smtp-mail.outlook.com
  auth: {
    user: 'hanif.adedotun@gmail.com',
    pass: 'raphew3370'
  },
  authMethod:'NTLM',
    secure:false,
    tls: {rejectUnauthorized: false},
    debug:true
});

var mailOptions = {
    from: 'hanif.adedotun@gmail.com',
    to: 'voltex.designs@gmail.com',
    subject: 'Sending Email using Node.js, and Voltex API',
    html: '<h1>Welcome to Voltex</h1><p>That was easy!</p>'
  };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

var mail = new MailComposer(mailOptions);