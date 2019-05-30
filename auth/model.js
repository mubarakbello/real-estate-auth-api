const mongoose = require('mongoose');

const {hashPassword} = require('../helpers');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: (true, 'Name is required')
    },
    email: {
        type: String,
        required: (true, 'Email is required'),
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
      type: String,
      required: (true, 'Password is required')
    }
});

const Users = module.exports = mongoose.model('Users', UserSchema);

module.exports.addNewUser = (newUser, callback) => {
  hashPassword(newUser.password, (err, hashedPassword) => {
    if (err) throw err;
    newUser.password = hashedPassword;
    newUser.save(callback);
  });
}
