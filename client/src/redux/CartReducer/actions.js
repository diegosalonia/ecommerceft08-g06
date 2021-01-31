 import cartTypes from '../constants.js';
 import axios from 'axios'; 

export const getCart = (userId,orderId) => (dispatch) => { // muestra todos

        console.log("ES HOY , ES HOY: ",cartTypes.GET_CART)
        return axios.get(`http://localhost:3000/users/${userId}/cart/${orderId}`)
        .then(resp => {
            console.log("xxxxxxxxxxxx: ")
            dispatch({                
                type: cartTypes.GET_CART,
                products: resp.data
            })
        })
        .catch( error => {
            console.log("TA RE ROTO ESTO: ", error)
            console.log(error)
         })
};

/* export function changeQuantityCartProduct (product, userId, orderId){
    return function(dispatch){
        return axios.put(`http://localhost:3000/users/${userId}/cart/${orderId}`, {product})
        .then( response =>
            dispatch({
                type: cartTypes.CHANGE_QUANTITY_CART_PRODUCT,
                product
            })
        )
        .catch( error => {
            console.log(error)
          })
        
    }
}; */

// export function removeAllProductToCart (userId) { // elimina todos
//     return function(dispatch){
//         return axios.delete(`http://localhost:3000/users/${userId}/cart`, {form})
//         .then( resp =>
//             dispatch({
//                 type: cartTypes.REMOVE_ALL_PRODUCT_TO_CART,
//                 payload: resp.data
//             })
//         )
//     }
// };

// export function removeProductToCart  (userId) {  // elimina solo uno 
//     return function(dispatch){
//         return axios.delete(`http://localhost:3000/users/${userId}/cart/${orderId}`, {product})
//         .then(resp => resp.json())
//         .then((json)=>
//             dispatch({
//                 type: cartTypes.removeProductToCart,
//                 payload: json
//             })
//         )
//     }
// } 
