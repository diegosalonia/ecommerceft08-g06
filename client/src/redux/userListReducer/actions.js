import axios from 'axios';
import {GET_USER, DELETE_USER, UPDATE_USER} from '../constants';

export const getUsers = ()=>dispatch =>{
    return axios.get('http://localhost:3000/users')
    .then(user =>{
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

export const updateUserAdmin = (id) => dispatch =>{
    return axios.put(`http://localhost:3000/auth/promote/${id}`)
    .then(user_admin =>{
        dispatch({
            type: UPDATE_USER,
            update: user_admin.data
        })
    })
    .catch(err => console.log("ERROR DE UPDATE ",err))
}

export const updateUser = (id) => dispatch =>{
    return axios.put(`http://localhost:3000/auth/user/promote/${id}`)
    .then(user_admin =>{
        dispatch({
            type: UPDATE_USER,
            update: user_admin.data
        })
    })
    .catch(err => console.log("ERROR DE UPDATE ",err))
}

