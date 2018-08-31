'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(express.json());

app.get('/:url', (req, res, next) => {
  console.log('getting in here');
  const { url } = req.params;
  console.log(url);
  const { difficulty, minLength, maxLength } = req.query;
  const parameters = { difficulty, minLength, maxLength };
  let queryString = '';
  const keys = Object.keys(parameters);
  for (let i = 0; i < keys.length; i++){
    if(parameters[keys[i]]){
      if(queryString === '') {
        queryString += `?${keys[i]}=${parameters[keys[i]]}`;
      } else {
        queryString += `&${keys[i]}=${parameters[keys[i]]}`;
      }
    }
  }
  fetch('http://app.linkedin-reach.io/' + url + queryString)
    .then(res => res.text())
    .then(text => res.send(text))
    .catch(err => next(err));
  
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = { app };
