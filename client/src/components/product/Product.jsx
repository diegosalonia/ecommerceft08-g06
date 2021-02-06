import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, showLoader, hideLoader, addToCart, getReviews } from '../../redux/productReducer/actions';

import { Button, Container, Typography, CircularProgress, Link, TextField } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStylesProduct } from './styles';
import ReviewResume from '../Review/ReviewResume';
import ImagesGalery from './ImagesGalery';

function Product(props) {
    const dispatch = useDispatch();
    const styles = useStylesProduct();
    const { match: { params: { id }}} = props;
    const [ isLoading, setIsLoading ] = useState(true);
    const reviews = useSelector(state => state.productReducer.reviews);
    const product = useSelector(state => state.productReducer.product);
    const isInCart = useSelector(state => state.productReducer.isInCart);
    const [ quantity, setQuantity ] = useState(1);
    const [ biggerImage, setBiggerImage ] = useState();
    const [ totalReviews, setTotalReviews ] = useState(0);
    const [ averageRatings, setAverageRatings ] = useState(0);
    const descriptionRef = useRef(null);

    useEffect(() => {
        dispatch(getReviews(id));
        dispatch(getProduct(1, id)); // userId hard-coded
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
        
    }, [reviews]);
    
    const handleAddToCart = () => {
        dispatch(addToCart(product.userId, id, quantity));
    };

    const handleChangeQuantity = e => {
        if (quantity >= 1 && quantity <= product.stock && e.target.value >= 1 && e.target.value <= product.stock) {
            setQuantity(e.target.value);
        }
    }

    const goToDescription = () => window.scrollTo({top: descriptionRef.current.offsetTop, behavior: 'smooth'});

    const productLoaded = () => {
        return (
            <Container>
                <Container className={styles.container} >
                    {/* <Container className={styles.thumbnailContainer} >
                        { product.image?.map(image => {
                            console.log("IMAGE: ", image);
                            return (
                                <Container key={image} >
                                    <img src={ image } alt={ product.name } className={styles.image} />
                                </Container>
                            )
                        })}
                    </Container>
                    <Container className={styles.imagesContainer} >
                        <Container>
                            <img src={biggerImage} alt='biggerImage' />
                        </Container>
                    </Container> */}
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
                            <Typography className={styles.reviewTotal} >{`${reviews.length} opiniones`}</Typography>
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
                            { product.description?.length > 30 ? (<Typography>
                                                                    {`${product.description.slice(0, 60)}...`}<Link className={styles.verMas} onClick={goToDescription} >ver mas</Link>
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
                    <Typography variant='h4' >Description</Typography>
                    <Typography variant='body' >{ product.description }</Typography>
                </Container>
                <Container className={styles.reviewContainer} >
                    <ReviewResume reviews={{totalReviews: reviews.length, avgRating: reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length}} />
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