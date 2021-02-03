import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useStylesDashboard } from './styles/AdminDashboard';
import productListImage from '../../../resources/product-list.jpg';
import addProduct from '../../../resources/addProduct.jpg';
import addCategory from '../../../resources/addCategory.jpg';
import orderImage from '../../../resources/orderList.jpg';

function AdminDashboard() {
    const styles = useStylesDashboard();

    return (
        <Container className={styles.container} >
            <Typography variant='h4' align='center' >Admin Dashboard</Typography>
            <Grid container spacing={4} className={styles.gridContainer} >
                <Grid item lg={2} />
                <Grid item lg={4} className={styles.card} >
                    <Link to='/admin/products' className={styles.link} >
                        <Card className={styles.cardShadow} >
                            <CardMedia
                                className={styles.images}
                                image={productListImage}
                            />
                            <CardContent>
                                <Typography variant='h5' align='center' >Product List</Typography>
                                <Typography align='center' >Get acces to product list. Edit and delete your products!</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item lg={4} className={styles.card} >
                    <Link to='/admin/products/create-product' className={styles.link} >
                        <Card className={styles.cardShadow} >
                            <CardMedia
                                className={styles.images}
                                image={addProduct}
                            />
                            <CardContent>
                                <Typography variant='h5' align='center' >Add product</Typography>
                                <Typography align='center' >Here you can add your new products. Name, price, stock and more!</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item lg={2} />
            </Grid>
            <Grid container spacing={4} className={styles.gridContainer} >
                <Grid item lg={2} />
                <Grid item lg={4} className={styles.card} >
                    <Link to='/admin/categories/create-category' className={styles.link} >
                        <Card className={styles.cardShadow} >
                            <CardMedia
                                className={styles.images}
                                image={addCategory}
                            />
                            <CardContent>
                                <Typography variant='h5' align='center' >Add category</Typography>
                                <Typography align='center' >Here you can add your new categories. Name, description, image!</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item lg={4} className={styles.card} >
                    <Link to='/admin/orders' className={styles.link} >
                        <Card className={styles.cardShadow} >
                            <CardMedia
                                className={styles.images}
                                image={orderImage}
                            />
                            <CardContent>
                                <Typography variant='h5' align='center' >Order List</Typography>
                                <Typography align='center' >Get acces to order list. Edit and see user orders!</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item lg={2} />
            </Grid>
        </Container>
    );
};

export default AdminDashboard;
