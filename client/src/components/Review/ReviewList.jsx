import React from 'react';
import {Typography, Grid, makeStyles} from '@material-ui/core';
import ReviewDetail from './ReviewDetail'

const ReviewList= (props) => {
    const {reviews} = props.reviews
    const DisplayReviews = () => {
        if (reviews.length >= 1){
            return reviews.map((item, inx) => {
                return <ReviewDetail key={inx} rating={item.rating} username={item.userId} createdAt={item.createdAt} comment={item.comment}/>             
            })
        }
        else{
            return <></>
        }
    }
    console.log("REVIEWS REVIEWLIST PROP", reviews)
    return <DisplayReviews />
}

export default ReviewList;