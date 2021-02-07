import { RESET_PASSWORD, SEND_EMAIL } from '../constants';
import axios from 'axios'

export const sendEmail = (email) => dispatch =>{
    axios.post('http://localhost:3000/users/sendMail', {email})
    .then(response =>{
        dispatch({
            type: SEND_EMAIL,
            verifyCode: response.data.verifyCode
        })
    })
    .catch(error =>{
        console.log(error)
    })
}

export const resetPassword = (email, newPassword) => dispatch => {
    axios.put('http://localhost:3000/users/update/passwordReset', {email, newPassword})
    .then(response => {
        console.log({
            response:response.data
        })
        dispatch({
            type: RESET_PASSWORD
        })
    })
    .catch(error => {
        console.log(error)
    })
}