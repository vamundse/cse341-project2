const routes = require('express').Router();
const boatsController = require('../controllers/boats');

routes.get('/', boatsController.getAllBoats);
routes.get('/:id', boatsController.getOneBoat);
routes.post('/', boatsController.addBoat);
routes.put('/:id', boatsController.updateBoat);
routes.delete('/:id', boatsController.deleteBoat);

module.exports = routes;