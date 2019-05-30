const Properties = require('./model');

const {checkUndefinedFields} = require('../helpers');

module.exports = {
  getPropertyByID: (req, res) => {
    // Return a property for a user by its ID
    console.log('Handling get a property by its Id and ownerId');
    const {property_id, owner_id} = req.params;

    const undefinedFields = checkUndefinedFields(property_id, owner_id);
    if (undefinedFields.length) {
      return res.send(JSON.stringify({
        error: true,
        message: 'Some fields not passed'
      }));
    }

    Properties.findByOwnerIDandPropertyID(owner_id, property_id, (err, data) => {
      if (err) throw err;
      res.send(JSON.stringify({
        error: false,
        message: `Property with Id ${property_id} for owner ${owner_id} returned`,
        data: data
      }));
    })
  },


  getAllPropertiesByOwnerID: (req, res) => {
    // Return all properties for a user
    console.log('Handling get all properties by ownerId');
    const ownerId = req.params.owner_id;

    const undefinedFields = checkUndefinedFields(ownerId,);
    if (undefinedFields.length) {
      return res.send(JSON.stringify({
        error: true,
        message: 'Some fields not passed'
      }));
    }

    Properties.getAllPropertiesByOwnerID(ownerId, (err, data) => {
      if (err) throw err;
      res.send(JSON.stringify({
        error: false,
        message: `All properties for owner ${ownerId} returned`,
        data: data
      }));
    })
  },


  getAllProperties: (req, res) => {
    // return all properties in the db
    console.log('Handling get all properties');
    Properties.find({}, (err, data) => {
      if (err) throw err;
      res.send(JSON.stringify({
        error: false,
        message: 'All properties returned',
        data: data
      }));
    });
  },


  addNewProperty: (req, res) => {
    // Create a new property for a user
    const ownerId = req.params.owner_id;
    const {name, location, amount} = req.body;

    const undefinedFields = checkUndefinedFields(name, location, ownerId, amount);
    if (undefinedFields.length) {
      return res.send(JSON.stringify({
        error: true,
        message: 'Some fields not passed'
      }));
    }

    const newProperty = new Properties({name, location, ownerId, amount})
    newProperty.save((err, data) => {
      if (err) throw err;
      res.send(JSON.stringify({
        error: false,
        message: `New property with Id ${data._id} added`,
        data: data
      }));
    });
  },


  editPropertyDetails: (req, res) => {
    // Update the details of a property by its ID
    const userId = req.params.user_id;
    res.send(`Update properties handler for user: ${userId}`);
  },


  deleteProperty: (req, res) => {
    // delete a property for a user by its ID
    const userId = req.params.user_id;
    res.send(`Delete properties handler for user: ${userId}`);
  }
};