import { RESET_PASSWORD, CHANGE_PASSWORD } from '../constants';
import axios from 'axios'
import Swal from 'sweetalert2';


export const resetPassword = (email, newPassword) => dispatch => {

    const showAlertSuccess = (message, time) => {
        return Swal.fire({
            position: 'center',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: time,
        });
      };

    const showAlertConflict = (message, time) => {
        return Swal.fire({
            position: 'center',
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: time,
        });
      };

    axios.put('http://localhost:3000/users/update/passwordReset', {email, newPassword})
    .then(response => {
        dispatch({
            type: RESET_PASSWORD
        })
        showAlertSuccess("se ha restablecido tu contraseña", 2000)
    })
    .catch(error => {
        showAlertConflict("algo salio mal", 2000)
    })
}

export const changePasswordAction = (token, userId, newPassword) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = `http://localhost:3000/users/${userId}/passwordChange`  
      axios.put(url, {newPassword}, config)
      .then(response => {
          dispatch({
              type: CHANGE_PASSWORD
          })
      })
      .then(error =>{
          console.log(error)
      })
}