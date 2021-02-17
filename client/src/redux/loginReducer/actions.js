import { LOGIN, LOGOUT, ADD_NEW_ADDRESS } from '../constants';
import axios from 'axios';
import Swal from 'sweetalert2';
import { styled } from '@material-ui/core';

const showAlert = (message, time) => {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: time,
    });
};

const showAlertWarning = (message, time) => {
    return Swal.fire({
        position: 'center',
        icon: 'warning',
        title: message,
        showConfirmButton: false,
        timer: time,
    });
};

export const addItemsToCart = userId => dispatch => {
    const productsInCart = JSON.parse(localStorage.getItem('cart'));
    if (productsInCart?.length > 0) {
        axios.post(`http://localhost:3000/users/${userId}/cart`, { product: {id: productsInCart[0].id, quantity: productsInCart[0].quantity}})
        .then(async res => {
            productsInCart.slice(1).map(product => {
            return axios.put(`http://localhost:3000/users/${userId}/cart`, { product: { id: product.id, quantity: product.quantity}})
            .catch(err => console.log("ERROR SUBIENDO OTRO PRODUCT: ", err));
            });
        })
        .catch(err => console.log("ERROR EN ADDITEMSTOCART: ", err));
    }
};

export const login = (user) => (dispatch, getState) => {
    if(user.user.active === "true"){
        if(user.user.force_password === "pendiente") {
            setTimeout(() => window.location.replace('/password-reset'), 2000);
            return showAlertWarning("tienes que cambiar tu contraseña", 2000)
        }
        dispatch({type: LOGIN, payload: user})
        const productsInCart = getState().cartReducer.productsInCart.slice();
        var promises;
        if (productsInCart?.length > 0) {
            axios.post(`http://localhost:3000/users/${user.user.id}/cart`, { product: {id: productsInCart[0].id, quantity: productsInCart[0].quantity}})
        .then(async res => {
            promises = await productsInCart.slice(1).map(product => {
                return axios.put(`http://localhost:3000/users/${user.user.id}/cart`, { product: { id: product.id, quantity: product.quantity}})
                .catch(err => console.log("ERROR SUBIENDO OTRO PRODUCT: ", err));
            });
        })
        .then(res => {
            sessionStorage.setItem('token', user.token)
            sessionStorage.setItem('role', user.user.user_role);
            sessionStorage.setItem('id', user.user.id);
            sessionStorage.setItem('email', user.user.email);
            showAlert('Succesfull sign in!', 2000);
            setTimeout(() => window.location.reload(false), 2000);
        })
        .catch(err => console.log("ERROR EN SIGN IN ENVIANDO PRODUCTOS AL CARRITO: ", err));
        } else {
            sessionStorage.setItem('token', user.token)
            sessionStorage.setItem('role', user.user.user_role);
            sessionStorage.setItem('id', user.user.id);
            sessionStorage.setItem('email', user.user.email);
            showAlert('Succesfull sign in!', 2000);
            setTimeout(() => window.location.reload(false), 2000);
        }

    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que no esta activado!',
            footer: '<a href>Para Mayor Informacion</a>'
          })        
    }

}

export const addNewAddress = (userId, newAddress) => dispatch => {
    return axios.put(`http://localhost:3000/users/${userId}/shipping-address`, {shippingAddress: newAddress})
    .then(res => {
        dispatch({
            type: ADD_NEW_ADDRESS,
            address: res.data
        });
    })
    .catch(err => console.log("ERROR AÑADIENDO ADDRESS: ", err));;
};

export const logout = (token) => dispatch =>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = "http://localhost:3000/auth/logout"

    return axios.post(url,null,config)
    .then(()=>{
        dispatch({type: LOGOUT})
        localStorage.clear();
        sessionStorage.clear();

        window.location.replace("http://localhost:3001/")
    })
    .catch(err => console.log("ERROR LOGOUT: ", err));
}
