
import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from '@material-ui/core'
import Product from '../components/product/Product';
import CreateProductForm from '../components/product/Admin/CreateProductForm';
import AdminDashboard from '../components/product/Admin/AdminDashboard';
import AdminProductList from '../components/product/Admin/AdminProductList';
import AdminUserList from '../components/user/admin/AdminUserList';
import AdminCategoryList from '../components/category/admin/AdminCategoryList';
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
import Email from './Email';
import NewOrderList from '../components/orders/admin/NewOrderList';


const Routes = () => {
    return(
        <>
            <Route path='/' component={MainNav}/>
                <Container style={{minHeight: "80vh", padding: "2em"}}>
                    <Route exact path='/' component={Home}/>
                    <Route path="/review/:productId" component={ReviewContainer} />   
                    <Route exact path='/admin' component={AdminDashboard} />
                    <Route exact path='/admin/orders' component={NewOrderList} />
                    <Route exact path='/admin/orders/:orderId' component={Order} />
                    <Route exact path='/admin/products' component={AdminProductList} />
                    <Route exact path='/admin/users' component={AdminUserList} />
                    <Route exact path='/admin/categories' component={AdminCategoryList} />
                    <Route path='/admin/products/create-product' component={CreateProductForm} />
                    <Route path="/admin/categories/create-category" component={CategoryForm} />
                    <Route path='/admin/products/:id/edit' component={UpdateProductForm} />
                    <Route exact path='/search' render={() => <CatalogContainerSearch/>}/>
                    <Route exact path='/user' component={UserDashboard} />
                    <Route exact path='/user/profile' component={UserProfile} />
                    <Route path='/user/sign-up' component={UserForm} />
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
