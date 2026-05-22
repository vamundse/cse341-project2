const router = require('express').Router();
const boatsController = require('../controllers/boats');
const validator = require('../utilities/validators')

router.get('/', boatsController.getAllBoats);
router.get('/:id', boatsController.getOneBoat);
router.post('/', validator.boatValidationRules(), validator.validate, boatsController.addBoat);
router.put('/:id', validator.boatValidationRules(), validator.validate, boatsController.updateBoat);
router.delete('/:id', boatsController.deleteBoat);

module.exports = router;