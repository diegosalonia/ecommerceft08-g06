const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Order, User, Product } = require('../db.js');

server.get('/', (req, res) => {
    if (req.query.status) {
        const status = req.query.status;
    
        Order.findAll({
            where: {
                status: status
            }
        })
        .then(orders => res.send(orders))
        .catch(err => console.log(err));
    } else {
        Order.findAll({
            where: {
                status: ['canceled', 'approved', 'pending']
            }
        })
        .then(orders => {
            res.send(orders);
        })
        .catch(err => console.log(err));
    }
});

server.post('/', async (req, res) => {
    const order = {status: req.body.order.status};
    const user = await User.findByPk(req.body.order.userId);
    const newOrder = await Order.create(order)

    if (!user) res.status(404).send("User not found");

    user.addOrder(newOrder)
    .then(order => res.send(order))
    .catch(err => console.log(err));
});

server.get('/:id', (req, res) => {
    const { params: { id }} = req;
    Order.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: Product
            }
        ]
    })
    .then(order => {
        console.log("ORDER IN BACK: ", order);
        res.send(order);
    })
    .catch(err => console.log(err));
});

server.put('/:id', async (req, res) => {
    const orderUpdate = await Order.findByPk(req.params.id);
    Object.assign(orderUpdate, req.body);
    await orderUpdate.save()
    .then(order => {
        console.log("aqui esta la orden", order)
        res.send(order)
    })
    .catch(err => console.log(err));
});

server.put('/:id/:shippingStatus', async (req, res) => {
    const { id, shippingStatus } = req.params;
    const order = await Order.findByPk(id);

    order.shippingStatus = shippingStatus;

    order.save()
    .then(response => res.send(response))
    .catch(err => console.log("ERROR WHILE CHANGING SSTATUS: ", err));
})

server.delete('/:id', async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    order.destroy()
    .then(order => res.send(order))
    .catch(err => res.status(401).send(err));
})

module.exports = server;
