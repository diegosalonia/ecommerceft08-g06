import React, {useEffect} from 'react';
import Catalog from './Catalog';
import {getProducts} from '../product/utils';
import testList from './testList'; //Simulate products array.


const CatalogContainer = () => {
    
    useEffect(() => {
        getProducts.then(products => {console.log(products)})
        .catch(err => {console.log("Fail get products, ", err)});
    }, [])

    
    return(
        <Catalog testlist={testList}/>
    )
}

export default CatalogContainer;
