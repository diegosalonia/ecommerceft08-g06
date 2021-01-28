const server = require('express').Router();
const { response } = require('express');
const { Sequelize } = require('sequelize');
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll({
		include: [{model: Category}]
	})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/category/:name', async (req,res,next)=>{
	const category = await Category.findOne({where: {name: req.params.name}})
	await category.getProducts()
	.then(categories=>{
		res.json(categories);
	})
	.catch(err=>{
		res.send(err);
	})
});

server.delete('/:id',  async (req, res) => {
	const product = await Product.findByPk(req.params.id)
	await product.destroy()
	.then(() => {
		res.status(200).send("has been removed successfully")
	})
	.catch(error => {
		res.send(error)
	})
});

server.post('/', (req, res) =>{

    Product.create(req.body.form)
    .then(product => {
        res.status(201).send(product)
    })
    .catch(error =>{
        res.status(400).send(error)
    })
});

server.get('/search', (req, res) =>{
	Product.findAll({
		where: {
			name: {
				[Sequelize.Op.iLike]: `%${req.query.query}%`
			}
		}
	})
	.then(product=>{
		res.json(product);
	})
	.catch(err=>{
		res.send(err);
	})
});

server.put('/:id', async (req, res) =>{
	const product = await Product.findByPk(req.params.id)
	Object.assign(product, req.body.form)

	product.save()
	 .then(response =>{
		 res.status(200).send(response)
	 })
	 .catch(error =>{
		 res.status(400).send(error)
	 })
});

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
});

//Query like this: http://localhost:3000/products/catalog/?page=1&limit=2
server.get('/catalog/', async (req,res) => {
	const { page, limit } = req.query;
	const offset = page * limit;
	Product.findAll({
		offset,
		limit
	})
	.then(products => {console.log(products);res.send(products)})
	.catch(err => res.status(400).send(err))
});
	 

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
});

server.get('/:id', (req, res) => {
	Product.findByPk(req.params.id)
	.then(product => {
		res.send(product);
	})
	.catch(err => {
		console.log("Error getting product");
		res.status(400).send(err);
	})	
});

module.exports = server;
