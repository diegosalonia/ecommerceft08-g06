import React from 'react'
import {Typography, Grid, makeStyles, Box} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const testValues = {
    rating: 5,
    description: "Muy buen sustrato, muy buena calidad, completo, aireado, cumple con lo prometido. Probado en maceta en exteriores.",
    createdAt: "02/02/2021",
    username: "trebolLoco21"
}

const ReviewDetail = (props) => {

    const useStyles = makeStyles(theme => ({
            data: {
                color: theme.palette.primary.main,    
            } 
        })
    );

const classes = useStyles();
    return (
        <Grid container direction="column" spacing={1}>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                <Box mr={2}>
                    <Rating name="read-only" value={testValues.rating} readOnly/>        
                </Box>
                <Typography component="div" className={classes.data}>
                    <Box fontWeight="fontWeightBold" mt={1} mr={2}>
                        Por {testValues.username} - {testValues.createdAt}     
                    </Box>
                </Typography> 
            </Grid>
            <Grid item>
                <Typography variant="body1">
                    {testValues.description}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ReviewDetail;
