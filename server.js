const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api-docs', require('./routes/swagger'));
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.error(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin} `);
});

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {
        console.log(`Running on port ${port}`)
        });
    }
});