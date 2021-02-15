import { GET_USER } from '../constants' 
import Swal from 'sweetalert2';
import axios from 'axios'

export const getUser = (token) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    const url = "http://localhost:3000/auth/me"
    axios.get(url, config)
    .then(response => {
        dispatch({
            type: GET_USER,
            user: response.data
        })
    })
    .catch(error => {
        console.log(error)
    })
}

export const updateUser = (token, user, id) => dispatch => {

    const showAlert = (message, time) => {
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

    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    const url = `http://localhost:3000/users/${id}`

    axios.put(url, user, config)
    .then(response => {
        showAlert("Datos actualizados", 2000)
        setTimeout(()=>{window.location.reload()}, 2000)
    })
    .catch(error => {
        showAlertConflict(error.response.data.msg, 2000)
    })
}