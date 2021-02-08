import { LOGIN, LOGOUT } from '../constants';
import axios from 'axios';
import Swal from 'sweetalert2';

const showAlert = (message, time) => {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: time,
    });
};

export const login = (user) => (dispatch, getState) => {
    console.log("USER LOGUEADO: ", user);
    dispatch({type: LOGIN, payload: user})
    const productsInCart = getState().cartReducer.productsInCart.slice();
    const promises = productsInCart.map(product => {
        return axios.post(`http://localhost:3000/users/${user.user.id}/cart`, {product: {id: product.id, quantity: product.quantity}})
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
    Promise.all(promises)
    .then(res => {
        localStorage.setItem('token', user.token)
        localStorage.setItem('role', user.user.user_role);
        localStorage.setItem('id', user.user.id);
        setTimeout(() => window.location.reload(false), 2000);
        showAlert('Succesfull sign in!', 2000);
    })
    .catch(err => console.log("ERROR EN SIGN IN ENVIANDO PRODUCTOS AL CARRITO: ", err));
}

export const logOut = () => dispatch => dispatch({type: LOGOUT});