import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
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

const Routes = () => {
    const[search, setSearch] = useState({
        searching: false,
        keyword: "",
        products:[],
        change: false
    })
    
    return(
        <Grid container direction="column" justify="space-between" alignContent="stretch" spacing={3}>
            <Grid item xs={12}>
                <Route path='/' render = {() => <MainNav setSearch={setSearch}/>}>
                    
                </Route>
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
                    <Route exact path="/products" render={()=><CatalogContainer products={search.products} setSearch={setSearch}/>} />
                    {search.searching&&<Redirect to={{
                        pathname: '/products',
                        search: `${search.keyword}`
                    }}/>}
                    {search.change&&<Redirect to='/products'/>}
                </Container>
            </Grid>
            <Grid item xs={12}>
                <Route path='/' component={Footer}/>
            </Grid>
        </Grid>
    );
};

export default Routes;
