import {GET_USER, DELETE_USER, UPDATE_USER} from '../constants';

const initialState = {
    users: [],
    isDeleted: false
};

const userListReducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                users: action.users
            }
        
        case DELETE_USER:
            return {
                ...state,
                isDeleted: true
            }
        
        default:
            return state;
    }
}

export default userListReducer;
