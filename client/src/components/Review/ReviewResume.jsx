import React from 'react';
import {Typography, Grid, makeStyles} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const testValues = {
    avgRating: 4.7,
    totalReviews: 43,
    stars: {
        five: 33,
        four: 8, 
        three: 1,
        two: 0,
        one: 1
    }
}

const ReviewResume = (props) => {

    const useStyles = makeStyles(theme => ({
            ratingDescription: {
                color: theme.palette.grey[400]
            }
        })
    );

    const classes = useStyles();



    return <Grid container direction="column" alignItems="flex-end" justify="space-between">
        <Typography variant="h2">
            {testValues.avgRating}
        </Typography>
        <Rating name="read-only" value={testValues.avgRating} readOnly precision={0.5}/>
        <Typography className={classes.ratingDescription} variant="body2">
            Promedio entre {testValues.totalReviews} opiniones
        </Typography>
    </Grid>
}

export default ReviewResume; 
