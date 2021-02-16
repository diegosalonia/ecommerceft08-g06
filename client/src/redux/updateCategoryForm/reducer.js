import {UPDATE_CATEGORIES} from '../constants'

const initialState = {
    category : {}
}

const updateCategory = (state = initialState, action) =>{
    switch(action.type){
        case UPDATE_CATEGORIES:
            return {
                ...state,
                category: action.category
            }
        default:
            return state
    }
}

export default updateCategory
