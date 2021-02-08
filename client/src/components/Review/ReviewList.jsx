import React from 'react';
import ReviewDetail from './ReviewDetail'

const ReviewList= (props) => {
    const {reviews} = props.reviews
    const DisplayReviews = () => {
        if (reviews.length >= 1){
            return reviews.map((item, inx) => {
                return <ReviewDetail key={inx} rating={item.rating} username={item.userId} createdAt={item.createdAt} comment={item.comment} email={item.user.email}/>             
            })
        }
        else{
            return <>No reviews for this product</>
        }
    }
    
    return <DisplayReviews />
}

export default ReviewList;