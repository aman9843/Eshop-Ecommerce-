const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const generateToken = require('../utils/generateTokens')


// Post User(Login)
const authUser = asyncHandler(async(req,res) => {
 
  const {email,password} = req.body

   const user = await User.findOne({email})

  if(user && (await user.matchPassword(password))) {
       res.json({
           _id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           token: generateToken(user._id),


       })
   } else {

    res.status(401)
    throw new Error('Invalid Email & Password ')

   }




})


// get user details
const getUser = asyncHandler(async(req,res) => {
  
   const user = await User.findById(req.user._id)


   if(user) {

    res.json({


           _id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           token: generateToken(user._id),

    })

   } else {
       res.status(404)
       throw new Error('User Not Found')

   }
  
})




// Register A new User 

const registerNewUser = asyncHandler(async(req,res)=> {
    const {name,email,password,cpassword} = req.body

    const userExist = await User.findOne({email})

    if(userExist) {
        res.status(400)
        throw new Error("User Already Exist")

    } 

    const user = await User.create({

        name,
        email,
        password,
        cpassword
        
    })

    if(user) {
        res.status(201).json({

            id: user._id,
           name: user.name,
           email: user.email,
           isAdmin: user.isAdmin,
           token: generateToken(user._id),


        })
    } else {

        res.status(400)
        throw new Error("Invalid Data")
    }
})



  




module.exports = {authUser,getUser,registerNewUser}
