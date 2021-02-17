import {UPDATE_CATEGORIES, DELETE_IMAGE_CATEGORY} from '../constants'

const initialState = {
    category : {},
    deletedImage: ""
}

const updateCategory = (state = initialState, action) =>{
    switch(action.type){
        case UPDATE_CATEGORIES:
            return {
                ...state,
                category: action.category
            }
        case DELETE_IMAGE_CATEGORY:
            return{
                ...state,
                deletedImage: action.image,
                category: {...state.category, image: null}
            }
        default:
            return state
    }
}

export default updateCategory
