import React from 'react';
import {Typography, Box,  Card, CardContent, CardActionArea, CardActions, CardMedia,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';



const CategoryBox = (props) => {

    const {name, image, id, description} = props.category;
    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
            card:{
                paddingTop: theme.spacing(2),
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                margin: theme.spacing(2)
            },
            media: {
               width: "100%",
               display: "block"
            },
            center: {
                paddingTop: "24px",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center", 
                justifyContent: "center"
            }   
        })
    );
    const classes = useStyles();


    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.imgHolder} onClick={() => {history.push(`/products/?catId=${id}`)}}>
                <img src={image} className={classes.media}/>
         
            <CardContent className={classes.center}>
                <Typography gutterBottom variant="h6" color="primary" justify="center" className={classes.title}>
                <Box>
                    {name}
                </Box>
                </Typography>
            </CardContent>
            </CardActionArea>
        </Card>
    )    
    
}

export default CategoryBox; 
