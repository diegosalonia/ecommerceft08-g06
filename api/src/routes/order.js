const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Order, User } = require('../db.js');

server.get('/search', (req, res) => {
    const status = req.query.status;
    
    Order.findAll({
        where: {
            status: status
        }
    })
    .then(orders => res.send(orders))
    .catch(err => console.log(err));
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
    Order.findByPk(id)
    .then(order => res.send(order))
    .catch(err => console.log(err));
});

server.put('/:id', async (req, res) => {
    const orderUpdate = await Order.findByPk(req.params.id);
    Object.assign(orderUpdate, req.body.order);
    await orderUpdate.save()
    .then(order => res.send(order))
    .catch(err => console.log(err));
});
module.exports = server;
