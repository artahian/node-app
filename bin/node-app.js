#!/usr/bin/env node

const child_process = require('child_process');
const path = require('path');

const [, , script] = process.argv;

const srcPath = path.join(process.cwd(), 'src');
const distPath = path.join(process.cwd(), 'dist');
const srcServerPath = path.join(srcPath, 'server');
const distServerPath = path.join(distPath, 'server');

switch (script) {
  case 'start:dev': {
    console.log('Starting dev server...');
    const ch = child_process.spawn('nodemon', [
      '--exec',
      path.join(__dirname, '..', 'node_modules', '.bin', 'babel-node'),
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
    const webpackCmd = `${__dirname}/../node_modules/.bin/webpack --mode production --config='${configPath}' --output-path='${outputPath}'`;

    const babelCmd = `${__dirname}/../node_modules/.bin/babel --presets @babel/env,@babel/preset-react ${srcServerPath} -d ${distServerPath}`;
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
}
