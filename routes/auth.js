const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth-google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth-google/redirect', passport.authenticate('google', {failureRedirect: '/'}),
(req, res) => {
    res.json({ message: 'Successfully logged in', user: req.user});
});

module.exports = router;