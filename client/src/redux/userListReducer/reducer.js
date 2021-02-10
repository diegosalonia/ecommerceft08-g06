import {GET_USER, DELETE_USER, UPDATE_USER} from '../constants';

const initialState = {
    users: [],
    isDeleted: false
};

function update(array, elemento, newObj) {
    var resultado = []
    for (var i = 0; i < array.length; i++) {
      if (array[i].id !== elemento) {
        resultado.push(array[i]);
      }
    }
    resultado.unshift(newObj)
    return resultado;
  }

  function active(array, elemento, newObj) {
    var resultado = []
    for (var i = 0; i < array.length; i++) {
      if (array[i].id !== elemento) {
        resultado.push(array[i]);
      }
    }
    resultado.push(newObj)
    return resultado;
  }

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
                users: active(state.users,action.users.id,action.users)
            }

        case UPDATE_USER:
            return {
                ...state,
                users: update(state.users,action.update.id,action.update)
            }
        
        default:
            return state;
    }
}

export default userListReducer;
