const routes = require('express').Router();

const myController = require('../controllers/index');

routes.get('/', myController.getHelloWorld);
routes.get('/person', myController.getPerson);

module.exports = routes;