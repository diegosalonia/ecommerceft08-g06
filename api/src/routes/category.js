const server = require('express').Router();
const { Category } = require('../db.js');

server.post('/', (req, res) =>{
    Category.create(req.body.form)
    .then(category => {
        res.status(200).send(category)
    })
    .catch(error =>{
        res.status(400).send(error)
    })
})

server.delete('/', (req, res) =>{
    Category.destroy({
        where: {
            id: req.body.category_id
        }
    })
    .then(category => {
        return res.send("deleted");
    })
    .catch(error =>{
       return res.status(409).json(error)
    })
})

server.put('/', (req, res) =>{
    Category.update({name: req.body.name, description: req.body.description},{where: {id: req.body.category_id} })
    .then((rowsUpdated) => (res.json(rowsUpdated)))
    .catch(err => {res.status(400).send(err)})
})

module.exports = server;
