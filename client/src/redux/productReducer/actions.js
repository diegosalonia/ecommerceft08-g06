import axios from 'axios';
import { GET_PRODUCT, GET_PRODUCT_ERROR, SHOW_LOADER, HIDE_LOADER, 
         ADD_PRODUCT_TO_CART, GET_ALL_REVIEWS, EDIT_REVIEW,
         ADD_NEW_REVIEW } from '../constants';
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

export const showLoader = () => dispatch => {
    dispatch({
        type: SHOW_LOADER
    });
};

export const getProduct = (userId, productId) => dispatch => {
    return axios.get(`http://localhost:3000/products/product-detail/${productId}?userId=${userId}`)
    .then(product => {
        dispatch({
            type: GET_PRODUCT,
            product: product.data
        });
    })
    .catch(err => console.log(err));
};

export const hideLoader = () => dispatch => {
    dispatch({
        type: HIDE_LOADER
    });
};

export const addToCart = (userId, id, quantity, product) => dispatch => {
    if (!userId) {
        let cartInLocalStorage = JSON.parse(localStorage.getItem('cart'));
        if (!cartInLocalStorage) {
            localStorage.setItem('cart', JSON.stringify([{...product, quantity}]));
        } else {
            let inCart = false
            cartInLocalStorage.forEach(productInCart => {
                if (productInCart.id === id) {
                    productInCart.quantity = quantity;
                    inCart = true;
                }
            });
            
            !inCart && cartInLocalStorage.push({...product, quantity});
            localStorage.setItem('cart', JSON.stringify(cartInLocalStorage));
        }
        showAlert('Product in cart! Thanks', 1500);
        return;
    }
    return axios.post(`http://localhost:3000/users/${userId}/cart`, { product: {id, quantity}})
    .then(response => {
        dispatch({
            type: ADD_PRODUCT_TO_CART,
            id
        });
        showAlert('Product in cart! Thanks', 1500);
    })
    .catch(err => console.log(err));
};

export const getReviews = id => dispatch => {
    return axios.get(`http://localhost:3000/products/${id}/review`)
    .then(res => {
        dispatch({
            type: GET_ALL_REVIEWS,
            reviews: res.data
        });
    })
    .catch(err => console.log(err));
};

export const editReviewAction = (review, reviewId, productId) => dispatch => {
    return axios.put(`http://localhost:3000/products/${productId}/review/${reviewId}`, {form: review})
    .then(res => {
        dispatch({
            type: EDIT_REVIEW,
            review: res.data
        });
        setTimeout(() => window.location.reload(false),2000);
        showAlert('Review edited!', 2000);
    })
    .catch(err => console.log(err));
};

export const addNewReview = (review, productId, userId) => dispatch => {
    console.log("PRODUCTID: ", productId);
    return axios.post(`http://localhost:3000/products/${productId}/review/${userId}`, {form: review})
    .then(res => {
        dispatch({
            type: ADD_NEW_REVIEW,
            newReview: res.data
        });
        setTimeout(() => window.location.reload(false),2000);
        showAlert('Review created! Thanks!! Vuelva prontoss!', 2000);
    })
    .catch(err => console.log(err));
};
