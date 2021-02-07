import { LOGIN, LOGOUT } from '../constants';


export const login = (user) => (dispatch) => {
    console.log(user)
    dispatch({type: LOGIN, payload: user})

    localStorage.setItem('token', user.token)
    localStorage.setItem('role', user.user.user_role);
    localStorage.setItem('id', user.user.id);
        
    window.location.replace("http://localhost:3001/")
}

export const logOut = () => dispatch => dispatch({type: LOGOUT});
