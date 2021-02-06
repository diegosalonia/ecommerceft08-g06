const SENDGRID_API_KEY = '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'
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(SENDGRID_API_KEY)

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const msg = {
    to: 'dager2115@gmail.com', // Change to your recipient
    from: 'dager2115@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'this is the verify code',
    html: `<h1>${Math.round(getRandomArbitrary(100000,999999))}</h1>`,
  }

  sgMail
  .send(msg)
  .then(response => {
      console.log("msg send...")
  })
  .catch(error =>{
      console.log(error.message)
  })