import { GET_USER, UPDATE_USER_PROFILE } from '../constants' 

const initialValues = {
    user: {}
}

export default function userLoggedReducer (state=initialValues, action){
    switch (action.type) {
        case GET_USER:
            return {
                user: action.user
            }

        case UPDATE_USER_PROFILE:
            return {
                user: action.user
            }    
    
        default:
            return state
    }
}