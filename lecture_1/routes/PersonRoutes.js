const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const { jwtAuthMiddleware, generateToken } =  require('../jwt');


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
router.post('/signup', async (req,res) => {

  try{

    const personData = req.body; // assuming request body contains person data in JSON format coming from client in POST request
    const newPerson = new Person(personData); // creating new Person instance using mongoose model.
    const response = await newPerson.save();

    const payload = {
        id : response.id,
        username : response.username,
    }

    console.log('Payload for JWT:', payload);
    
    const token = generateToken(payload); // generating JWT token for the newly created user
    console.log('Generated JWT Token:', token);
    res.status(200).send({ response : response, token : token}); // sending response along with token to client
    console.log('Person saved successfully:', response);

  }
  catch(error){
    console.log('Error saving person:', error);
    return res.status(500).send('Error saving person to database');
  }

  
})

router.get('/', async(req,res) => {
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

// to fetch deatils of person with specific work role
router.get('/:worktype', async(req, res) => {
  try
  {
     const worktype = req.params.worktype; // getting work type from url parameter fow which data is to be fetched.
     if(worktype == 'chef' || worktype == 'waiter' || worktype == 'manager') // validating work type check to avoid invalid queries
     {
       const data = await Person.find({work : worktype});
       console.log('Persons data retrieved successfully:', data);
       res.status(200).json(data);     
     }
     else
     {
        res.status(400).json({error : 'Invalid work type parameter'});
     }

  }
  catch(error)
  {
      console.log('Error fetching menu items:', error);
      res.status(500).json({error : 'Error fetching person from database || Internal server error'});
  }
})

//to update data of person based on id
router.put('/:pid', async (req,res) => {
    try
    {
        const personID = req.params.pid; // getting person id from url parameter for which data is to be updated.
        const updatedData = req.body; // getting updated data from request body send by user to update in json format.

        

        const response = await Person.findByIdAndUpdate(personID, updatedData,{
            new : true, // to return the updated document after update is applied 
            runValidators : true, // to run schema validators before applying update
        })

        if(!response) 
        { 
            res.status(404).json({error : 'Person with given ID not found'});
        }

        console.log('Person data updated successfully:', response);
        res.status(200).json(response);
    }
    catch(error)
    {
        console.log('Error updating person data:', error);
        res.status(500).json({error : 'Error updating person data in database || Internal server error'});
    }
})

//to delete person based on id
router.delete('/:pid', async (req,res) => {
    try
    {
        const personID = req.params.pid; // getting person id from url parameter for which data is to be deleted.
        const response = await Person.findByIdAndDelete(personID); //deleting person based on id

        if(!response) 
        { 
            return res.status(404).json({error : 'Person with given ID not found'});
        }

        console.log('Person deleted successfully:', response);
        res.status(200).json({message : 'Person deleted successfully'});
    }    
    catch(error)
    {
        console.log('Error deleting person data:', error);
        res.status(500).json({error : 'Error deleting person data from database || Internal server error'});
    }
})

module.exports = router;