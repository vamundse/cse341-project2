const routes = require('express').Router();
const boatsController = require('../controllers/boats')

routes.get('/', boatsController.getAll);
routes.get('/:id', boatsController.getOne);

module.exports = routes;