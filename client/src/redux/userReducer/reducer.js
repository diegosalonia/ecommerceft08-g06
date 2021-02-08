import { GET_USER } from '../constants' 

const initialValues = {
    user: {}
}

export default function userLoggedReducer (state=initialValues, action){
    switch (action.type) {
        case GET_USER:
            return {
                user: action.user
            }
    
        default:
            return state
    }
}