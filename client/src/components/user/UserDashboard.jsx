import React from 'react';
import { makeStyles, Container, Typography, Grid, Card, CardMedia, CardContent, Link, } from '@material-ui/core';
import { useStylesUserDashboard } from './styles';

const UserDashboard = () => {
    const styles = useStylesUserDashboard();

    return (
        <Container>
            <Typography variant='h4' align='center' >User Dashboard</Typography>
            <Grid container spacing={8} className={styles.gridContainer} >
                <Grid item lg={4} className={styles.card} >
                    <Link to='/admin/products' className={styles.link} >
                        <Card className={styles.cardShadow} >
                            <CardMedia
                                className={styles.images}
                                // image={productListImage}
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
                                // image={addProduct}
                            />
                            <CardContent>
                                <Typography variant='h5' align='center' >Add product</Typography>
                                <Typography align='center' >Here you can add your new products. Name, price, stock and more!</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item lg={4} className={styles.card} >
                    <Link to='/admin/categories/create-category' className={styles.link} >
                        <Card className={styles.cardShadow} >
                            <CardMedia
                                className={styles.images}
                                // image={addCategory}
                            />
                            <CardContent>
                                <Typography variant='h5' align='center' >Add category</Typography>
                                <Typography align='center' >Here you can add your new categories. Name, description, image!</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserDashboard;
