import axios from "axios"
import { GET_PRODUCT, GET_CATEGORIES, DELETE_IMAGE, config, EDIT_PRODUCT } from '../constants';
import firebase, { storage } from '../../firebase';
import Swal from 'sweetalert2';

const showAlert = () => {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Producto editado!',
        showConfirmButton: false,
        timer: 2000,
    });
};

export const getProduct = id => dispatch => {
    return axios.get(`http://localhost:3000/products/${id}`)
    .then(product => {
        dispatch({
            type: GET_PRODUCT,
            product: product.data
        });
    })
    .catch(err => console.log(err));
};

export const getCategories = () => dispatch => {
    axios.get('http://localhost:3000/category/all')
    .then(categories => {
        dispatch({
            type: GET_CATEGORIES,
            categories: categories.data
        });
    })
    .catch(error => console.log(error));
};

export const deleteImage = (image, token) => dispatch => {
    return dispatch({
        type: DELETE_IMAGE,
        image
    });
};

const conectionRelation = (productId, categoryList, token) => {
    categoryList.forEach(category => {
        axios.post(`http://localhost:3000/products/${productId}/category/${category}`, null, config(token))
        .then(res => res)
        .catch(err => console.log(err));
    });
};

const addImages = (images, productName, id, form) => {
    const promises = images.map(image => {
        return new Promise((resolve, reject) => {
            const uploadImage = firebase.storage().ref().child(`/products/images/${productName}/${image.name}`).put(image);
            uploadImage.on (
                "state_changed",
                snapshot => {},
                error => {reject(error)},
                async () => {
                    await storage
                        .ref(`/products/images/${productName}/`)
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            resolve(form.image.push(url));
                        });
                }
            );
       });
    });
    Promise.all(promises)
    .then(res => {
        axios.put(`http://localhost:3000/products/${id}`, { form })
        .then(res => {
            showAlert();
            setTimeout(() => window.location.reload(false), 1500);
        })
        .catch(err => console.log(err));
    });
};

export const editProduct = (form, images, categoryList, token, id) => (dispatch, getState) => {
    const deletedImages = getState().updateProductReducer.deletedImages.slice();
    if (deletedImages.length > 0) {
        deletedImages.forEach(image => {
            const imageDeleted = firebase.storage().refFromURL(image);

            imageDeleted.delete()
            .catch(err => console.log("ERROR WHILE DELETING IMAGE FROM FIREBASE: ", err));
        });
    };
    return axios.put(`http://localhost:3000/products/${id}`, { form }, config(token))
            .then(res => {
                addImages(images, form.name, id, form);
                dispatch({
                    type: EDIT_PRODUCT,
                });
            })
            .catch(err => console.log(err));
};

export const deleteCategory = (productId, categoryId, token) => dispatch => {
    return axios.delete(`http://localhost:3000/products/${productId}/category/${categoryId}`, config(token))
    .catch(err => console.log("ERROR AL ELIMINAR CATEGORIA: ", err));
};

export const addCategory = (productId, categoryId, token) => dispatch => {
    return axios.post(`http://localhost:3000/products/${productId}/category/${categoryId}`, null, config(token))
    .catch(err => console.log("ERROR AL AÑADIR CATEGORIA: ", err));
};
