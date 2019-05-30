module.exports = app => {
  
  // TODO: Fix CORS
  app.use((req, res, next) => {
    if (req.url.includes('/auth') || req.url.includes('/api')) {
      console.log('Dont forget to set CORS headers here');
    }
    next();
  });

}