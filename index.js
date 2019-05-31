const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codetest', { useNewUrlParser: true }, err => {
  if (err) {
    console.log('Error connecting to DB due to:', err);
    console.log('Process exiting with code 1');
    process.exit(1);
  }
  console.log('Connected to DB successfully!');
});

const app = express();
const PORT = process.env.PORT || 3108;
mongoose.Promise = global.Promise;

const useMiddlewares = require('./middlewares');
useMiddlewares(app);

const auth = require('./auth');
const PropertyAPI = require('./api');

app.use('/auth', auth.routes);
app.use('/api', PropertyAPI.routes);

app.get('/', (req, res) => {
  console.log('handling get request on /');
  res.send('Reached index route!');
});

app.listen(PORT, () => {
  console.log(`Listening on post ${PORT}`);
});