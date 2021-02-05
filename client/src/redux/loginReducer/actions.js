import { LOGIN, LOGOUT } from '../constants';


export const login = (user) => (dispatch) => {
    console.log(user)
    dispatch({type: LOGIN, payload: user})

    localStorage.setItem('role', user.user_role);
    localStorage.setItem('id', user.id);

    //window.location.replace("https://www.w3schools.com")
}

export const logOut = () => dispatch => dispatch({type: LOGOUT});