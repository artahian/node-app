#!/usr/bin/env node

const child_process = require('child_process');
const path = require('path');

const [, , script] = process.argv;

const srcPath = path.join(process.cwd(), 'src');
const distPath = path.join(process.cwd(), 'dist');
const srcServerPath = path.join(srcPath, 'server');
const distServerPath = path.join(distPath, 'server');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
const nodeModulesBinPath = path.join(nodeModulesPath, '.bin');

switch (script) {
  case 'start:dev': {
    console.log('Starting dev server...');
    const ch = child_process.spawn('nodemon', [
      '--exec',
      path.join(nodeModulesBinPath, 'babel-node'),
      '--presets',
      '@babel/env,@babel/preset-react',
      path.join(srcServerPath, 'app.js')
    ]);
    ch.stdout.pipe(process.stdout);
    ch.stderr.pipe(process.stderr);
    break;
  }

  case 'build': {
    console.log('Building for production...');
    const outputPath = path.join(distPath, 'client');
    const configPath = path.join(__dirname, '..', 'webpack.config.js');
    const cleanupCmd = `rm -rf ${distPath}`;
    const webpackCmd = `${path.join(nodeModulesBinPath, 'webpack')} --mode production --config='${configPath}' --output-path='${outputPath}'`;

    const babelCmd = `${path.join(nodeModulesBinPath, 'babel')} --presets @babel/env,@babel/preset-react ${srcServerPath} -d ${distServerPath}`;
    const ch = child_process.spawn(`${cleanupCmd} && ${webpackCmd} && ${babelCmd}`, {
      shell: true
    });
    ch.stdout.pipe(process.stdout);
    ch.stderr.pipe(process.stderr);
    break;
  }

  case 'start': {
    console.log('Starting production server...');
    const ch = child_process.spawn(`NODE_ENV=production node ${path.join(distServerPath, 'app.js')}`, {
      shell: true
    });
    ch.stdout.pipe(process.stdout);
    ch.stderr.pipe(process.stderr);
    break;
  }

  case 'setup': {
    console.log('Installing dependencies...');
    const dependencies = [
      '@babel/cli',
      '@babel/core',
      '@babel/node',
      '@babel/preset-env',
      '@babel/preset-react',
      'babel-loader',
      'babel-preset-env',
      'css-loader',
      'html-webpack-plugin',
      'node-sass',
      'nodemon',
      'sass-loader',
      'style-loader',
      'webpack',
      'webpack-cli',
      'webpack-dev-middleware',
      'webpack-dev-server',
      'webpack-livereload-plugin',
    ];
    const cmd = dependencies.map(dep => `npm install --save-dev ${dep}`).join(' && ');
    const ch = child_process.spawn(cmd, {
      shell: true
    });
    ch.stdout.pipe(process.stdout);
    ch.stderr.pipe(process.stderr);
    break;
  }
}
