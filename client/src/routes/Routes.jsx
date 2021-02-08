
import React from 'react';
import { Route, Router } from 'react-router-dom';
import {Container, Grid} from '@material-ui/core'
import Product from '../components/product/Product';
import CreateProductForm from '../components/product/Admin/CreateProductForm';
import AdminDashboard from '../components/product/Admin/AdminDashboard';
import AdminProductList from '../components/product/Admin/AdminProductList';
import AdminUserList from '../components/product/Admin/AdminUserList';
import UpdateProductForm from '../components/product/Admin/UpdateProductForm';
import CategoryForm from '../components/category/CategoryForm';
import MainNav from '../components/nav/MainNav';
import Home from '../components/home/home';
import CatalogContainer from '../components/catalog/CatalogContainer';
import Footer from '../components/footer/Footer';
import CatalogContainerSearch from '../components/catalog/CatalogContainerSearch';
import Order from '../components/orders/order/Order';
import OrderList from '../components/orders/admin/OrderList';
import UserForm from '../components/user/UserForm';
import UserDashboard from '../components/user/UserDashboard';
import ReviewContainer from '../components/Review/ReviewContainer';
import Cart from '../components/cart/Cart';
import PasswordReset from '../components/passwordReset/PasswordReset';
import UserProfile from '../components/user/Profile';

const Routes = () => {
    const userRole = sessionStorage.getItem("role")
    return(
        <>
            <Route path='/' component={MainNav}/>
                <Container style={{minHeight: "80vh", padding: "2em"}}>
                    <Route exact path='/' component={Home}/>
                    <Route path="/review/:productId" component={ReviewContainer} />   
                    <Route exact path='/admin' render={() => userRole==="admin"?<AdminDashboard/>:"not Found"} />
                    <Route exact path='/admin/orders' render={()=> userRole==="admin"?<OrderList/>:"not Found"} />
                    <Route exact path='/admin/orders/:userId/:orderId' render={()=> userRole==="admin"?<Order/>:"not found"} />
                    <Route exact path='/admin/products' render={()=> userRole==="admin"?<AdminProductList/>:"not found"} />
                    <Route exact path='/admin/users' render={() => userRole==="admin"?<AdminUserList/>:"not found"} />
                    <Route path='/admin/products/create-product' render={() => userRole==="admin"?<CreateProductForm/>:"not found"} />
                    <Route path="/admin/categories/create-category" render={()=> userRole==="admin"?<CategoryForm/>:"not found"} />
                    <Route path='/admin/products/:id/edit' render={()=>userRole==="admin"?<UpdateProductForm/>:"not found"} />
                    <Route exact path='/search' render={() => <CatalogContainerSearch/>}/>
                    <Route exact path='/user' render={()=>userRole==="user"?<UserDashboard/>:"not found"} />
                    <Route exact path='/user/profile' render={()=>userRole==="user"?<UserProfile/>:" not found"} />
                    <Route path='/user/sign-up' render={()=>userRole!=="user"&& userRole!=="admin"?<UserForm/>: "ya estas logeado"} />
                    <Route path="/products/:id" component={Product}/>
                    <Route exact path="/products" component={CatalogContainer} />
                    <Route path='/cart' component={Cart} />
                    <Route exact path ='/password-reset' component={PasswordReset}/>
                </Container>
            <Route path='/' component={Footer}/>
        </>        
    );
};

export default Routes;
