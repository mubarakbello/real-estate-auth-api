const mongoose = require('mongoose');

const Property = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Property name is required.']
  },
  location: {
    type: String,
    required: [true, 'Property location is required.']
  },
  amount: {
    type: String,
    required: [true, 'Property amount is required.']
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'Property owner ID is required.']
  }
});

const Properties = module.exports = mongoose.model('Properties', Property);

module.exports.getAllPropertiesByOwnerID = (ownerId, callback) => {
  Properties.find({ownerId}, callback);
}

module.exports.findByOwnerIDandPropertyID = (ownerId, propertyId, callback) => {
  Properties.findOne({ownerId, _id: propertyId}, callback);
}