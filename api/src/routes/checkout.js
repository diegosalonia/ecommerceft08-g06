const server = require('express').Router();
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-1294034537296050-020319-656eec508b141c98a397a25ddd2684c7-184851111'
});

server.post('/:userId/checkout', (req, res) => {
    const { products } = req.body;
    const itemsToMP = products.map(item => {
        return {
            title: item.name,
            unit_price: item.price - (item.price * (item.discount / 100)),
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
        // res.send(response.body);
        res.redirect(response.body.init_point);
    })
    .catch(err => console.log(err));
});

module.exports = server;
