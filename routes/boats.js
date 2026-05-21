const router = require('express').Router();
const boatsController = require('../controllers/boats');

router.get('/', boatsController.getAllBoats);
router.get('/:id', boatsController.getOneBoat);
router.post('/', boatsController.addBoat);
router.put('/:id', boatsController.updateBoat);
router.delete('/:id', boatsController.deleteBoat);

module.exports = router;