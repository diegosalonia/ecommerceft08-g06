import axios from 'axios';


export const getProducts = axios.get('http://localhost:3000/products');
export const getProduct = id => axios.get(`http://localhost:3000/products/${id}`);
