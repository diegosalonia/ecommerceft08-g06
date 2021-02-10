import axios from 'axios'
import { GET_ORDER, CHANGE_ORDER_STATUS_IN_ORDER_DETAIL } from '../constants'

export function getOrder(orderId){
    return function(dispatch) {
      return axios.get(`http://localhost:3000/orders/${orderId}`)
        .then(response => {
          console.log("RESPUESTA ORDEN: ", response.data.status);
          dispatch({ 
              type: GET_ORDER, 
              order: response.data
            });
        })
        .catch( error => {
          console.log(error)
        })
    };
  }

export function changeStatus(orderId, status){
  const order = {
    status
  }
  return function(dispatch){
    return axios.put(`http://localhost:3000/orders/${orderId}`, order)
    .then(response => {
      dispatch({
        type: CHANGE_ORDER_STATUS_IN_ORDER_DETAIL,
        order: response.data
      });
    })
    .catch(error =>{
      console.log(error)
    })
  }

}  
  