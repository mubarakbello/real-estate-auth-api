const {decodeToken} = require('./helpers');


module.exports = app => {
  
  // TODO: Fix CORS
  app.use((req, res, next) => {
    if (req.url.includes('/auth') || req.url.includes('/api')) {
      console.log('Dont forget to set CORS headers here');
    }
    next();
  });


  app.use((req, res, next) => {
    if (req.url.includes('/api')) {
      const token = req.headers.token;
      decodeToken(token, (err, decodedToken) => {
        if (err) {
          return res.json({
            error: true,
            message: 'Unauthorized to access resource.'
          });
        }
        next();
      });
    } else {
      next();
    }
  });

}