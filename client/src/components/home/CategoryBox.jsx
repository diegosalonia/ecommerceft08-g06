import React from 'react';
import {Typography, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';



const CategoryBox = (props) => {

    const {name, image, id} = props.category;
    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
            box:{
                display: "flex",
                flexDirection: "column",
                maxWidth: "330px",
                maxHeight: "330px",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
            },
            media: {
                maxWidth:"140px",
                margin: "15px"
            }
        })
    );
    const classes = useStyles();


    return (
        <Box className={classes.box} spacing={2} onClick={() => {history.push(`/products/?catId=${id}`)}}>
            <img src={image} className={classes.media}/>
            <Typography>
                {name}
            </Typography>
        </Box>
    )    
    
}

export default CategoryBox; 
