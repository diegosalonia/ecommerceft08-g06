const server = require('express').Router();
const { Order, User } = require('../db.js');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const SENDGRID_API_KEY = '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'
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(SENDGRID_API_KEY)

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const verifyCode = Math.round(getRandomArbitrary(100000,999999))

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

server.put('/:userId/shipping-address', async (req, res) => {
    const { userId } = req.params;
    const { shippingAddress } = req.body;
    const user = await User.findByPk(userId);
    user.shipping_address = shippingAddress;

    user.save()
    .then(response => res.send(response))
    .catch(err => res.status(401).send(err));
});

server.post('/sendMail', (req, res) => {
    const msg = {
        to: req.body.email, // Change to your recipient
        from: 'dager2115@gmail.com', // Change to your verified sender
        subject: 'this is the verify code',
        text: 'this is the verify code',
        html: `<h1>${verifyCode}</h1>`,
      }
    sgMail.send(msg)
    .then(response =>{
        console.log("si se envio")
        res.send({verifyCode})
    })
    .catch(error =>{
        console.log(error)
        res.json({
            error:error.message,
        })
    })
})

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

server.put('/:id/passwordChange', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findByPk(req.params.id)
    user.password = req.body.newPassword
    await user.save()
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.send(error.message)
    })
})
server.put('/update/passwordReset', async (req, res) => {
    const user = await User.findOne({where:{email:req.body.email}})
    user.password = req.body.newPassword
    await user.save()
    .then(response => {
        res.send(response)
    })
    .catch(error => {
        res.send(error)
    })
})


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
