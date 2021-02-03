import React from 'react';
import ReviewResume from './ReviewResume';
import ReviewDetail from './ReviewDetail';
import {Box, makeStyles, Grid} from '@material-ui/core';

const ReviewContainer = () => {

    const useStyles = makeStyles(theme => ({
            boxContainer: {
               maxWidth: "300px"
            }
        })
    );

    const classes = useStyles();
    
    return (
        <Grid container direction="column" spacing={1}>
            <Box className={classes.boxContainer} mb={3}>
                <ReviewResume />
            </Box>
            <Box mb={3}>
                <ReviewDetail />
            </Box>
            <Box mb={3}>
                <ReviewDetail />
            </Box>
        </Grid>
        
    );
}

export default ReviewContainer; 