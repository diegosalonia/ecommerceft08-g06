import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {Box} from '@material-ui/core'
import CategoriesCollection from './CategoriesCollection';
import { changeOrderStatus } from '../../redux/cartReducer/actions';

export default function Home(){
    const dispatch = useDispatch();
    const userId = JSON.parse(sessionStorage.getItem('id'));
    if (window.location.href.includes('status')) {
        dispatch(changeOrderStatus(userId)); // userId hardcoded
    }
  
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
