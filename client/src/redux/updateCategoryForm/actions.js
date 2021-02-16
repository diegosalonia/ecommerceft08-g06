import axios from 'axios';
import {UPDATE_CATEGORIES , config} from '../constants'

export const getCategoryOne = (id) => dispatch => {
    console.log('AXIOS Category')
    return axios.get(`http://localhost:3000/category/${id}`)
    .then(category=>{
        console.log('DATOS',category)
        dispatch({
            type: UPDATE_CATEGORIES,
            category: category.data
        })
    })
    .catch(err => console.log(err))
}
