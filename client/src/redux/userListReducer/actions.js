import axios from 'axios';
import {GET_USER, DELETE_USER} from '../constants';

export const getUsers = ()=>dispatch =>{
    return axios.get('http://localhost:3000/users')
    .then(user =>{
        console.log(user)
        dispatch({
            type: GET_USER,
            users: user.data
        })
    })
    .catch(err => console.log('ERROR GET: ', err))
}

export const deleteUsers = (id) => dispatch =>{
    return axios.delete(`http://localhost:3000/users/${id}`)
    .then(user=>{
        dispatch({
            type: DELETE_USER
        })
    })
    .catch(err => console.log('ERROR DELETE: ', err))
}

