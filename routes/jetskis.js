const router = require('express').Router();
const jetskisController = require('../controllers/jetskis')
const validator = require('../utilities/validators')
const { isAuthenticated } = require('../utilities/authenticate');

router.get('/', jetskisController.getAllJetskis);
router.get('/:id', jetskisController.getOneJetski);
router.post('/', isAuthenticated, validator.jetskiAddValidationRules(), validator.validate, jetskisController.addJetski);
router.put('/:id', isAuthenticated, validator.jetskiEditValidationRules(), validator.validate, jetskisController.updateJetski);
router.delete('/:id', isAuthenticated, jetskisController.deleteJetski);

module.exports = router; 