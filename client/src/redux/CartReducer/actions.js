 import cartTypes from '../constants.js';
 import axios from 'axios'; 

export function getCart (userId,orderId){ // muestra todos
    return function(dispatch){
        return axios.get(`http://localhost:3000/users/${userId}/cart/${orderId}`)
        .then(resp => {
            console.log("Dato =",resp)
            dispatch({                
                type: cartTypes.GET_CART,
                products: resp.data
            })
        })
        .catch( error => {
            console.log(error)
          })
    }
};

export function changeQuantityCartProduct (product, userId, orderId){
    console.log(product,userId,orderId)
    return function(dispatch){
        console.log('ENTRO AQUI')
        return axios.put(`http://localhost:3000/users/${userId}/cart/${orderId}`, {product})
        .then( response => {
            console.log("ACTUALIZADO=",response)
            dispatch({
                type: cartTypes.CHANGE_QUANTITY_CART_PRODUCT,
                products: response.data
            })
            }
        )
        .catch( error => {
            console.log(error)
          })
        
    }
};


export function removeProductToCart (product,userId,orderId) {  // elimina solo uno 
    console.log('aqui estamos',product,userId,orderId)
    return function(dispatch){
        console.log(product)
        return axios.delete(`http://localhost:3000/users/${userId}/cart/${orderId}/${product.id}`)
        .then(resp => {
            console.log('SE BORRO',resp)
            
        })        
        // .catch( error => {
        //     console.log(error)
        // })
    }
} 

export function removeAllProductToCart (userId,form) { // elimina todos
    return function(dispatch){
        return axios.delete(`http://localhost:3000/users/${userId}/cart`, {form})
        .then( resp =>
            dispatch({
                type: cartTypes.REMOVE_ALL_PRODUCT_TO_CART,
                products: resp.data
            })
        )        
        .catch( error => {
            console.log(error)
          })
    }
};
