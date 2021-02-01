import React, { useEffect } from 'react';
/* import { useDispatch, useSelector } from 'react-redux'; */

import { Button, Container, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStylesProduct } from './styles';


function Product(props) {
   /*  const dispatch = useDispatch(); */
    const { description, discount, image, name, price, rating, stock, categories } = props.location.state;
    const styles = useStylesProduct();

    /* useEffect(() => {
        dispatch();
    }, []);
 */
    return (
        <Container>
            <Container className={styles.container} >
                <img src={ image } alt={ name } className={styles.image} ></img>
                <Container className={styles.detailContainer} >
                    <Typography variant='h6' align='center' >{ name }</Typography>
                    <Container className={styles.categories} >
                        { categories?.slice(0, 4).map(category => <Typography key={category} >{category}</Typography>) }
                    </Container>
                    { discount !== 0 ? 
                                    <Container className={styles.price} >
                                        <Typography className={styles.lineThrough}>${ price }</Typography>
                                        <Typography variant='h5' >{ `\xa0\xa0\xa0 $${price - ((discount / 100) * price)}` }</Typography>
                                    </Container> 
                                    :<Typography>${ price }</Typography>
                    }
                    <Typography>{ rating }</Typography>
                    {/* <Typography>
                        <Button>-</Button>
                        <Typography>{ quantityInCart }</Typography>
                        <Button >+</Button>
                    </Typography> */}
                    <Typography className={styles.stock} >In Stock: { stock }</Typography>
                    <Button className={styles.addToCart} ><ShoppingCartIcon /><Typography className={styles.textCart} >ADD TO CART</Typography></Button>
                </Container>
            </Container>
            <Container className={styles.description} >
                <Typography variant='h4' >Description</Typography>
                <Typography variant='body' >{ description }</Typography>
            </Container>
        </Container>
    );
};

export default Product

/* TODO:
    - Rating Stars
    - Default image
*/