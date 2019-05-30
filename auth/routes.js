const express = require('express');
const bodyParser = require('body-parser');

const Router = express.Router();
const JSONParser = bodyParser.json();

const controller = require('./controller');

Router.post('/login', JSONParser, controller.login);
Router.post('/signup', JSONParser, controller.signup)

module.exports = Router;