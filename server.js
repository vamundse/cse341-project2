const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT;

app.use('/api-docs', require('./routes/swagger'));
app.use('/', require('./routes'));
app.use(bodyParser.json());

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