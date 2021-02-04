import { LOGIN, LOGOUT } from '../constants';


export const login = user => dispatch => dispatch({type: LOGIN, payload: user});

export const logOut = () => dispatch => dispatch({type: LOGOUT});