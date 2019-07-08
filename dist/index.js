"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = (0, _express["default"])();

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');

  var webpackMiddleware = require('webpack-dev-middleware');

  var webpackConfig = require('../webpack.config.js');

  var compiler = webpack(_objectSpread({}, webpackConfig, {
    mode: 'development',
    output: _objectSpread({}, webpackConfig.output, {
      path: _path["default"].join(process.cwd(), 'public')
    })
  }));
  app.use(webpackMiddleware(compiler, {
    stats: 'errors-only'
  }));
}

app.use(_express["default"]["static"]('public'));
app.get('/', function (req, res) {
  res.sendFile('dist/client/index.html', {
    root: '.'
  });
});
app.get('/bundle.js', function (req, res) {
  res.sendFile('dist/client/bundle.js', {
    root: '.'
  });
});
var _default = app;
exports["default"] = _default;