const server = require('express').Router();
const { Order, User } = require('../db.js');
//const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const passport = require('passport');

genToken = user => {
  return jwt.sign({
    iss: 'Luri',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, 'joanlouji');
}

server.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    if(req.user.user_role === 'admin') {
    User.findAll()
    .then(response =>{
        res.send(response)
    })
    .catch(next)
    } else
    {res.status(401).send({message: 'not authorized'})}
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

server.post('/', async (req, res) => {
    const { email, password, first_name, last_name, phone_number, user_role } = req.body.form;
    let foundUser = await User.findOne({ where: {email: email }});
    console.log(foundUser)
    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use'});
    }
 
  const newUser = new User({ email, password, first_name, last_name, phone_number, user_role})
  await newUser.save()
  // Generate JWT token
  const token = genToken(newUser)
  res.status(200).json({token})
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
