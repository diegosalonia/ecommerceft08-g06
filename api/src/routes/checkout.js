const server = require('express').Router();
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-7543431084673570-011002-510f1b079bd2dbeb6027d3b12f74eabb-694878448'
});

server.post('/:userId/checkout', (req, res) => {
    console.log("BODY: ", req.body);
    const { products } = req.body;
    const itemsToMP = products.map(item => {
        return {
            title: item.name,
            unit_price: parseFloat(item.price),
            quantity: item.order_line.quantity
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
        console.log("RESPONSE MERCADOPAGO: ", response);
        res.redirect(response.body.init_point);
    })
    .catch(err => console.log(err));
});

module.exports = server;
