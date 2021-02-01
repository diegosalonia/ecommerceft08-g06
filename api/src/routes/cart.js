const server = require('express').Router();
const { User, Order, Product} = require('../db.js');

server.post('/:idUser/cart', async (req, res)=>{
    const product = await Product.findByPk(req.body.product.id);
    const quantity = req.body.product.quantity;
    const price = product.price;
    const user = await User.findByPk(req.params.idUser);
    let order = await Order.findOne({ where:{ userId: user.id, status: 'cart'} });

    if (!order) {
        order = await Order.create()
        user.addOrder(order);
    };

    if(!user){ res.status(400).send("this user doens't exist") };

    await product.addOrder(order, { through: { orderId: order.id, quantity, price } })
    .then(response =>{
        res.send(response);
    })
    .catch(err =>{
        console.log(err)
        res.send({
            mgs:"todo mal",
            error: err
        });
    });
});

module.exports = server;
