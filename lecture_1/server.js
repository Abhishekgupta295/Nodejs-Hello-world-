const express = require('express');
const db = require('./db.js');
const Person = require('./models/person.js');
const bodyParser = require('body-parser');
const MenuItem = require('./models/MenuItem.js');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World ! Welcome to our server! wth nodemon')
})
// app.get('/chicken', (req, res) => {
//   res.send('i love chicken biryani!')
// })
// app.get('/dosa', (req, res) => {
//   let customizedDosa = {
//     type: 'Masala Dosa',
//     size: 'Large',
//     quantity: 2,
//   };
//   // res.send('i love Dosa!welcome to dosa world');
//   res.send(customizedDosa);
// })

// app.post('/items', (req, res) => {
//   res.send('This is a POST request for Dosa');
// });
app.listen(3000, ( )=> {
  console.log('Server is running on port 3000!');
});

//old way with callback
// app.post('/person', (req,res) => {

//   const personData = req.body; // assuming request body contains person data in JSON format coming from client in POST request
//   const newPerson = new Person(personData); // creating new Person instance using mongoose model.
//   newPerson.save((error, savedPerson) =>{
//     if (error) {
//       console.log('Error saving person:', error);
//       return res.status(500).send('Error saving person to database');
//     }
//     else{
//       console.log('Person saved successfully:', savedPerson);
//        res.status(201).send(savedPerson);
//     }
   
//   }) // saving the new person to the database

// })

//new way with async await
app.post('/person', async (req,res) => {

  try{

    const personData = req.body; // assuming request body contains person data in JSON format coming from client in POST request
    const newPerson = new Person(personData); // creating new Person instance using mongoose model.
    const response = await newPerson.save();
    res.status(200).send(response);
    console.log('Person saved successfully:', response);

  }
  catch(error){
    console.log('Error saving person:', error);
    return res.status(500).send('Error saving person to database');
  }

  
})

app.get('/person', async(req,res) => {
  try{
      const data = await Person.find();
      console.log('Persons data retrieved successfully:', data);
      res.status(200).send(data);
  }
  catch(error){
    console.log('Error saving person:', error);
    return res.status(500).send('Error saving person to database');
  }
});

















// const notes = require("./note.js"); 
// console.log("our server is starting");
// // function add(x, y) {
// //   return x + y;
// // }
// // console.log("2 + 3 =", add(2, 23));
// var fs = require("fs");
// var os = require("os");
// var _ = require("lodash");

// var info = os.userInfo();
// var type = os.type();
// console.log("User info:", info);
// console.log("OS Type:", type);

// fs.appendFile("test.txt", "Hello world \n", () => {
//   console.log("File written");
// });

// var age = notes.age;
// var result = notes.addNum(5, 10);
// console.log("Age from note.js:", age);
// console.log("Add 5 + 10 using addNum from note.js:", result);

// var data = ["person", "person", 1, 2, 1, 2, "name", "age", "2"];

// var filter = _.uniq(data);
// var result22 = _.isString(7);

// console.log(filter);
// console.log("Is 'Hello World' a string?", result22);
