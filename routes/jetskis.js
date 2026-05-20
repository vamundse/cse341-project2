const routes = require('express').Router();
const jetskisController = require('../controllers/jetskis')

routes.get('/', jetskisController.getAll);
routes.get('/:id', jetskisController.getOne);
routes.post('/', boatsController.addBoat);
routes.put('/:id', boatsController.updateBoat);
routes.delete('/:id', boatsController.deleteBoat);

module.exports = routes;