const routes = require('express').Router();
const jetskisController = require('../controllers/jetskis')

routes.get('/', jetskisController.getAll);
routes.get('/:id', jetskisController.getOne);

module.exports = routes;