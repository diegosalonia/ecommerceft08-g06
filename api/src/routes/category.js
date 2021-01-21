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

server.delete('/:id', (req, res) =>{
    Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(category => {
        return res.send("deleted");
    })
    .catch(error =>{
       return res.status(409).json(error)
    })
})

server.put('/:id', async (req, res) =>{
    const categoryUpdate = await Category.findByPk(req.params.id)
    Object.assign(categoryUpdate, req.body.form);
    await categoryUpdate.save()
    .then(category => {
        res.send(category);
    })
    .catch(err => {
        res.status(409).send(err);
    })
})

module.exports = server;
