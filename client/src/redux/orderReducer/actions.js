import axios from 'axios'
import { GET_ORDER } from '../constants'

export function getOrder(orderId){
    return function(dispatch) {
      return axios.get(`http://localhost:3000/orders/${orderId}`)
        .then(response => {
          console.log("RESPUESTA ORDEN: ", response.data);
          dispatch({ 
              type: GET_ORDER, 
              products: response.data.products
            });
        })
        .catch( error => {
          console.log(error)
        })
    };
  }
  