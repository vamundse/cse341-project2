const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {res.send('Hello World')});
router.use('/boats', require('./boats'));
router.use('/jetskis', require('./jetskis'));

router.get('/login', passport.authenticate('google', (req, res) => {}));
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/')
    });
});

module.exports = router;