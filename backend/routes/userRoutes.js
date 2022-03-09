const express = require('express');
const router = express.Router();
const {authUser,getUser,registerNewUser} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')


// route Post New User
router.route('/').post(registerNewUser)

// route Post User data 

router.post('/login', authUser)


//router Get User Data
router.route('/profile').get(protect,getUser)

module.exports = router;