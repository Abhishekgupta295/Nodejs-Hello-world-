const express = require('express');

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World ! Welcome to our server! wth nodemon')
})
app.get('/chicken', (req, res) => {
  res.send('i love chicken biryani!')
})
app.get('/dosa', (req, res) => {
  let customizedDosa = {
    type: 'Masala Dosa',
    size: 'Large',
    quantity: 2,
  };
  // res.send('i love Dosa!welcome to dosa world');
  res.send(customizedDosa);
})

app.listen(3000, ( )=> {
  console.log('Server is running on port 3000!');
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
