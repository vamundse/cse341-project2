const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Inventory',
    description: 'Get your boats and jetskis here!'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);