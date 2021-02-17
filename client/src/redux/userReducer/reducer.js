import { GET_USER } from '../constants' 

const initialValues = {
    user: {},
    orders: []
}

export default function userLoggedReducer (state=initialValues, action){
    switch (action.type) {
        case GET_USER:
            return {
                user: action.user,
                orders: action.orders
            }
    
        default:
            return state
    }
}