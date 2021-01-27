const server = require('express').Router();
const { User, Order, Product} = require('../db.js');

server.post('/:idUser/cart', async (req, res)=>{
    const product = await Product.findByPk(req.body.product.id)
    const quantity = req.body.product.quantity
    const price = parseInt((product.price * req.body.product.quantity), 10);
    const user = await User.findByPk(req.params.idUser)
    const order = await Order.findOrCreate({where:{userId: user.id}})

    if(!order){res.status(400).send("this order doens't exist")}
    if(!user){res.status(400).send("this user doens't exist")}

    await product.addOrder(order,{through: {orderId:order.id,quantity, price}})
    .then(response =>{
        res.send("todo bien")
    })
    .catch(err =>{
        console.log(err)
        res.send({
            mgs:"todo mal",
            error: err
        })
    })

})


server.delete('/:idUser/cart/:productId', async (req,res)=>{


})

module.exports = server;
