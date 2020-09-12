var nodemailer = require('nodemailer');

var smtp = nodemailer.createTransport('SMTP', {
    service: 'gmail',
    auth:{
        user: 'hanif.adedotun@gmail.com',
        pass: ''
    }
});

var mailOptions= {
    //email options
    from: 'hanif.adedotun@gmail.com',
    to: 'hanifadedotun2k19@gmail.com, voltex.designs@outlook.com',
    subject: 'Node.js Email Sender',
    html: "<h1>Voltex with Node.js</h1><p>Welcome to Nde.js with Voltex Desgins</p>"
};

smtp.sendMailWithTransport(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message Sent: '+ info.respose);
    }

// smtp.close();
});