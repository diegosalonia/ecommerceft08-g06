import React from 'react'
import CartItem from './CartItem'
const testValues = {idUser: 1, orderId: 2}

const CartHolder = ()=>{

    return <CartItem idUser={testValues.idUser} orderId={testValues.orderId} />
    
}
 
export default CartHolder;