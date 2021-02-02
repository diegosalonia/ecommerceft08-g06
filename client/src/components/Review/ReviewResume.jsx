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



    return <Grid container direction="row" alignItems="center" justify="flex-start" spacing={1}>
        <Grid item xs={4} >
            <Typography variant="h2">
                {testValues.avgRating}
            </Typography>
        </Grid>
        <Grid item copntainer xs={8} direction="column">
            <Rating name="read-only" value={testValues.avgRating} readOnly precision={0.1}/>
            <Typography className={classes.ratingDescription} variant="body2">
                Promedio entre {testValues.totalReviews} opiniones
            </Typography>
        </Grid>
    </Grid>
}

export default ReviewResume; 
