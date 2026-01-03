const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
  name: {
    type : String,
    required : true,
  },
  age: {
    type : Number,
  },
  city:{
    type : String,
  },
  work : {
    type : String,
    enum : ['chef', 'waiter', 'manager'],
    required : true,
  }, 
  mobile : {
    type : Number,
    required : true,
  },
  email : {
    type : String,
    required : true,
    unique : true,
  },
  address : {
    type : String,
  },
  salary : {
    type : Number,
    required : true,
  },
  username : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  }

});

//middleware provided by mongoose to hash password before saving to database
personSchema.pre('save', async function() {

  const person = this; // getting current person document to be saved for every save operation(create or update)
  if(!person.isModified('password')) return; // if password is not modified then skip hashing and proceed to save.
  try
  {
     //salt generation
     const salt = await bcrypt.genSalt(10);
     //hashing password using generated salt by us
     const hashedPassword = await bcrypt.hash(person.password, salt);
     //overwriting the prexisting plain password with hashed password
     person.password = hashedPassword;
    //  next(); // proceed to save
  }
  catch(err)
  {
      return next(err);
  }
})

//method to compare password during login
personSchema.methods.comparePassword = async function (candidatePassword)
{
  try
  {
    //used bcrypt to compare the provided password with hashed password stored in database
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  }
  catch(err)
  {
    throw new Error(err);
  }
}

const Person = mongoose.model('Person', personSchema);

module.exports = Person;