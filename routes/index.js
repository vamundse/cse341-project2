const router = require('express').Router();

router.get('/', (req, res) => {res.send('Hello World')});
router.use('/boats', require('./boats'));
router.use('/jetskis', require('./jetskis'))

module.exports = router;