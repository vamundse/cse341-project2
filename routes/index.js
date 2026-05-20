const routes = require('express').Router();

routes.get('/', (req, res) => {res.send('Hello World')});
routes.use('/boats', require('./boats'));
routes.use('/jetskis', require('./jetskis'))

module.exports = routes;