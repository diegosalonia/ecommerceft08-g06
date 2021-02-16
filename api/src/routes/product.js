const server = require('express').Router();
const { response } = require('express');
const { Sequelize } = require('sequelize');
const { Product, Category, Order, Review, User} = require('../db.js');
const passport = require('passport')

server.get('/',  (req, res, next) => {
	Product.findAll({
		include: [{model: Category}]
	})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

///Start review routes


server.post('/:id/review/:userId', async (req, res) => {
	const { id, userId } = req.params;
	const olderReview = await Review.findAll({
		where: {
			productId: id,
			userId: userId
		}
	});
	console.log("REVIEW: ", olderReview);
	if (!olderReview.length) {
		Review.create({...req.body.form, productId: req.params.id, userId:  req.params.userId})
		.then(product => {
				res.status(201).send(product)
			})
		.catch(error => {
			res.status(400).send(error)
		})
	} else {
		res.send("Already had a review for this product!");
	}

})

server.get('/:id/review', (req, res) => {
	Review.findAll({where: {productId: req.params.id}, include: [{model: User, attributes: ["email", 'id']}]})
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

server.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const user = await User.findByPk(req.user)
    if(user.user_role === 'admin') {
	const product = await Product.findByPk(req.params.id)
	await product.destroy()
	.then(() => {
		res.status(200).send("has been removed successfully")
	})
	.catch(error => {
		res.send(error)
	})} else
    {res.status(401).send({message: 'not authorized'})}
});

server.post('/', passport.authenticate('jwt', { session: false }), async (req, res) =>{
	const user = await User.findByPk(req.user)
    if(user.user_role === 'admin') {
    Product.create(req.body.form)
    .then(product => {
        res.status(201).send(product)
    })
    .catch(error =>{
        res.status(400).send(error)
	})} else
    {res.status(401).send({message: 'not authorized'})}
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

server.post('/:productId/category/:categoryId', passport.authenticate('jwt', { session: false }), async (req, res) =>{
	const user = await User.findByPk(req.user)
    if(user.user_role === 'admin') {
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
	})} else
    {res.status(401).send({message: 'not authorized'})}
});

server.get('/product-detail/:productId', async (req, res) => {
	const { productId } = req.params;
	const { userId } = req.query;
	const product = await Product.findOne({
		where: {
			id: productId
		},
		include: [
			{model: Category}
		]
	});
	let toEditReview;
	let noReviewed = false;
	let quantity = 1;
	if (JSON.parse(userId)) {
		const order = await Order.findOne({
			where : {
				userId: userId,
				status: 'cart'
			},
			include: [
				{
					model: Product
				}
			]
		});
	
		const userCompletedOrders = await Order.findAll({
			where: {
				userId: userId,
				status: 'approved'
			},
			include: [
				{
					model: Product,
				}
			]
		});
		
		const user = await User.findOne({
			where: {
				id: userId
			},
			include: [
				{
					model: Review, 
					attributes: ['productId']
				},
			]
		});
		
		toEditReview = user.dataValues.reviews.filter(review => review.dataValues.productId === product.dataValues.id).length === 1;

		userCompletedOrders.forEach(order => order.dataValues.products.forEach(product => {
			if (product.dataValues.id == productId) {
				noReviewed = true;
			}
		}));
		
		order && order.dataValues.products.forEach(el => {
			if (product.dataValues.id === el.dataValues.id) {
				quantity = el.dataValues.order_line.dataValues.quantity
			}
		})
	}

	const newProductForm = {
		id: productId,
		name: product.dataValues.name,
		price: product.dataValues.price,
		description: product.dataValues.description,
		discount: product.dataValues.discount,
		image: product.dataValues.image,
		stock: product.dataValues.stock,
		featured: product.dataValues.featured,
		categories: product.dataValues.categories.map(category => category.dataValues.name),
		quantity,
		toEditReview,
		noReviewed
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
		.then(products => {
			!products.length && res.send("No hay productos");
			products.length && res.send({products, totalProducts})
		})
		.catch(err => console.log(err));
	})
	.catch(err => res.status(400).send(err));
});
	 

server.delete('/:productId/category/:categoryId', passport.authenticate('jwt', { session: false }), async (req, res) =>{
	const user = await User.findByPk(req.user)
    if(user.user_role === 'admin') {
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
	})} else
    {res.status(401).send({message: 'not authorized'})}
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
