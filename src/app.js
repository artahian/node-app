import '@babel/polyfill';

import express from 'express';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack.config.js');
  app.use(webpackMiddleware(webpack({
    ...webpackConfig,
    mode: 'development'
  })));
}

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', async function (req, res, next) {
  res.json({ response: 'Test Data' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application started on port ${port}`);
});
