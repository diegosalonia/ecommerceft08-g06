import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Box} from '@material-ui/core'
import CategoriesCollection from './CategoriesCollection';
import { changeOrderStatus } from '../../redux/cartReducer/actions';
import jwt_decode from "jwt-decode";


export default function Home(props){
    const dispatch = useDispatch();
    const userId = JSON.parse(sessionStorage.getItem('id'));
    const jwt = props.match.query?.jwt;
    const history = useHistory();

    useEffect(() => {
        const url = window.location.href
        if (url.includes('status')) {
            dispatch(changeOrderStatus(userId)); // userId hardcoded
        };
        if (url.includes('loginGoogle=true')){
             let token = url.slice(1).split("&")[1].slice(2);
             console.log('AQUI TOKEN: ', token)
             let user = jwt_decode(token)
             console.log('USER:', user);
             sessionStorage.setItem("token", token);
             sessionStorage.setItem('id', user.id);
             sessionStorage.setItem("role", user.user_role);
             //dispatch(getUser(user))
             history.replace('/')
             
          }
        //    if(url.includes('loginFacebook=true')){
        //      let token = url.slice(1).split("&")[1].slice(2).split("#")[0];
        //      let user = jwt.decode(token)
        //      console.log(user)
        //      localStorage.setItem("token", token);
        //      dispatch(setUser(user))
        //      history.replace('/')
        //    } 
    }, [dispatch, userId]);

    useEffect(() => {
        jwt && sessionStorage.setItem('token', jwt)
    }, [jwt]);
  
    const useStyles = makeStyles((theme) => ({
            catCol:{
                margin: "auto",
                background: theme.palette.grey[200]   
            },
        })
      );
      const classes = useStyles();

    return (
        <>
        <Box className={classes.catCol}>
            <CategoriesCollection/>
        </Box>
        </>
    )
}
