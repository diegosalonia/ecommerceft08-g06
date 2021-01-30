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

server.put('/:idUser/cart/:idOrder',async (req, res)=>{
    const { quantity, id } = req.body.product;
    const { idUser, idOrder } = req.params;

    Order.findOne({ 
        where:{ id: idOrder},
        include: [
            {
                model: Product,
                where: {
                    id: id
                }
            }
        ]
    })
    // .then(order => {
        //     console.log("QUANTITY PRODUCT: ", order.dataValues.products[0].dataValues.order_line.dataValues.quantity);
        //     res.send(order);
        // })
        // .catch(err => console.log(err));
        
    order.dataValues.products[0].dataValues.order_line.dataValues.quantity = quantity;

    await order.save()
    await order.reload()
})

server.delete('/:idUser/cart', async (req,res)=>{
    const order = await Order.findOne({where:{ id: req.body.form.id}})

    await order.destroy().then(resp =>{
        res.send()
    }).catch(err=>{res.send(err)})
})

server.get('/:idUser/cart/:orderId', async (req,res)=>{
    const order = await Order.findOne({where:{ id: req.params.orderId}})

    await order.getProducts()
    .then(orders =>{
        console.log("GET ORDER: ", orders[0].dataValues.order_line.da);
        res.send(orders);
    })
    .catch(err=>{
        res.send(err);
    });
})


module.exports = server;
