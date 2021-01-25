import React from 'react'
import image from '../../resources/meme.jpg' 
import { makeStyles } from '@material-ui/core/styles';


export default function Home(){
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
