import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Link, } from '@material-ui/core';
import { useStylesUserDashboard } from './styles';
import orderImage from '../../resources/orders.jpg';
import reviewImage from '../../resources/reviews.jpg';
import profileImage from '../../resources/profile.jpg';

const UserDashboard = () => {
    const styles = useStylesUserDashboard();
    const userRole = sessionStorage.getItem('role');

    const dashboard = () => {
        return (
            <Container>
                <Typography variant='h4' align='center' >User Dashboard</Typography>
                <Grid container spacing={8} className={styles.gridContainer} >
                    <Grid item lg={4} className={styles.card} >
                        <Link to='/user/orders' className={styles.link} >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                    image={orderImage}
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Orders</Typography>
                                    <Typography align='center' >Here you can see your orders. Date, amount, products and more!</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item lg={4} className={styles.card} >
                        <Link to='/user/reviews/' className={styles.link} >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                    image={reviewImage}
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Reviews</Typography>
                                    <Typography align='center' >Here you can see your reviews. Product, comment, stars!</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item lg={4} className={styles.card} >
                        <Link to='/user/profile' className={styles.link} >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                    image={profileImage}
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Profile</Typography>
                                    <Typography align='center' >Here you can see your profile data. Name, email, password and more!</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        )
    }

    return userRole === 'user' ? dashboard() : '404 NOT FOUND';
};

export default UserDashboard;
