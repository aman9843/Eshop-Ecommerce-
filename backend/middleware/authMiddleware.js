const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');

/// To protect credentials JWt Verification is used
const protect = asyncHandler(async(req,res,next) => {

    let token;
    if(req.headers.authorization) {
        try {
            token = req.headers.authorization
            const decode = jwt.verify(token,process.env.JWT_SECERET)
            req.user = await User.findById(decode.id).select('-password')
            next()


        } catch(error) {
            console.log(error)
            res.status(401)
            throw new Error('Authorization of Token Failed ')

        }
    } if(!token) {
        res.status(401)
        throw new Error('Not Authorized & No Token ')
    }

  

})






module.exports = {protect}