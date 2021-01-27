const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Order, User } = require('../db.js');

server.get('/search', (req, res) => {
    if (req.query) {
        const status = req.query.status;
    
        Order.findAll({
            where: {
                status: status
            }
        })
        .then(orders => res.send(orders))
        .catch(err => console.log(err));
    } else {
        Order.findAll()
        .then(orders => res.send(orders))
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

module.exports = server;