const server = require('express').Router();
const { response } = require('express');
const { Sequelize } = require('sequelize');
const { Product, Category, Order, Review, User} = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll({
		include: [{model: Category}]
	})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

///Start review routes

server.post('/:id/review', (req, res) => {
	Review.create({...req.body.form, productId: req.params.id})
	.then(product => {
			res.status(201).send(product)
		})
	.catch(error => {
		res.status(400).send(error)
	})
})

server.get('/:id/review', (req, res) => {
	Review.findAll({where: {productId: req.params.id}, include: [{model: User, attributes: ["email"]}]})
	.then(products => {
			res.status(201).send(products)
		})
	.catch(error => {
		res.status(400).send(error)
	})
})

server.put('/:id/review/:idReview', async (req, res) => {
	const review = await Review.findByPk(req.params.idReview)
	Object.assign(review, req.body.form)
	review.save()
	 .then(response =>{
		 res.status(200).send(response)
	 })
	 .catch(error =>{
		 res.status(400).send(error)
	 })
})

server.delete('/:id/review/:idReview', async (req, res) => {
	const review = await Review.findByPk(req.params.idReview)
	if (review){
		review.destroy()
		.then(() => {
			res.status(200).send("has been removed successfully")
		})
		.catch(error =>{
			res.status(400).send(error)
		})
	}
	else return res.status(400).send("error el review no existe")
	
})

//End review routes

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

server.get('/product-detail/:productId/:userId', async (req, res) => {
	const { productId, userId } = req.params;
	const product = await Product.findOne({
		where: {
			id: productId
		},
		include: [
			{model: Category}
		]
	})
	const order = await Order.findOne({
		where : {
			userId: userId,
			status: 'cart'
		}
	});
	
	const newProductForm = {
		name: product.dataValues.name,
		price: product.dataValues.price,
		description: product.dataValues.description,
		discount: product.dataValues.discount,
		image: product.dataValues.image,
		stock: product.dataValues.stock,
		featured: product.dataValues.featured,
		categories: product.dataValues.categories.map(category => category.dataValues.name),
		quantity: order ? orders[0]?.order_line.dataValues.quantity : 1,
	};
	res.send(newProductForm);
});

//Query like this: http://localhost:3000/products/catalog/?page=1&pageSize=1
server.get('/catalog/', (req, res) => {
	let categories = req.query.categories && JSON.parse(req.query.categories);
	let {priceFrom, priceTo, rating, page, pageSize} = req.query;
	var options = {where: {}, include: []};
	if (categories){
		options.include = {model: Category, where: {id: categories}}; 
	}
	if (priceFrom & priceTo){
		options.where.price =  {[Sequelize.Op.between]: [priceFrom, priceTo]}; 
	}
	if (rating) {
	}
	if (page && pageSize){
		var offSet;
		var totalProducts = 0;
		(page === 1) ? offSet=0 : offSet = (page - 1) * pageSize;
		options.limit = pageSize;
		options.offset = offSet;
	}
	Product.count(options)
	.then(count =>{
		totalProducts = count; 
		Product.findAll(options)
		.then(products => res.send({products, totalProducts}))
		.catch(err => console.log(err));
	})
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
