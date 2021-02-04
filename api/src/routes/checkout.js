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
            unit_price: parseInt(item.price - (item.price * (item.discount / 100))),
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
        res.send(response.body);
    })
    .catch(err => console.log(err));
});

server.put('/:userId', async (req, res) => {
    const { userId } = req.params,
    order = await Order.findOne({
        where: {
            userId: userId,
            status: 'cart'
        }
    });
    console.log("STATUS: ", req.body.status);
    order.status = req.body.status;
    order.save()
    .then(response => res.send(order))
    .catch(err => console.log(err));
});

module.exports = server;

/* 
?collection_id=1233462977&
collection_status=approved&
payment_id=1233462977&
status=approved&
external_reference=null&
payment_type=credit_card&
merchant_order_id=2288128093&
preference_id=184851111-77d359cf-f54f-4e58-a75e-71223b217f05&
site_id=MLA&
processing_mode=aggregator&
merchant_account_id=null
*/
