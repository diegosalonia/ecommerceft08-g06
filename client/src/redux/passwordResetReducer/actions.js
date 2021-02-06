import { RESET_PASSWORD, SEND_EMAIL } from '../constants'

const SENDGRID_API_KEY = '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'
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(SENDGRID_API_KEY)

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const verifyCode = Math.round(getRandomArbitrary(100000,999999))

export const sendEmail = (email) => dispatch =>{
    const msg = {
        to: email, // Change to your recipient
        from: 'dager2115@gmail.com', // Change to your verified sender
        subject: 'this is the verify code',
        text: 'this is the verify code',
        html: `<h1>${verifyCode}</h1>`,
      }
    sgMail.send(msg)
    .then(response =>{
        dispatch({
            type: SEND_EMAIL,
            verifyCode
        })
    })
    .catch(error =>{
        console.log(error)
    })
}