import React from 'react'
// import Provider from 'react'
// import ReactDOM from 'react-dom'
import Product from '../components/product/Product'
import ProductCard from '../components/product/ProductCard'
import { Route } from 'react-router-dom';
import image from '../resources/default-image.png'
import SearchbBar from '../components/category/search-bar'
import CategoryForm from '../components/category/CategoryForm'
import Catalog from '../components/catalog/Catalog'

function Routes(){
    return(
        <React.Fragment>
            <Route path="/searchBar" component ={SearchbBar}/>
            <Route path="/products/:id" render = {() => <Product description={"descrpcion"} name={"product 2"} price= {20} stock= {30}/>} />
            <Route path="/productcard" render = {() => <ProductCard productId={1} description={"descripcion completa del producto. podrian ser varias lineas y deberia verse bien. espero que así sea."} name={"product 2"} price= {20} stock= {30} image = {image} discount={15}/>} />
            <Route path="/category" component={CategoryForm} />
            <Route path="/catalog" component={Catalog} />
        </React.Fragment>
    )
}
export default Routes;
