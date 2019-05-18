/* eslint-disable no-console */

import express from 'express';
import path from 'path';

import dbService from './services/dbService';

let app = express();

/*  db.collection('users').findOne({_id: 'bLA8ca2WR2MW92qTh'}).then((doc) => {
    res.send(JSON.stringify(doc));
  });*/

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../index.html'));
});

app.use(express.static(__dirname + '/client'));
app.use('/img', express.static(__dirname + '/../../public/img'));
app.use('/landing', express.static(__dirname + '/../../public/landing'));
app.use('/documents', express.static(__dirname + '/../../public/documents'));

const dbUrl = 'mongodb://localhost:27017/modelence';
const appPort = 3000;
dbService.connect(dbUrl).then(() => app.listen(appPort)).then(() => {
  console.log('Application started');
}).catch((error) => {
  console.error(`Failed to connect to the database at ${dbUrl}`, error);
});
