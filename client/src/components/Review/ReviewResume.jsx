import React from 'react';
import {Typography, Grid, makeStyles} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const testValues = {
    avgRating: 4.7,
    totalReviews: 43
}

const ReviewResume = (props) => {

    const useStyles = makeStyles(theme => ({
            ratingDescription: {
                color: theme.palette.grey[400]
            }
        })
    );

    const classes = useStyles();
    const {totalReviews, avgRating} = props.reviews;    


    return <Grid container direction="row" alignItems="center" justify="flex-start" spacing={1}>
        <Grid item xs={4} >
            <Typography variant="h2">
                {avgRating ? avgRating.toFixed(1) : '3.0'}
            </Typography>
        </Grid>
        <Grid item container xs={8} direction="column">
            <Rating name="read-only" value={avgRating ? avgRating : 3} readOnly precision={0.1}/>
            <Typography className={classes.ratingDescription} variant="body2">
                Promedio entre {totalReviews} opiniones
            </Typography>
        </Grid>
    </Grid>
}

export default ReviewResume; 
