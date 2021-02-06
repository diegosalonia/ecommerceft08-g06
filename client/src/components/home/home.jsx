import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box} from '@material-ui/core'
import CategoriesCollection from './CategoriesCollection';

export default function Home(){
  
    const useStyles = makeStyles((theme) => ({
            catCol:{
                margin: "auto",
                maxWidth: "70%",
                background: "red"    
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
