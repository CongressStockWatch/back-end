require('dotenv').config();

const sgMail = require('@sendgrid/mail');

let sendGridAPI = process.env.SENDGRID_API_KEY;

async function sendEmail(req, res, next) {
  let user = req.user.email;
  console.log(req.user.email === 'abditake@hotmail.com');
  console.log(sendGridAPI);
  if (typeof user === typeof 'string') {
    sgMail.setApiKey(sendGridAPI);
    const msg = {
      to: user, // Change to your recipient
      from: 'CongressWatchD47@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'Thank You for Subscribing to the weekly Congress Newsletter ',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('email was sent');
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log('the user is not a correct email');
  }
  res.status(200).send('email was sent');
}
module.exports = sendEmail;



