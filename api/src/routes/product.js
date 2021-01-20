const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post('/', (req, res) =>{
    Product.create(req.body.form)
    .then(category => {
        res.status(200).send(category)
    })
    .catch(error =>{
        res.status(400).send(error)
    })
})

server.post('/:productId/category/:categoryId', (req, res) =>{
	Product.findOne({
		where: {id: req.params.productId}
	})
	.then(response => res.send(response))
	.catch(err => res.send(err))
	
})

server.delete('/:productId/category/:categoryId', (req, res) =>{
	
})

module.exports = server;
