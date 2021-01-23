import React from 'react';
import { Typography, Container} from '@material-ui/core';
import { useStylesProductCard } from './styles';

export const ProductPrice = ({ price, discount }) => {
             
    const style = useStylesProductCard();

    const definePrice = (price, discount) => {
        return discount !== 0 ?
                             <Container>
                                 <Typography>
                                     <span className={style.lineThrough}>
                                         $ { price } 
                                    </span>
                                    $ {  price - ((discount / 100) * price) }
                                </Typography>
                             </Container> 
                             : <Typography>
                                 ${ price }
                               </Typography>
    }     
    return (
            <Typography gutterBottom variant="h5" component="h2" >
                {definePrice(price, discount)}
          </Typography>
    );
};
