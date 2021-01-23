import React from 'react'
// import Product from '../components/product/Product'
import ProductCard from '../components/product/ProductCard'
import CreateProductForm from '../components/product/Admin/CreateProductForm';
import { Route } from 'react-router-dom';
import AdminDashboard from '../components/product/Admin/AdminDashboard';
import AdminProductList from '../components/product/Admin/AdminProductList';
import UpdateProductForm from '../components/product/Admin/UpdateProductForm';
import { CssBaseline } from '@material-ui/core';

function Routes(){
    return(
        <React.Fragment>
            <CssBaseline />
            {/* <Route path="/" component={CreateProductForm} /> */}
            {/* <Route path="/productcard" render = {() => <ProductCard productId={1} description={"descripcion completa del producto. podrian ser varias lineas y deberia verse bien. espero que así sea."} name={"product 2"} price= {20} stock= {30} image = {image} discount={15}/>} /> */}
            <Route exact path='/' component={AdminDashboard} />
            <Route exact path='/admin/products' component={AdminProductList} />
            <Route exact path='/admin/products/create-product' component={CreateProductForm} />
            <Route path='/admin/products/:id/edit' component={UpdateProductForm} />
        </React.Fragment>
    )
}
export default Routes;
