const Users = require('./model');

const {checkUndefinedFields, passwordsMatches} = require('../helpers');

module.exports = {

  login: (req, res) => {
    console.log('handling login with:', req.body);
    const {email, password} = req.body;

    const undefinedFields = checkUndefinedFields(email, password);
    if (undefinedFields.length) {
      return res.send(JSON.stringify({
        error: true,
        message: 'Some fields not passed'
      }));
    }

    Users.findOne({email}, (err, data) => {
      if (err) throw err;
      if (data) {
        // Email exists, now verify password.
        if (passwordsMatches(password, data.password)) {
          // Password is correct too, now return auth token.
          res.send(JSON.stringify({
            error: false,
            message: 'Logged in successfully!',
            data: data
          }));
        } else {
          // Password incorrect, but email is registered.
          res.send(JSON.stringify({
            error: true,
            message: 'Password incorrect'
          }));
        }
      } else {
        // Email doesn't exist.
        res.send(JSON.stringify({
          error: true,
          message: 'Email not registered'
        }));
      }
    });
  },


  signup: (req, res) => {
    console.log('handling signup with:', req.body);
    const {email, name, password} = req.body;

    const undefinedFields = checkUndefinedFields(email, password);
    if (undefinedFields.length) {
      return res.send(JSON.stringify({
        error: true,
        message: 'Some fields not passed'
      }));
    }
    
    const newUser = new Users({email, name, password});
    Users.addNewUser(newUser, (err, data) => {
      if (err) throw err;
      res.send(JSON.stringify({
        error: false,
        message: `User with email ${data.email} and Id ${data._id} added successfully`,
        data: data
      }));
    });
  }

};