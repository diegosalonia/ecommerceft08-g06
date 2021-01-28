import React, {useEffect, useState} from 'react';
import Catalog from './Catalog';
import { getProducts } from '../product/utils';
import { useDispatch } from 'react-redux';
import { getPageProducts } from '../../redux/CatalogReducer/actions'



const CatalogContainer = () => {

    const [productList, setProductList] = useState([]);
    const dispatch = useDispatch();

    
    useEffect(() => {

        getProducts.then(products => {
                dispatch(getPageProducts(2,3));
                console.log("The products", products);
                const productListWithId = products.data.map(product => {
                    const onlyCatIds = product.categories.map(category => category.id);
                    return {...product, categories: onlyCatIds}
                });
                setProductList(productListWithId)
        })
        .catch(err => {console.log("Fail get products, ", err)});
    }, [])

    useEffect(() => {
        console.log("Product list: ", productList)
    }, [productList])

    
    return(
        <Catalog testlist={productList}/>
    )
}

export default CatalogContainer;
