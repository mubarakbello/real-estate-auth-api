const bcrypt = require('bcryptjs');


module.exports = {
  checkUndefinedFields: (...fields) => {
    return fields.filter(field => !field);
  },

  hashPassword: (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, hash) => {
        callback(err, hash);
      });
    });
  },

  passwordsMatches: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
};