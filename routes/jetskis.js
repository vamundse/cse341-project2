const router = require('express').Router();
const jetskisController = require('../controllers/jetskis')

router.get('/', jetskisController.getAllJetskis);
router.get('/:id', jetskisController.getOneJetski);
router.post('/', jetskisController.addJetski);
router.put('/:id', jetskisController.updateJetski);
router.delete('/:id', jetskisController.deleteJetski);

module.exports = router;