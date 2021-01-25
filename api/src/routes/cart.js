const server = require('express').Router();
const { response } = require('express');
const { Sequelize } = require('sequelize');
const { User, Order, Product } = require('../db.js');


server.post('/users/:idUser/cart/:productId', async (req,res,next)=>{
    const user =  await User.findByPk(req.params.idUser)
    const product = await Product.findByPk(req.params.productId)
    const order = await Order.create({status: 'carrito', user_id: user.id})
    .then(user=>{
        res.json(user)
    })

    if(!user){res.status(404).send("this user doesn't exist")}

    product.addOrder(order)
    .then(product =>{
        res.json(product)
    })
    .cath(err=>{
        res.send(err)
    })    

})

server.delete('/users/:idUser/cart/:productId', async (req,res)=>{

    const user =  await User.findByPk(req.params.idUser)
    const product = await Product.findByPk(req.params.productId)
    const order = await Order.create({status: 'cancelado', user_id: user.id})
    .then(user=>{
        res.json(user)
    })

    if(!user){res.status(404).send("this user doesn't exist")}

    product.removeOrder(order)
    .then(product =>{
        res.json(product)
    })
    .cath(err=>{
        res.send(err)
    })  


})

server.put('/users/:idUser/cart/:productId', async (req,res)=>{

    const user =  await User.findByPk(req.params.idUser)
    const product = await Product.findByPk(req.params.productId)
    const order = await Order.create({status: 'pendiente', user_id: user.id})

    //Object.assign(categoryUpdate, );
    
})
