import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardActionArea, CardActions, CardMedia, Typography, Button, Box } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import { addToCart } from '../../redux/productReducer/actions';

function ProductCard(props) {
    const dispatch = useDispatch();
    const {id, name, description, image, discount, price, stock} = props.productProps;
    const history = useHistory();
    const userId = JSON.parse(localStorage.getItem('id'));

    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 296,
      },
      media: {
        height: 296,
      },
      title:{
        margin: "auto",
        textAlign: "left"
      },
      discountPrice: {
        textDecoration: "line-through",
        color: theme.palette.grey[500],
        marginRight: theme.spacing(2)
      },
      boxRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%" 
      },
    }));

    const classes = useStyles();
  
    const SmartPrice = () => {
      if(discount > 0){
        return (
          <Box className={classes.boxRow} spacing={2}>
            <Typography className={classes.discountPrice}>${price}</Typography><Typography color="primary">${price - ((discount / 100) * price)}</Typography>
          </Box>

          )
      }
      else{
          return(
            <Button size="large" color="primary">
              ${price}
            </Button>
            )
      }
    }

    const handleAddToCart = () => dispatch(addToCart(userId, Number(id), 1, props.productProps));

    return (
        <Card className={classes.root}>
        <CardActionArea onClick={() => {history.push(`/products/${id}`)}}>
          <CardMedia
            className={classes.media}
            image={image[0]}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="h4" color="primary" justify="center" className={classes.title}>
              <Box>
                {name}
              </Box>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description.slice(0, 60)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box className={classes.boxRow}>
            <SmartPrice />
            <Button size="small" color="primary" onClick={handleAddToCart} >
              <ShoppingCartIcon />
            </Button>
          </Box>
        </CardActions>
      </Card>
    );
};

export default ProductCard



