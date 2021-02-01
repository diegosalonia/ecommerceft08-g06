import React, { useState } from 'react';
import { Route, Router, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import { Container, Grid } from '@material-ui/core'
import Order from '../components/order/Order';
import UserForm from '../components/user/UserForm';
import CatalogContainerSearch from '../components/catalog/CatalogContainerSearch';

const Routes = () => {

    const products = useSelector(state => state.searchBarReducer.products)
    return(
        <>
                <Route path='/' component = {MainNav}/>
                    <Container style={{minHeight: "80vh", padding: "2em"}}>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/admin' component={AdminDashboard}/>
                        <Route exact path='/admin/products' component={AdminProductList}/>
                        <Route exact path='/admin/products/create-product' component={CreateProductForm}/>
                        <Route path="/admin/categories/create-category" component={CategoryForm}/>
                        <Route path='/admin/products/:id/edit' component={UpdateProductForm}/>
                        <Route exact path='/search' render={() => <CatalogContainerSearch/>}/>
                        <Route exact path="/products/:id" component={Product}/>
                        <Route exact path="/products" component={CatalogContainer}/>
                    </Container>
                <Route path='/' component={Footer}/>
        </>        
    );
};

export default Routes;
