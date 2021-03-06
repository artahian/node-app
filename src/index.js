import '@babel/polyfill/noConflict';

import path from 'path';

import express from 'express';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require(path.join(__dirname, '..', 'webpack.config.js'));
  const compiler = webpack({
    ...webpackConfig,
    mode: 'development',
    output: {
      ...webpackConfig.output,
      path: path.join(process.cwd(), 'public')
    }
  });
  app.use(webpackMiddleware(compiler, { stats: 'errors-only' }));
}

app.use(express.static('public'));

app.get('/bundle.js', function (req, res) {
  res.sendFile('dist/client/bundle.js', { root: '.' });
});

function renderHome(req, res) {
  res.sendFile('dist/client/index.html', { root: '.' });
}

export { app, renderHome };
