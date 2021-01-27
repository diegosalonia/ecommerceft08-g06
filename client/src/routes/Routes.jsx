import React from 'react';
import { Route } from 'react-router-dom';
import Product from '../components/product/Product';
import CreateProductForm from '../components/product/Admin/CreateProductForm';
import AdminDashboard from '../components/product/Admin/AdminDashboard';
import AdminProductList from '../components/product/Admin/AdminProductList';
import UpdateProductForm from '../components/product/Admin/UpdateProductForm';
import CategoryForm from '../components/category/CategoryForm';
import MainNav from '../components/nav/MainNav';
import Home from '../components/home/home';
import CatalogContainer from '../components/catalog/CatalogContainer';
import Footer from '../components/footer/Footer';
import {Container, Grid} from '@material-ui/core'
import Order from '../components/order/Order';

const Routes = () => {
    return(
        <Grid container direction="column" justify="space-between" alignContent="stretch" spacing={3}>
            <Grid item xs={12}>
                <Route path='/' component={MainNav}/>
            </Grid>
            <Grid item xs={12}>
                <Container style={{minHeight: "73vh"}}>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/admin' component={AdminDashboard} />
                    <Route exact path='/admin/products' component={AdminProductList} />
                    <Route exact path='/admin/products/create-product' component={CreateProductForm} />
                    <Route path="/admin/categories/create-category" component={CategoryForm} />
                    <Route path='/admin/products/:id/edit' component={UpdateProductForm} />
                    <Route path="/products/:id" component={Product}/>
                    <Route exact path="/products" component={CatalogContainer} />
                    <Route exact path='/order'component={Order}/>
                </Container>
            </Grid>
            <Grid item xs={12}>
                <Route path='/' component={Footer}/>
            </Grid>
        </Grid>
    );
};

export default Routes;
