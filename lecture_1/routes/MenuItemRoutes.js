const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');



//POST method to add menu item in database
router.post('/', async (req,res)=> {
  try
  {
      const data = req.body;
      const newMenuItems = new MenuItem(data);
      const savedMenuItem = await newMenuItems.save();
      res.status(200).send(savedMenuItem);
  }
  catch(error)
  {
      console.log('Error saving menu item:', error);
      res.status(500).send('Error saving menu item to database');
  }
  
})

//GET method to fetch menu items from database
router.get('/', async (req,res)=>{
  try
  {
       const data = await MenuItem.find();
       console.log('Menu items retrieved successfully:', data);
       res.status(200).send(data);
  }
  catch(error)
  {
      console.log('Error fetching menu items:', error);
      res.status(500).send('Error fetching menu items from database');
  }
})

//to fetch menu items based on taste
router.get('/:tastetype', async (req,res) => {
    try
    {
        const tastetype = req.params.tastetype; // getting taste type from url parameter for which data is to be fetched.
        if(tastetype == 'sweet' || tastetype == 'spicy' || tastetype == 'sour') // validating taste type check to avoid invalid queries
        {
            const data = await MenuItem.find({taste : tastetype});
            console.log('Menu items retrieved successfully:', data);
            res.status(200).json(data);
        }
        else
        {
            res.status(400).json({error : 'Invalid taste type parameter'});
        }
        
    }
    catch(error)
    {
        console.log('Error fetching menu items:', error);
        res.status(500).json({error : 'Error fetching menu items from database'});
    }
})




module.exports = router;