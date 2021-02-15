import { RESET_PASSWORD, SEND_EMAIL, CHANGE_PASSWORD } from '../constants';
import axios from 'axios'
import Swal from 'sweetalert2';


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
    const showAlert = (message, time) => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: time,
        });
    };
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = `http://localhost:3000/users/${userId}/passwordChange`  
      axios.put(url, {newPassword}, config)
      .then(response => {
          console.log(response)
          showAlert("contraseña cambiada con exito", 1500)
          dispatch({
              type: CHANGE_PASSWORD
          })
      })
      .catch(error =>{
          console.log(error)
      })
}