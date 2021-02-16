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
    const userRole = sessionStorage.getItem('role');

    const dashboard = () => {
        return (
            <Container className={styles.container} >
                <Typography variant='h4' align='center' >Panel Administrador</Typography>
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
                                    <Typography variant='h5' align='center' >Lista de Productos</Typography>
                                    <Typography align='center' >Accede a la lista de productos. ¡Edita y borra tus productos!</Typography>
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
                                    <Typography variant='h5' align='center' >Agregar un producto</Typography>
                                    <Typography align='center' >Aquí puede agregar sus nuevos productos. ¡Nombre, precio, stock y más!</Typography>
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
                                    <Typography variant='h5' align='center' >Agregar categoria</Typography>
                                    <Typography align='center' >Aquí puede agregar sus nuevas categorías. Nombre, descripción, imagen!</Typography>
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
                                    <Typography variant='h5' align='center' >Lista de ordenes</Typography>
                                    <Typography align='center' >Obtenga acceso a la lista de pedidos. ¡Edite y vea los pedidos de los usuarios!</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item lg={2} />
                </Grid>
                <Grid container spacing={4} className={styles.gridContainer} >
                    <Grid item lg={2} />
                    <Grid item lg={4} className={styles.card} >
                        <Link to='/admin/users' className={styles.link} >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Lista de usuarios</Typography>
                                    <Typography align='center' >Aquí puedes ver  todos los usuarios. Nombre, descripción, promover o desactivar.</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item lg={4} className={styles.card} >
                        <Link to='/admin/categories' className={styles.link} >
                            <Card className={styles.cardShadow} >
                                <CardMedia
                                    className={styles.images}
                                />
                                <CardContent>
                                    <Typography variant='h5' align='center' >Lista de categoria</Typography>
                                    <Typography align='center' >Aquí puedes ver todas las categorías. ¡Nombre, descripcion, eliminar, etc!</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item lg={2} />
                </Grid>
                
            </Container>
        )
    };

    return userRole === 'admin' ? dashboard() : '404 NOT FOUND';
};

export default AdminDashboard;
