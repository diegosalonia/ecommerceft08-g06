import { GET_USER, UPDATE_USER_PROFILE } from '../constants' 
import axios from 'axios'

export const getUser = (token) => dispatch => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    const url = "http://localhost:3000/auth/me"
    axios.get(url, config)
    .then(response => {
        dispatch({
            type: GET_USER,
            user: response.data
        })
    })
    .catch(error => {
        console.log(error)
    })
}

export const updateUser = (token, user, id) => dispatch => {
    console.log(user)
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    const url = `http://localhost:3000/users/${id}`

    axios.put(url, user)
    .then(response => {
        console.log("aqui esta", response.data)
        dispatch({
            type: UPDATE_USER_PROFILE,
            user: response.data
        })
    })
    .catch(error => {
        console.log(error.message)
    })
}