const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js')
const userRouter = require('./user.js')
const orderRouter = require('./order');
const cartRouter = require('./cart')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/users', userRouter);
router.use('/users', cartRouter);
router.use('/orders', orderRouter);

module.exports = router;
