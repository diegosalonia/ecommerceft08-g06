import React from 'react';
import { Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import Product from '../components/product/Product';
import CreateProductForm from '../components/product/Admin/CreateProductForm';
import AdminDashboard from '../components/product/Admin/AdminDashboard';
import AdminProductList from '../components/product/Admin/AdminProductList';
import UpdateProductForm from '../components/product/Admin/UpdateProductForm';
import SearchBar from '../components/category/search-bar';
import CategoryForm from '../components/category/CategoryForm';
import NavBar from '../components/nav/Nav';
import Home from '../components/home/home';
import CatalogContainer from '../components/catalog/CatalogContainer';
import Footer from '../components/footer/Footer';
import UserForm from '../components/user/UserForm'
function Routes(){
    return(
        <React.Fragment>
            <CssBaseline />
            <Route path='/' component={NavBar}/>
            <Route exact path = "/userForm" component ={UserForm}/>
            <Route exact path='/' component={Home}/>
            <Route exact path='/admin' component={AdminDashboard} />
            <Route exact path='/admin/products' component={AdminProductList} />
            <Route exact path='/admin/products/create-product' component={CreateProductForm} />
            <Route path="/admin/categories/create-category" component={CategoryForm} />
            <Route path='/admin/products/:id/edit' component={UpdateProductForm} />
            <Route path="/searchbar" component ={SearchBar}/>
            <Route path="/products/:id" component={Product}/>
            <Route exact path="/products" component={CatalogContainer} />
            <Route path='/' component={Footer}/>
        </React.Fragment>
    );
};

export default Routes;
