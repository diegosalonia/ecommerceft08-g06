import React from 'react'
import { Button, Container, Typography } from '@material-ui/core';
import { useStylesProduct } from './styles';

function Product(props) {
    const { description, discount, featured, image, name, price, rating, stock, categories } = props.location.state;
    const styles = useStylesProduct();

    return (
        <Container className={styles.container} >
            <img src={ image } alt={ name }></img>
            <Container>
                <Typography variant='h2' >{ name }</Typography>
                { categories?.map(category => <Typography variant='p' >{category}</Typography>) }
                { discount !== 0 ? 
                                <Typography> <Typography className={"lineThrough"}>${ price }</Typography>
                                    ${ price - (discount * price) }
                                </Typography> 
                                : <Typography>{ price }</Typography>
                }
                <Typography>{ rating }</Typography>
                <Typography>{ description }</Typography>
                {/* <Typography>
                    <Button>-</Button>
                    <Typography>{ quantityInCart }</Typography>
                    <Button>+</Button>
                </Typography> */}
                <Typography>{ stock }</Typography>
                <Button>ADD TO CART</Button>
            </Container>
        </Container>
    );
};

export default Product

/* TODO:
    - Rating Stars
    - Default image
*/