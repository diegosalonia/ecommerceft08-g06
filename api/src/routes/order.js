const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Order, User, Product } = require('../db.js');
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

server.get('/', (req, res) => {
    if (req.query.status) {
        const status = req.query.status;
    
        Order.findAll({
            where: {
                status: status
            },
            includes: [
                {model: User, attributes: ['email']}
            ]
        })
        .then(orders => res.send(orders))
        .catch(err => console.log(err));
    } else {
        Order.findAll({
            where: {
                status: ['canceled', 'approved', 'pending']
            },
            include: User
        })
        .then(orders => {
            const newOrders = orders.map(order => {
                return {
                    email: order.dataValues.user.dataValues.email,
                    id: order.dataValues.id,
                    status: order.dataValues.status,
                    shippingStatus: order.dataValues.shippingStatus,
                    createdAt: order.dataValues.createdAt,
                    userId: order.dataValues.userId
                };
            })
            res.send(newOrders);
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
            },
            {
                model: User,
                attributes: [
                    'email'
                ]
            }
        ]
    })
    .then(order => {
        console.log("ORDER IN BACK: ", order.dataValues.user);
        res.send(order);
    })
    .catch(err => console.log(err));
});

server.post('/reject-shipping', async (req, res) => {
    const { reason, infoToSend } = req.body;
    const email = await User.findOne({
        where: {
            id: infoToSend.userId
        },
        attributes: [
            'email'
        ]
    });
    const html = `
        <div>
            <h1>Su orden ha sido cancelada :(</h1>
            <p>Estimado cliente, lamentamos informarle que su 
            <a href=${`http://localhost:3001/user/orders/${infoToSend.id}`} >pedido</a> ha sido cancelado.
            </p>
            <h3>Razón</h3>
            <p>${reason}</p>
            <hr />
            <p><b>¡Esperamos tenerlo de vuelta en nuestra tienda!</b></p>
            <p><b>Un Jardin Especial</b></p>
        </div>
    `;

    const message = {
        to: email,
        from: 'dager2115@gmail.com',
        subject: 'Estado de envío de su orden',
        text: 'Estado de envío de su orden. Un Jardin Especial',
        html
    };

    sgMail.send(message)
    .then(response => res.send(response))
    .catch(err => console.log("ERROR AL ENVIAR REJECT SHIPPING: ", err));
});

server.post('/approve-shipping', async (req, res) => {
    const { id, userId } = req.body;
    const email = await User.findOne({
        where: {
            id: userId
        },
        attributes: [
            'email'
        ]
    });
    const html = `
        <div>
            <h1>Su orden ha llegado a destino!</h1>
            <p>Estimado cliente, nos comunicamos para informarle que su 
            <a href=${`http://localhost:3001/user/orders/${id}`} >pedido</a> ha llegado a destino.
            </p>
            <hr />
            <p><b>¡Esperamos tenerlo de vuelta en nuestra tienda! ¡Muchas gracias!</b></p>
            <p><b>Un Jardin Especial</b></p>
        </div>
    `;

    const message = {
        to: email,
        from: 'dager2115@gmail.com',
        subject: 'Estado de envío de su orden',
        text: 'Estado de envío de su orden. Un Jardin Especial',
        html
    };

    sgMail.send(message)
    .then(res => console.log("MAIL ENVIADO APPROVE SHIPPING: ", res))
    .catch(err => console.log("ERROR AL ENVIAR APPROVE SHIPPING: ", err));
});

server.post('/processing-shipping', async (req, res) => {
    const { id, userId } = req.body;
    const email = await User.findOne({
        where: {
            id: userId
        },
        attributes: [
            'email'
        ]
    });
    const html = `
        <div>
            <h1>Su orden está siendo procesada!</h1>
            <p>Estimado cliente, nos comunicamos para informarle que su 
            <a href=${`http://localhost:3001/user/orders/${id}`} >pedido</a> está siendo procesado.
            En cuanto terminemos de preparar su compra, le estaremos indicando el proceso del envío!
            </p>
            <hr />
            <p><b>¡Esperamos tenerlo de vuelta en nuestra tienda! ¡Muchas gracias!</b></p>
            <p><b>Un Jardin Especial</b></p>
        </div>
    `;

    const message = {
        to: email,
        from: 'dager2115@gmail.com',
        subject: 'Estado de envío de su orden',
        text: 'Estado de envío de su orden. Un Jardin Especial',
        html
    };

    sgMail.send(message)
    .then(res => console.log("MAIL ENVIADO PROCESSING SHIPPING: ", res))
    .catch(err => console.log("ERROR AL ENVIAR PROCESSING SHIPPING: ", err));
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
