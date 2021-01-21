import React from 'react';
import { Button, Container, CssBaseline, Typography, } from '@material-ui/core';
import { useStylesProductCard } from './styles';

function ProductCard({ productId, discount, featured, image, 
                   name, price, stock, }) {
             
    const style = useStylesProductCard();
                 
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={style.imgWrapper} onClick={() => alert("te llevo al detalle del producto?")}> {/*dispatchear la action para ir al detalle*/}
                <div className={style.img}>
                    <img src={ image } alt={ name }></img>
                </div>
                <div className={style.buttonContainer}>
                    <Button color="primary" variant="contained" fullWidth type="submit" className={style.button}>ADD TO CART</Button>
                    {/*<Button color="secondary" variant="contained" fullWidth type="submit" className={style.button}>VIEW DETAILS</Button>*/}
                </div>
                <div>
                <Typography component="h3">{ name }</Typography>
                { discount !== 0 ? // ToDo sacar esto afuera. Y usarlo en todos los lugares donde lo necesitemos.
                             <span> <span className={style.lineThrough}>${ price }</span>
                                ${ price - ((discount / 100) * price) }
                             </span> 
                             : <span>{ price }</span>
                }
                </div>
            </div>
        </Container>
    );
};

export default ProductCard
