import axios from 'axios';
import {UPDATE_CATEGORIES , GET_CATEGORIES_ONE , DELETE_IMAGE_CATEGORY, config} from '../constants'
import firebase, { storage } from '../../firebase';

export const getCategoryOne = (id) => dispatch => {
    return axios.get(`http://localhost:3000/category/${id}`)
    .then(category=>{
        dispatch({
            type: UPDATE_CATEGORIES,
            category: category.data
        })
    })
    .catch(err => console.log(err))
}

export const deleteImage = (image, token) => dispatch => {
    return dispatch({
        type: DELETE_IMAGE_CATEGORY,
        image
    });
};

const addImages = (images, categoryName, id, form, token) => {
    
    return new Promise((resolve, reject)=>{
        const uploadImage = firebase.storage().ref().child(`/category/images/${categoryName}/${images[0].name}`).put(images[0]);
        uploadImage.on (
            "state_changed",
            (snapshot) => {},
            error => {reject(error)},
             () => {
                storage
                    .ref(`/category/images/${categoryName}/`)
                    .child(images[0].name)
                    .getDownloadURL()
                    .then(url => {
                        resolve(form.image = url);
                    })
            }
        )
    })
    .then(res => {
        axios.put(`http://localhost:3000/category/${id}`, { form } , config(token))
        .then(res => {
            setTimeout(() => window.location.reload(false), 1000);
        })
        .catch(err => console.log(err));
    });
};


export const updateCategory = (form, images, token, id) => (dispatch, getState) => {
    const deletedImages = getState().updateCategory.deletedImage.slice();
    if(deletedImages){
    const imageDeleted = firebase.storage().refFromURL(deletedImages);
        imageDeleted.delete()        
        .catch( err => console.log("ERR ",err))
    }
    return axios.put(`http://localhost:3000/category/${id}`, { form }, config(token))
            
            .then(res => {
                console.log(deletedImages)
                if (typeof images !== 'string' && images?.length > 0) {
                    addImages(images, form.name, id, form, token)
                }
                else {
                    setTimeout(() => window.location.reload(false), 1000);
                }
                dispatch({
                    type: GET_CATEGORIES_ONE,
                });
            })
            .catch(err => console.log(err));
};
