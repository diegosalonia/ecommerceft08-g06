import axios from 'axios';
import {GET_REVIEWS} from '../constants';

export const getReviews = (data) => {
        return {
        type: GET_REVIEWS, 
        payload: data
    }
}

export const getDataReviews = (productId) => (dispatch) => {
    axios.get(`http://localhost:3000/products/${productId}/review/`)
    .then(reviews => dispatch(getReviews(reviews.data)))
    .catch(err => console.log(err))
}