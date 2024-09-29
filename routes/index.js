const routes = require('express').Router();

const myController = require('../controllers/index');

routes.get('/', myController.getPerson);
routes.get('/hello', myController.getHelloWorld);

module.exports = routes;