import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

function AdminDashboard() {


    return (
        <Container>
            <Typography>Admin Dashboard</Typography>
            <Grid container >
                <Grid item >
                    <Link to='/admin/products' >
                        <Card>
                            <CardMedia
                                image="../../../resources/product-list.jpg"
                            />
                            <CardContent>
                                <Typography align='center' >Product List</Typography>
                                <Typography align='center' >Get acces to product list. Edit and delete your products!</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item >
                    <Link to='/admin/add-product' >
                        <Card>
                            <CardMedia />
                            <CardContent>
                                <Typography align='center' >Add product</Typography>
                                <Typography align='center' >Here you can add your new products</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                <Grid item >
                    <Link to='/admin/add-category' >
                        <Card>
                            <CardMedia />
                            <CardContent>
                                <Typography align='center' >Add category</Typography>
                                <Typography align='center' >Here you can add your new categories</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminDashboard;
