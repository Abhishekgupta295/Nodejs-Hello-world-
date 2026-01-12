const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) => {

    const token = req.header.authorization.split('')[1]; //extract token from header

    if(!token){
        return res.status(401).json({message: 'Access Denied. No token provided.'});
    }

    try
    {
       const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifying token and retrieving payload from it
        req.user = decoded; //attaching payload to request object
        next();
    }
    catch(err)
    {
        return res.status(400).json({message: 'Invalid token.'});
    }
}

//function to generate JWT token
const generateToken = (userdata) => {
    //generating token using jwt.sign() method using secret key and user data as payload
    return jwt.sign(userdata, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken};