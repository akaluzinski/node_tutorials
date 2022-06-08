const sgMail = require('@sendgrid/mail');
const {sendGridApiKey} = require("../security/tokens");

const mailingsEnabled = false;


if (mailingsEnabled) {
    sgMail.setApiKey(sendGridApiKey);
    sgMail.send({
        to: 'kaluza@gmail.com',
        from: 'kaluza@gmail.com',
        subject: 'API testing email',
        text: 'Some body to be send to test SendGrid integration'
    }).then(result => {
        console.log('Email sent', result)
    });
} else {
    console.error('Enable mailings');
}
