import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Link } from '@material-ui/core';
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
                <Typography variant='h4' align='center' >Panel de usuario</Typography>
                <Grid container spacing={8} className={styles.gridContainer} >
                    <Grid item lg={1} />
                    <Grid item lg={4} className={styles.card} >
                        <Link href='/user/orders' className={styles.link} underline="none" >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                    image={orderImage}
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Ordenes</Typography>
                                    <Typography align='center' >Aquí puedes ver tus ordenes. ¡Fecha en la cual las hiciste! entre mas</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    {/* <Grid item lg={4} className={styles.card} >
                        <Link href='/user/reviews/' className={styles.link} underline="none" >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                    image={reviewImage}
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Reviews</Typography>
                                    <Typography align='center' >Aquí puedes ver tus reseñas. Del producto, comentario, estrellas!</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid> */}
                    <Grid item lg={1} />
                    <Grid item lg={4} className={styles.card} >
                        <Link href='/user/profile' className={styles.link} underline="none" >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                    image={profileImage}
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Profile</Typography>
                                    <Typography align='center' >Aquí puede ver los datos de su perfil. ¡Nombre, correo electrónico!</Typography>
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
