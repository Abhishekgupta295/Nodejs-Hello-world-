const mongoose = require('mongoose');

// const mongoLocalURL = 'process.env.MONGO_LOCAL_URL'; // Local MongoDB URL
// const mongoatlasURL = 'mongodb+srv://guptaabhi2952nd:Abhi1234mongodbatlas@cluster0.jiepsd2.mongodb.net/'; // MongoDB Atlas URL
const mongoAtlasURL = process.env.MONGO_ATLAS_URL;
mongoose.connect(mongoAtlasURL)

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