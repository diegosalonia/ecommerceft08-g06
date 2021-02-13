import { Category } from '@material-ui/icons';
import axios from 'axios';
import { GET_CATEGORIES, DELETE_CATEGORIES , config } from '../constants'

export const getCategory = token => dispatch =>{
    return axios.get('http://localhost:3000/category/all', config(token))
    .then(category =>{
        dispatch({
            type: GET_CATEGORIES,
            categories: category.data
        })
    })
    .catch(err => console.log('ERROR GET: ', err))
}

export const deleteCategory = (id,token) => dispatch =>{
    return axios.delete(`http://localhost:3000/category/${id}`, config(token))
    .then(resp =>{
        dispatch({
            type: DELETE_CATEGORIES
        })
    })
    .catch(err => console.log("ERROR IN DELETE: ",err))
}
