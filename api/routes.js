const express = require('express');
const bodyParser = require('body-parser');

const Router = express.Router();
const JSONParser = bodyParser.json();

const controller = require('./controller');


Router.get('/properties', controller.getAllProperties);
Router.get('/properties/:owner_id', controller.getAllPropertiesByOwnerID);
Router.get('/properties/:owner_id/:property_id', controller.getPropertyByID);

Router.post('/properties/:owner_id', JSONParser, controller.addNewProperty);

// Router.update('/properties/:owner_id', JSONParser, controller.editPropertyDetails);

// Router.delete('/properties/:owner_id', JSONParser, controller.deleteProperty);

module.exports = Router;