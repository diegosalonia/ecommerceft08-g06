import React, {useEffect} from 'react';
import ReviewResume from './ReviewResume';
import ReviewDetail from './ReviewDetail';
import {Box, makeStyles, Grid} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getDataReviews} from '../../redux/ReviewReducer/actions'

const ReviewContainer = () => {
    
    const dispatch = useDispatch();
    const {productId} = useParams();

    const useStyles = makeStyles(theme => ({
            boxContainer: {
               maxWidth: "300px"
            }
        })
    );

    const classes = useStyles();

    useEffect(() => {
        dispatch(getDataReviews(productId));    
    }, [])
    
    return (
        <Grid container direction="column" spacing={1}>
            <Box className={classes.boxContainer} mb={3}>
                {productId}
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