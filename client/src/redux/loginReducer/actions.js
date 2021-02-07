import { LOGIN, LOGOUT } from '../constants';
import axios from 'axios';


export const login = (user) => (dispatch) => {
    console.log('aqui user',user)
    
    sessionStorage.setItem('token', user.token)
    sessionStorage.setItem('role', user.user.user_role);
    sessionStorage.setItem('id', user.user.id);
    
    window.location.replace("http://localhost:3001/")
    return dispatch({type: "LOGIN", payload: user})
}

export const logout = (token) => dispatch =>{
    

    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = "http://localhost:3000/auth/logout"

    return axios.post(url,null,config)
    .then(()=>{
        dispatch({type: LOGOUT})

        sessionStorage.clear()

        window.location.replace("http://localhost:3001/")
    })
}