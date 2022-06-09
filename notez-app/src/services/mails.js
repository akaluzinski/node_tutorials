const sgMail = require('@sendgrid/mail');
const {sendGridApiKey} = require('../security/tokens');

function sendEmail(to, subject, text) {
    sgMail.setApiKey(sendGridApiKey);
    return sgMail.send({
        to,
        from: 'kaluza@gmail.com',
        subject,
        text
    });
}

module.exports = {
    sendEmail
}
