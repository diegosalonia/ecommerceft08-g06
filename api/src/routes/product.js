const server = require('express').Router();
const { response } = require('express');
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.delete('/:id',  async (req, res) => {
	const product = await Product.findByPk(req.params.id)
	await product.destroy()
	.then(() => {
		res.status(201).send("has been removed successfully")
	})
	.catch(error => {
		res.send(error)
	})
})

server.post('/', (req, res) =>{
    Product.create(req.body.form)
    .then(category => {
        res.status(200).send(category)
    })
    .catch(error =>{
        res.status(400).send(error)
    })
})
// this is from task 25 and it is incomplete, but i needed a small part of the path to do my task

server.post('/:productId/category/:categoryId', async (req, res) =>{
	const category =  await Category.findByPk(req.params.categoryId)
	const product = await Product.findByPk(req.params.productId)

	if(!category){res.status(404).send("this category doesn't exist")}
	if(!product){res.status(404).send("this product doesn't exist")}

	await category.addProduct(product)
	.then(response =>{
		res.send(response)
	})
	.catch(error =>{
		res.send(error)
	})
})

server.delete('/:productId/category/:categoryId', async (req, res) =>{
	const category =  await Category.findByPk(req.params.categoryId)
	const product = await Product.findByPk(req.params.productId)

	if(!category){res.status(404).send("this category doesn't exist")}
	if(!product){res.status(404).send("this product doesn't exist")}

	await product.removeCategory(category)
	.then(response =>{
		res.status(response).send("has been successfully removed")
	})
	.catch(error =>{
		res.send(error)
	})
})

module.exports = server;
