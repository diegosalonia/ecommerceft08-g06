const server = require('express').Router();
const { Order, User } = require('../db.js');
const { Sequelize } = require('sequelize');

server.get('/', (req, res, next) => {
    User.findAll()
    .then(response =>{
        res.send(response)
    })
    .catch(next)
});

server.get('/:id/orders', (req, res) => {
    Order.findAll({
        where: {
			userId: req.params.id
			}
    })
    .then(orders => {
		res.json(orders);
	})
	.catch(err=>{
		res.send(err);
	})
})

server.post('/', (req, res) => {
    User.create(req.body.form)
    .then(response => {
        res.send(response)
    })
    .catch(err =>{
        res.send(err)
    })
});

server.put('/:userId', async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    Object.assign(user, req.body.form)

    user.save()
    .then(response =>{
        res.send(response)
    })
    .catch(err => {
        res.send(err)
    })
});

server.delete('/:userId', async (req, res) => {
    const user = await User.findByPk(req.params.userId)
    user.destroy()
    .then( response => {
        res.send("user deleted")
    })
    .catch(error => {
        res.send(error)
    })
})


module.exports = server;
