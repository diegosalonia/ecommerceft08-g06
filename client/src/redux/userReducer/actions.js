import { GET_USER } from '../constants' 
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