const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res) => {
    if(req.session.message) {
        let message = req.session.message;
        delete req.session.message;
        res.send(`Hello World! ${message}`);
    } else {
        res.send('Hello World!')
    }
});

router.use('/boats', require('./boats'));
router.use('/jetskis', require('./jetskis'));

router.get('/login', passport.authenticate('google', (req, res) => {}));
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.message = 'Successfully logged out';
        res.redirect('/')
    });
});

module.exports = router;