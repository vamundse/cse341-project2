const router = require('express').Router();
const jetskisController = require('../controllers/jetskis')
const validator = require('../utilities/validators')

router.get('/', jetskisController.getAllJetskis);
router.get('/:id', jetskisController.getOneJetski);
router.post('/', validator.jetskiValidationRules(), validator.validate, jetskisController.addJetski);
router.put('/:id', validator.jetskiValidationRules(), validator.validate, jetskisController.updateJetski);
router.delete('/:id', jetskisController.deleteJetski);

module.exports = router;