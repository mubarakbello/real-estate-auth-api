const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


module.exports = {
  checkUndefinedFields: (...fields) => {
    return fields.filter(field => !field);
  },

  hashPassword: (password, callback) => {
    bcrypt.hash(password, 10, callback);
  },

  passwordsMatches: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },

  createToken: ({email, userID}, expPeriod = 1440) => {
    return jwt.sign({email, userID}, process.env.JWT_KEY, {expiresIn: expPeriod});
  },

  decodeToken: (token, callback) => {
    jwt.verify(token, process.env.JWT_KEY, callback);
  }
};