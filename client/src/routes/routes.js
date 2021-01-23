import React from 'react'
import Product from '../components/product/Product'
import ProductCard from '../components/product/ProductCard'
import CreateProductForm from '../components/product/Admin/CreateProductForm';
import { Route } from 'react-router-dom';
import AdminDashboard from '../components/product/Admin/AdminDashboard';
import AdminProductList from '../components/product/Admin/AdminProductList';
import UpdateProductForm from '../components/product/Admin/UpdateProductForm';
import { CssBaseline } from '@material-ui/core';
import image from '../resources/default-image.png'
import SearchbBar from '../components/category/search-bar'
import CategoryForm from '../components/category/CategoryForm'
import Catalog from '../components/catalog/Catalog'

function Routes(){
    return(
        <React.Fragment>
            <CssBaseline />
            {/* <Route path="/" component={CreateProductForm} /> */}
            {/* <Route path="/productcard" render = {() => <ProductCard productId={1} description={"descripcion completa del producto. podrian ser varias lineas y deberia verse bien. espero que así sea."} name={"product 2"} price= {20} stock= {30} image = {image} discount={15}/>} /> */}
            <Route exact path='/admin' component={AdminDashboard} />
            <Route exact path='/admin/products' component={AdminProductList} />
            <Route exact path='/admin/products/create-product' component={CreateProductForm} />
            <Route path="/admin/categories/create-category" component={CategoryForm} />
            <Route path='/admin/products/:id/edit' component={UpdateProductForm} />
            <Route path="/searchBar" component ={SearchbBar}/>
            <Route path="/products/:id" render = {() => <Product description={"descrpcion"} name={"product 2"} price= {20} stock= {30}/>} />
            <Route path="/productcard" render = {() => <ProductCard productId={1} description={"descripcion completa del producto. podrian ser varias lineas y deberia verse bien. espero que así sea."} name={"product 2"} price= {20} stock= {30} image = {image} discount={15}/>} />
            <Route path="/products" component={Catalog} />
        </React.Fragment>
    )
}
export default Routes;
