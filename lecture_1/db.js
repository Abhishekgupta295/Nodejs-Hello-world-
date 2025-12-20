const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/newhotels';

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB successfully!');
});

db.on('error', (error) => {
  console.log('Error connecting to MongoDB', error);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

module.exports = db;