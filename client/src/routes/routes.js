import React from 'react'
// import Product from '../components/product/Product'
import ProductCard from '../components/product/ProductCard'
import ProductForm from '../components/product/ProductForm';
import CategoryForm from '../components/category/CategoryForm';
import Catalog from '../components/catalog/Catalog';
import { Route } from 'react-router-dom';
import image from '../resources/default-image.png'

function Routes(){
    return(
        <React.Fragment>
            <Route path="/productform" component={ProductForm} />
            <Route path="/categoryform" component={CategoryForm} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/productcard" render = {() => <ProductCard productId={1} description={"descripcion completa del producto. podrian ser varias lineas y deberia verse bien. espero que así sea."} name={"product 2"} price= {20} stock= {30} image = {image} discount={15}/>} />
        </React.Fragment>
    )
}
export default Routes;
