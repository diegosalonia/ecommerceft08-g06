const server = require('express').Router(),
    mercadopago = require('mercadopago'),
    { Order } = require('../db');

mercadopago.configure({
    access_token: 'TEST-1294034537296050-020319-656eec508b141c98a397a25ddd2684c7-184851111'
});

server.post('/:userId', (req, res) => {
    const { products } = req.body;
    const itemsToMP = products.map(item => {
        return {
            title: item.name,
            unit_price: Number(item.price - (item.price * (item.discount / 100))),
            quantity: Number(item.order_line.quantity)
        };
    });

    const preference = {
        items: itemsToMP,
        back_urls: {
            success: 'http://localhost:3001/',
            failure: 'http://localhost:3001/',
            pending: 'http://localhost:3001/'
        },
        auto_return: 'approved'
    };

    mercadopago.preferences.create(preference)
    .then(response => {
        res.send(response.body);
    })
    .catch(err => console.log(err));
});

server.put('/:userId', async (req, res) => {
    const { userId } = req.params
    console.log("USERID: ", userId);
    console.log("status: ", req.body.status);
    const order = await Order.findOne({
        where: {
            userId: userId,
            status: 'cart'
        }
    });
    
    console.log("ORDER: ", order);

    order.status = req.body.status;
    order.save()
    .then(response => res.send(order))
    .catch(err => console.log(err));
});

module.exports = server;
