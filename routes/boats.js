const router = require('express').Router();
const boatsController = require('../controllers/boats');
const validator = require('../utilities/validators');
const { isAuthenticated } = require('../utilities/authenticate');

router.get('/', boatsController.getAllBoats);
router.get('/:id', boatsController.getOneBoat);
router.post('/', isAuthenticated, validator.boatAddValidationRules(), validator.validate, boatsController.addBoat);
router.put('/:id', isAuthenticated, validator.boatEditValidationRules(), validator.validate, boatsController.updateBoat);
router.delete('/:id', isAuthenticated, boatsController.deleteBoat);

module.exports = router;