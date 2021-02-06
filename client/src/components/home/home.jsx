import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CategoriesCollection from './CategoriesCollection';

export default function Home(){
  
    const useStyles = makeStyles((theme) => ({
            root:{
            
            },
        })
      );
      const classes = useStyles();

    return (
        <>
            <CategoriesCollection />
        </>
    )
}
