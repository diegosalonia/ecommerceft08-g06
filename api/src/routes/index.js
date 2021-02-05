const { Router } = require('express');
// import all routers;
const authRouter = require('./auth.js')
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const userRouter = require('./user.js');
const orderRouter = require('./order');
const cartRouter = require('./cart');
const checkout = require('./checkout');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/users', userRouter);
router.use('/users', cartRouter);
router.use('/checkout', checkout);
router.use('/orders', orderRouter);

module.exports = router;
