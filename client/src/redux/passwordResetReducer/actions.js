import { RESET_PASSWORD, SEND_EMAIL, CHANGE_PASSWORD } from '../constants';
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

export const changePasswordAction = (token, userId, newPassword) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = `http://localhost:3000/users/${userId}/passwordChange`  
      axios.put(url, {newPassword}, config)
      .then(response => {
          console.log(response)
          dispatch({
              type: CHANGE_PASSWORD
          })
      })
      .then(error =>{
          console.log(error)
      })
}