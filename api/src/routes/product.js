const server = require('express').Router();
const { response } = require('express');
const { Sequelize } = require('sequelize');
const { Product, Category, Order } = require('../db.js');

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

server.get('/product-detail/:id', async (req, res) => {
	Product.findOne({
		where: {
			id: req.params.id
		},
		include: [
			{model: Category},
			{model: Order}
		]
	})
	.then(product => {
		const newProductForm = {
			name: product.dataValues.name,
			price: product.dataValues.price,
			description: product.dataValues.description,
			discount: product.dataValues.discount,
			image: product.dataValues.image,
			stock: product.dataValues.stock,
			featured: product.dataValues.featured,
			categories: product.dataValues.categories.map(category => category.dataValues.name),
			quantity: product.dataValues.orders[0]?.order_line.dataValues.quantity,
			userId: product.dataValues.orders[0]?.userId
		}
		res.send(newProductForm);
	})
	.catch(err => console.log(err));
});

//Query like this: http://localhost:3000/products/catalog/?page=1&pageSize=1
server.get('/catalog/', (req,res) => {
	const { page, pageSize } = req.query;
	var offSet;
	if (page === 1){
		offSet = 0;
	}
	else{
		offSet = (page - 1) * pageSize;
	}
	const limit = pageSize;
	Product.findAll({
		limit: pageSize,
		offset: offSet,
		include: [{model: Category}]
	})
	.then(products => res.send(products))
	.catch(err => res.status(400).send(err));
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
	const { params: { id }} = req;
	Product.findOne({
		where: {
			id: id
		},
		include: [
			{ model: Category }
		]
	})
	.then(product => {
		const newProduct = {
			name: product.dataValues.name,
			price: product.dataValues.price,
			description: product.dataValues.description,
			discount: product.dataValues.discount,
			image: product.dataValues.image,
			stock: product.dataValues.stock,
			featured: product.dataValues.featured,
			categories: product.dataValues.categories
		};
		res.send(newProduct);
	})
	.catch(err => console.log(err));
});

module.exports = server;
