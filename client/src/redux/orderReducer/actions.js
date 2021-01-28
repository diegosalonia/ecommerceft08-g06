import axios from 'axios'
import { GET_ORDER } from '../constants'

export function getOrder(userId, orderId){
    return function(dispatch) {
      console.log("cualquier pelotudes")
      return axios.get(`http://localhost:3000/users/${userId}/cart/${orderId}`)
        .then(response => {
          console.log("actions", response)
          dispatch({ 
              type: GET_ORDER, 
              products: response.data
            });
        })
        .catch( error => {
          console.log(error)
        })
    };
  }
  