const Users = require('./model');

const {
  checkUndefinedFields,
  passwordsMatches,
  createToken
} = require('../helpers');

module.exports = {

  login: (req, res) => {
    console.log('handling login with:', req.body);
    const {email, password} = req.body;

    const undefinedFields = checkUndefinedFields(email, password);
    if (undefinedFields.length) {
      return res.json({
        error: true,
        message: 'Some fields not passed'
      });
    }

    Users.findOne({email}, (err, data) => {
      if (err) {
        return res.json({
          error: true,
          message: err.message
        });
      }
      if (data) {
        // Email exists, now verify password.
        if (passwordsMatches(password, data.password)) {
          // Password is correct too, now return auth token.
          const token = createToken({email, userID: data._id});
          res.json({
            error: false,
            message: 'Logged in successfully!',
            token
          });
        } else {
          // Password incorrect, but email is registered.
          res.json({
            error: true,
            message: 'Password incorrect'
          });
        }
      } else {
        // Email doesn't exist.
        res.json({
          error: true,
          message: 'Email not registered'
        });
      }
    });
  },


  signup: (req, res) => {
    console.log('handling signup with:', req.body);
    const {email, name, password} = req.body;

    const undefinedFields = checkUndefinedFields(email, password);
    if (undefinedFields.length) {
      return res.json({
        error: true,
        message: 'Some fields not passed'
      });
    }
    
    const newUser = new Users({email, name, password});
    Users.addNewUser(newUser, (err, data) => {
      if (err) {
        return res.json({
          error: true,
          message: err.message
        });
      }
      res.json({
        error: false,
        message: `User with email ${data.email} and Id ${data._id} added successfully`,
        data: data
      });
    });
  }

};