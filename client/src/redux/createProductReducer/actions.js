import axios from "axios"
import firebase, { storage } from '../../firebase';
import { CREATE_PRODUCT, GET_CATEGORIES, config } from '../constants';
const token = sessionStorage.getItem('token');

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
            window.location.reload(false);
        })
        .catch(err => console.log(err));
    });
};

export const addProduct = (form, images, categoryList, token) => dispatch => {
    return axios.post('http://localhost:3000/products', { form }, config(token))
            .then(res => {
                const { id } = res.data
                conectionRelation(id, categoryList, token);
                addImages(images, form.name, id, form);
                dispatch({
                    type: CREATE_PRODUCT,
                    newProduct: res.data
                });
            })
            .catch(err => console.log(err));
};

export const getCategories = () => dispatch => {
    axios.get('http://localhost:3000/category/all')
    .then(res => {
        dispatch({
            type: GET_CATEGORIES,
            categories: res.data
        });
    })
    .catch(error => console.log(error));
};
