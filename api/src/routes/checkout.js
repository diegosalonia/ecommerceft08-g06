const server = require('express').Router();
const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'TEST-7543431084673570-011002-510f1b079bd2dbeb6027d3b12f74eabb-694878448'
});

server.post('/:userId/checkout', (req, res) => {
    const { products } = req.body;
    const itemsToMP = products.map(item => item);

});