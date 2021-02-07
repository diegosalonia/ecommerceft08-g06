import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, showLoader, hideLoader, addToCart, 
         getReviews, editReviewAction } from '../../redux/productReducer/actions';

import { Button, Container, Typography, CircularProgress, Link, TextField } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStylesProduct } from './styles';
import ReviewResume from '../Review/ReviewResume';
import ImagesGalery from './ImagesGalery';
import ReviewContainer from '../Review/ReviewContainer';

function Product(props) {
    const dispatch = useDispatch();
    const styles = useStylesProduct();
    const { match: { params: { id }}} = props;
    const userId = JSON.parse(localStorage.getItem('id') || '1'); // second option hard-coded
    const reviews = useSelector(state => state.productReducer.reviews);
    const product = useSelector(state => state.productReducer.product);
    const isInCart = useSelector(state => state.productReducer.isInCart);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ quantity, setQuantity ] = useState(1);
    const [ biggerImage, setBiggerImage ] = useState();
    const [ totalReviews, setTotalReviews ] = useState(0);
    const [ averageRatings, setAverageRatings ] = useState(0);
    const [ editReview, setEditReview ] = useState(false);
    const [ review, setReview ] = useState({rating: null, comment: ''});
    const descriptionRef = useRef(null);
    const reviewRef = useRef(null);
    const setReviewRef = useRef(null);

    useEffect(() => {
        dispatch(getReviews(id));
        dispatch(getProduct(userId, id)); // userId hard-coded
    }, []);

    useEffect(() => {
        product.quantity && setQuantity(product.quantity);
        product.image && setBiggerImage(product.image[0]);
    }, [product]);

    useEffect(() => {
        isInCart && alert("Product in cart, thanks!");
    }, [isInCart])

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
        reviews.forEach(review => {
            if (review.user.id === userId) {
                setEditReview(true);
                setReview(review);
            };
        });
    }, [reviews]);
    
    const handleChangeQuantity = e => {
        if (quantity >= 1 && quantity <= product.stock && e.target.value >= 1 && e.target.value <= product.stock) {
            setQuantity(e.target.value);
        };
    };
    
    const handleAddToCart = () => dispatch(addToCart(product.userId, id, quantity));

    const handleReview = e => setReview({...review, [e.target.name]: e.target.value});

    const handleEditReview = () => dispatch(editReviewAction(review, review.id, product.id));

    const goToDescription = () => window.scrollTo({top: descriptionRef.current.offsetTop, behavior: 'smooth'});

    const goToReviews = () => window.scrollTo({top: reviewRef.current.offsetTop, behavior: 'smooth'});

    const goToSetReview = () => window.scrollTo({top: setReviewRef.current.offsetTop, behavior: 'smooth'});

    const productLoaded = () => {
        return (
            <Container>
                <Container className={styles.container} >
                    <ImagesGalery images={product.image} />
                    <Container className={styles.detailContainer} >
                        <Typography color='primary' variant='h4' align='center' >{ product.name }</Typography>
                        <Container className={styles.ratingContainer} >
                            <Rating
                                name='product-rating'
                                precision={0.1}
                                size='small'
                                defaultValue={reviews.length ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 3}
                                readOnly
                            />
                            <Link onClick={goToReviews} className={styles.reviewTotal} >{`${reviews.length} opiniones`}</Link>
                            {
                                editReview && <Button className={styles.goToSetReview} onClick={goToSetReview}>Rate product</Button>
                            }
                        </Container>
                        <Container className={styles.categories} >
                            { product.categories?.slice(0, 3).map(category => <Typography key={category} className={styles.category} >{ category }</Typography>) }
                        </Container>
                        { product.discount !== 0 ? 
                                        <Container className={styles.price} >
                                            <Typography className={styles.lineThrough}>${ product.price }</Typography>
                                            <Typography className={styles.actualPrice} >{ `$${ product.price - ((product.discount / 100) * product.price)}` }</Typography>
                                        </Container> 
                                        :<Typography variant='h3' color='primary' >${ product.price }</Typography>
                        }
                        <Container className={styles.descriptionContainer} >
                            { product.description?.length > 60 ? (<Typography>
                                                                    {`${product.description.slice(0, 150)}...`}<Link className={styles.verMas} onClick={goToDescription} >More details</Link>
                                                                </Typography>)
                              : <Typography>{product.description}</Typography>
                            }
                        </Container>
                        <Container className={styles.quantityContainer} >
                            <TextField
                                className={styles.quantity}
                                type='number'
                                min={1}
                                max={product.stock}
                                defaultValue={quantity}
                                value={quantity}
                                onChange={handleChangeQuantity}
                            />
                            <Typography className={styles.stock} >{`(${product.stock} en stock)`}</Typography>
                        </Container>
                        <Button className={styles.addToCart} onClick={() => handleAddToCart()} ><ShoppingCartIcon /><Typography className={styles.textCart} >ADD TO CART</Typography></Button>
                    </Container>
                </Container>
                <Container ref={descriptionRef} className={styles.description} >
                    <Typography variant='h4' className={styles.descriptionTitle} >DESCRIPTION</Typography>
                    <Typography variant='body' >{ product.description }</Typography>
                </Container>
                <Container ref={reviewRef} className={styles.reviews} >
                    <ReviewContainer productId={id} />
                    <Container ref={setReviewRef} className={styles.addRating} >
                        <Typography className={styles.addRatingTitle} align='center' variant='h4' color='primary' >ADD REVIEW</Typography>
                        <Rating 
                            name='rating'
                            defaultValue={review.rating}
                            value={review.rating}
                            onChange={handleReview}
                            size='large'
                        />
                        <TextField
                            multiline
                            name='comment'
                            defaultValue={review.comment}
                            value={review.comment}
                            onChange={handleReview}
                        />
                        <Button className={styles.ratingButton} onClick={handleEditReview} >Edit review</Button>
                    </Container>
                </Container>
            </Container>
        );
    };
    
    return isLoading ? <CircularProgress disableShrink className={styles.isLoading} /> : productLoaded();
};

export default Product;

/* TODO:
    - Default image
*/