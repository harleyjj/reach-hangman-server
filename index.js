'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Queue = require('./queue');

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

let catData = [{imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'},
{imageURL:'https://www.telegraph.co.uk/content/dam/women/2018/01/30/TELEMMGLPICT000152840203_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwViJj1eTvcjzL4JkNP_PJEs.jpeg', 
  imageDescription: 'Black cat with white tummey.',
  name: 'Namey',
  sex: 'Female',
  age: 3,
  breed: 'Cat',
  story: 'Born on the 4th of July'},
{imageURL:'http://nostalgiacentral.com/wp-content/uploads/2014/06/pinkpanther_151.jpg', 
  imageDescription: 'Pink cat with an attitude.',
  name: 'Pinky',
  sex: 'Male',
  age: 75,
  breed: 'Fictional',
  story: 'Thown out for live action version'},
{imageURL:'https://www.garfieldgo.com/images/GarfieldCurious.png', 
  imageDescription: 'Orange cat with an attitude.',
  name: 'Garfield',
  sex: 'Male',
  age: 65,
  breed: 'Lazy',
  story: 'He hates mondays but he might like you?'}
];

let dogData = [{imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'},
{imageURL: 'https://vignette.wikia.nocookie.net/thefrasier/images/b/b2/Frasierwoody41eddie-48ajwekt2.jpg',
  imageDescription: 'He loves that old chair.',
  name: 'Eddie',
  sex: 'Male',
  age: 30,
  breed: 'Russell Terrier',
  story: 'Show ended after 9 seasons'},
{imageURL: 'https://uproxx.files.wordpress.com/2015/02/triumph.jpeg',
  imageDescription: 'Triumph smoking a cigar.',
  name: 'Triumph',
  sex: 'Male',
  age: 30,
  breed: 'Puppet',
  story: 'Living in your home sounds great.... FOR ME TO POOP ON!'},
{imageURL: 'https://www.wbkidsgo.com/Portals/4/Images/Content/Characters/Scooby/characterArt-scooby-SD.png',
  imageDescription: 'Scooby Snacks?',
  name: 'Scooby-Do',
  sex: 'Male',
  age: 75,
  breed: 'Great Dane',
  story: 'Only survivor of mystery machine accident (rut roh)'}];

const catQueue = new Queue();
function populateCats() {
  catData.forEach(cat => catQueue.enqueue(cat));
}


const dogQueue = new Queue();
function populateDogs() {
  dogData.forEach(dog => dogQueue.enqueue(dog));
}

populateCats();
populateDogs();

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

app.get('/api/cat', (req, res) => {
  if (catQueue.first === null) {
    res.json({message: 'No more cats to adopt!'});
  } else {
    const firstCat = catQueue.first.value;
    if(firstCat === null){
      res.json({message: 'No more cats to adopt!'});
    } else {
      res.json(firstCat);
    }
  }
  
});

app.get('/api/dog', (req, res) => {
  if (dogQueue.first === null) {
    res.json({message: 'No more dogs to adopt!'});
  } else {
    const firstDog = dogQueue.first.value;
    if(firstDog === null){
      res.json({message: 'No more dogs to adopt!'});
    } else {
      res.json(firstDog);
    }
  }
});

app.delete('/api/cat', (req, res) => {
  res.json(catQueue.dequeue());
});

app.delete('/api/dog', (req, res) => {
  res.json(dogQueue.dequeue());
});

app.post('/api/cat', (req, res) => {
  if (catQueue.first === null) {
    populateCats();
    res.json({message: 'We repossessed the cats!'});
  } else {
    res.json({message: 'There are still cats to adopt!'});
  }
});

app.post('/api/dog', (req, res) => {
  if (dogQueue.first === null) {
    populateDogs();
    res.json({message: 'We repossessed the dogs!'});
  } else {
    res.json({message: 'There are still dogs to adopt!'});
  }
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
