const server = require('express').Router();
const { User, Order, Product, Order_line} = require('../db.js');

server.post('/:idUser/cart', async (req, res)=>{ // crea y verifica
    const product = await Product.findByPk(req.body.product.id);
    const quantity = req.body.product.quantity;
    const price = product.price - (product.price * (product.discount / 100));
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

server.put('/:idUser/cart/:idOrder',async (req, res)=>{ // actualiza el valor

    const product = await Product.findByPk(req.body.product.id);
    const quantity = req.body.product.quantity;
    const price = product.price;
    const user = await User.findByPk(req.params.idUser);
    let order = await Order.findOne({ where:{ id:req.params.idOrder, status: 'cart', userId: req.params.idUser}});

    if(!user){ res.status(400).send("this user doens't exist") };

    await product.addOrder(order, { through: { orderId: order.id, quantity, price } })
    .then(response =>{
        res.json(response);
    })
    .catch(err =>{
        console.log(err)
        res.send({
            mgs:"todo mal",
            error: err
        });
    });
})

server.delete('/:idUser/cart', async (req,res)=>{ // borra todo los valores
    const order = await Order.findOne({where:{ id: req.body.form.id, userId: req.params.idUser}})

    await order.destroy().then(resp =>{
        res.send(resp)
    }).catch(err=>{res.send(err)})
})

server.delete('/:idUser/cart/:idOrder/:idProduct', async (req,res)=>{ //borra un solo valor
    let order = await Order.findByPk(req.params.idOrder)
    let product = await order.getProducts({where:{id:req.params.idProduct}})
    
    await order.removeProduct(product)
    .then(resp=>{
        res.json(resp)
    })
    .catch(err=>{
        res.send(err)
    })
})

server.get('/:idUser/cart/:orderId', async (req,res)=>{ // muestra todos lo de carrito
    const order = await Order.findOne({where:{ id: req.params.orderId, userId: req.params.idUser}})

    await order.getProducts()
    .then(orders =>{
        res.send(orders);
    })
    .catch(err=>{
        res.send(err)
    })
})


module.exports = server;

