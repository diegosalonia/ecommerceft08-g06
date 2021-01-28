import React, {useEffect, useState} from 'react';
import Catalog from './Catalog';
import { getProducts } from '../product/utils';
import { useDispatch } from 'react-redux';
import { getPaginatedProducts } from '../../redux/CatalogReducer/actions'



const CatalogContainer = () => {

    const [productList, setProductList] = useState([]);
    const dispatch = useDispatch();

    
    useEffect(() => {

        getProducts.then(products => {
                dispatch(getPaginatedProducts(1,1));
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
