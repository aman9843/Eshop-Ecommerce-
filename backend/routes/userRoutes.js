const express = require('express');
const router = express.Router();
const {authUser,getUser,registerNewUser,updateUser} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')


// route Post New User
router.route('/register').post(registerNewUser)

// route Post User data 

router.post('/login', authUser)


//router Get User Data
router.route('/profile').get(protect,getUser).put(protect,updateUser)

module.exports = router;