import React from 'react'
import { useDispatch } from 'react-redux';
import image from '../../resources/meme.jpg' 
import { makeStyles } from '@material-ui/core/styles';
import { changeOrderStatus } from '../../redux/cartReducer/actions';

export default function Home(){
    const dispatch = useDispatch();
    if (window.location.href.includes('status')) {
        dispatch(changeOrderStatus(1)); // userId hardcoded
    }
    const useStyles = makeStyles((theme) => ({

        meme:{
            alignItems: "center",
            justifyContent: "center",
            marginTop:"20px",
        },
       
      }));
      const classes = useStyles();
    return (
        <div className={classes.meme}><img src={image} style = {{display:"block", margin:"auto"}} alt='falto el alt' /></div>
    )
}
