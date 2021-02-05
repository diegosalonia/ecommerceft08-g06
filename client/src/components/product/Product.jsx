import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, showLoader, hideLoader, addToCart, getReviews } from '../../redux/productReducer/actions';

import { Button, Container, Typography, CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStylesProduct } from './styles';

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

    useEffect(() => {
        dispatch(getReviews(id));
        dispatch(getProduct(1, id)); // userId hard-coded
    }, []);

    useEffect(() => {
        product.quantity && setQuantity(product.quantity);
        console.log("REVIEWS: ", reviews[0]?.rating);
        setIsLoading(false);
    }, [product]);

    useEffect(() => {
        isInCart && alert("Product in cart, thanks!");
    }, [isInCart])
    
    const handleAddToCart = () => {
        dispatch(addToCart(product.userId, id, quantity));
    };

    const handleIncreaseQuantity = () => {
        quantity < product.stock && setQuantity(quantity + 1);
    };
    
    const handleDecreaseQuantity = () => {
        quantity > 1 && setQuantity(quantity - 1);
    };

    const productLoaded = () => {
        return (
            <Container>
                <Container className={styles.container} >
                    <Container className={styles.imagesContainer} >
                        <Container>
                            {biggerImage}
                        </Container>
                        <Container>
                            { product.image?.map(image => {
                                console.log("IMAGE: ", image);
                                return (
                                    <Container >
                                        <img key={image} src={ image } alt={ product.name } className={styles.image} />
                                    </Container>
                                )
                            })}
                        </Container>
                    </Container>
                    <Container className={styles.detailContainer} >
                        <Typography color='primary' variant='h4' align='center' >{ product.name }</Typography>
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
                        <Container>
                            
                        </Container>
                        <Container className={styles.rating} >
                            <Rating
                                name="product-rating"
                                defaultValue={3}
                                disabled
                            />
                            <Typography className={styles.ratingReviews} >(0) Reviews</Typography>
                        </Container>
                        <Typography className={styles.stock} >Stock: { product.stock }</Typography>
                        <Container>
                            <Button disabled={quantity === 1 ? true : false} onClick={handleDecreaseQuantity} >-</Button>
                            <Typography>{ quantity }</Typography>
                            <Button disabled={quantity === product.stock ? true : false} onClick={handleIncreaseQuantity} >+</Button>
                        </Container>
                        <Button className={styles.addToCart} onClick={() => handleAddToCart()} ><ShoppingCartIcon /><Typography className={styles.textCart} >ADD TO CART</Typography></Button>
                    </Container>
                </Container>
                <Container className={styles.description} >
                    <Typography variant='h4' >Description</Typography>
                    <Typography variant='body' >{ product.description }</Typography>
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