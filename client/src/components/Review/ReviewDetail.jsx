import React from 'react'
import {Typography, Grid, makeStyles} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const testValues = {
    rating: 5,
    description: "Muy buen sustrato, muy buena calidad, completo, aireado, cumple con lo prometido. Probado en maceta en exteriores.",
    createdAt: "02/02/2021",
    username: "trebolLoco21"
}

const ReviewDetail = (props) => {

    const useStyles = makeStyles(theme => ({
            /* ratingDescription: {
                color: theme.palette.grey[400]
            } */
        })
    );

const classes = useStyles();
    return (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Rating name="read-only" value={testValues.rating} readOnly/>
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
