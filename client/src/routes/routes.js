import React from 'react'
import Provider from 'react'
import ReactDOM from 'react-dom'
import Product from '../components/product/Product'
import {BrowserRouter as Router, Route} from 'react-router-dom';

function Routes(){
    return(
        <React.Fragment>
            <Route path="products/:id" component={Product} />
        </React.Fragment>
    )
}
export default Routes;
