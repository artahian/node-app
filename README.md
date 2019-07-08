# node-app

> A build tool that sets up Webpack, Babel, React and Express in your Node project so that you can start
> creating a full-stack JavaScript/React/Node/Express app without any setup

[![NPM Version][npm-image]][npm-url]

## Install

```bash
npm install --save @artahian/node-app
```

## Usage

After installing the package, run
```bash
node-app setup
```

**node-app** will automatically install the necessary build tools as dev dependencies in your project.

Add **build**, **start** and **start:dev** scripts to your **package.json**:
```js
  "scripts": {
    "build": "node-app build",
    "start": "node-app start",
    "start:dev": "node-app start:dev",
    ...
  }
```

Structure your project in the following way:
 - src
   - client
     - index.html
     - index.js
   - server
     - app.js
 - public
   - ...some static assets that are publicly accessible, like images...
   
**node-app** exports a `renderHome` express handler that serves your **index.html** with the bundled **index.js** with all of its dependencies,
which will usually contain your main React app.
   
In your `src/server/app.js`, import the express app from **node-app** and start the server. For example:
```js
import express from 'express'; // Note that you don't have to install 'express' yourself, it comes with this package

import { app, renderHome } from '@artahian/node-app';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', renderHome);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Application started on port ${port}`);
});

```

Start your application by running:
```bash
npm start:dev
```

For production, use:
```bash
npm run build
npm start
```

**node-app** will generate a `dist` directory with the bundled versions.
  

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/@artahian/node-app.svg
[npm-url]: https://www.npmjs.com/package/@artahian/node-app
