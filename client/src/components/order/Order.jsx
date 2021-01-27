import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Container, Grid, Typography } from '@material-ui/core';

export default function Order(){
    const useStyles = makeStyles(theme =>({
        container:{
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop:"20px",
        }
    }))
    const classes = useStyles()
    return(
        <div className={classes.container}>
            <Typography variant="h5">hola</Typography>
        </div>
        
    )
}