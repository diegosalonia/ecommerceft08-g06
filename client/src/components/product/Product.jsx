import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, addToCart, getReviews, 
         editReviewAction, addNewReview } from '../../redux/productReducer/actions';

import { Button, Container, Typography, CircularProgress, Link, TextField } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStylesProduct } from './styles';
import ImagesGalery from './ImagesGalery';
import ReviewContainer from '../Review/ReviewContainer';

function Product(props) {
    const dispatch = useDispatch();
    const styles = useStylesProduct();
    const { match: { params: { id }}} = props;
    const userId = JSON.parse(sessionStorage.getItem('id'));
    const reviews = useSelector(state => state.productReducer.reviews);
    const product = useSelector(state => state.productReducer.product);
    const isInCart = useSelector(state => state.productReducer.isInCart);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ quantity, setQuantity ] = useState(1);
    const [ editReview, setEditReview ] = useState(false);
    const [ review, setReview ] = useState({rating: null, comment: ''});
    const [ addReview, setAddReview ] = useState(false);
    const descriptionRef = useRef(null);
    const reviewRef = useRef(null);
    const setReviewRef = useRef(null);

    useEffect(() => {
        dispatch(getReviews(id));
        dispatch(getProduct(userId, id));
    }, [dispatch, id, userId]);

    useEffect(() => {
        product.quantity && setQuantity(product.quantity);
        product.noReviewed && setAddReview(true);
        product.toEditReview && setEditReview(true);
    }, [product]);

    useEffect(() => {}, [isInCart])

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000);
        reviews.forEach(review => {
            if (review.user?.id === userId) {
                setEditReview(true);
                setReview(review);
            };
        });
    }, [reviews, userId]);
    
    const handleChangeQuantity = e => {
        if (quantity >= 1 && quantity <= product.stock && e.target.value >= 1 && e.target.value <= product.stock) {
            setQuantity(e.target.value);
        };
    };
    
    const handleAddToCart = () => dispatch(addToCart(userId, Number(id), Number(quantity), product));

    const handleReview = e => setReview({...review, [e.target.name]: e.target.value});

    const handleAddReview = e => dispatch(addNewReview(review, id, userId));

    const handleEditReview = () => dispatch(editReviewAction(review, review.id, id));

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
                                defaultValue={reviews.length ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length : 0}
                                readOnly
                            />
                            <Link onClick={goToReviews} className={styles.reviewTotal} >{`${reviews.length} opiniones`}</Link>
                            {
                                (editReview || addReview) && <Button className={styles.goToSetReview} onClick={goToSetReview}>Calificar producto</Button>
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
                                                                    {`${product.description.slice(0, 150)}...`}<Link className={styles.verMas} onClick={goToDescription} >Más detalles</Link>
                                                                </Typography>)
                              : <Typography>{product.description}</Typography>
                            }
                        </Container>
                        { product.stock > 0 && <Container className={styles.quantityContainer} >
                            <TextField
                                className={styles.quantity}
                                type='number'
                                min={1}
                                max={product.stock}
                                value={quantity}
                                onChange={handleChangeQuantity}
                            />
                            <Typography className={styles.stock} >{`(${product.stock} en stock)`}</Typography>
                        </Container>}
                        { product.stock > 0 
                        ? <Button className={styles.addToCart} onClick={() => handleAddToCart()} ><ShoppingCartIcon /><Typography className={styles.textCart} >Añadir al carrito</Typography></Button>
                        : <Button className={styles.noStock} disabled='disabled' >Sin stock</Button>
                        }
                    </Container>
                </Container>
                <Container ref={descriptionRef} className={styles.description} >
                    <Typography variant="h4" className={styles.descriptionTitle} >DESCRIPCIÓN</Typography>
                    <Typography variant='body' >{ product.description }</Typography>
                </Container>
                <Container ref={reviewRef} className={styles.reviews} >
                    <ReviewContainer productId={id} />
                    {(editReview || addReview) && <Container ref={setReviewRef} className={styles.addRating} >
                        <Typography className={styles.addRatingTitle} align='center' variant='h4' color='primary' >{editReview ? 'EDITAR RESEÑA' : 'AÑADIR RESEÑA'}</Typography>
                        <Rating 
                            name='rating'
                            precision={1}
                            value={review.rating}
                            onChange={handleReview}
                            size='large'
                        />
                        <TextField
                            multiline
                            name='comment'
                            value={review.comment}
                            onChange={handleReview}
                        />
                        <Button className={styles.ratingButton} onClick={editReview ? handleEditReview : handleAddReview} >{editReview ? 'Editar reseña' : 'Añadir reseña'}</Button>
                    </Container>}
                </Container>
            </Container>
        );
    };
    
    return isLoading ? <CircularProgress disableShrink className={styles.isLoading} /> : productLoaded();
};

export default Product;
