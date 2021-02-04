import {GET_DATA_REVIEWS, GET_REVIEWS} from '../constants';

const initialState = {
    reviews: []
}

export default function reviewReducer(state = initialState, action){
    switch(action.type){
        case GET_REVIEWS: 
            return {
                ...state,
                reviews: action.payload
            }
        default:
            return state;
    }
}