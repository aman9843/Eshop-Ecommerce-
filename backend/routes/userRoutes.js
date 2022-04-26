const express = require('express');
const router = express.Router();
const {authUser,getUser,registerNewUser,updateUser, getUsers,deleteUser,getUserById,updateUserById, forgotPassword, resetPassword} = require('../controller/userController')
const {protect,admin} = require('../middleware/authMiddleware')


// route Post New User
router.route('/register').post(registerNewUser).get(protect,admin,getUsers)

// route Post User data 

router.post('/login', authUser)


// router to post forget Password 
router.post('/forgotpassword', forgotPassword)

//router to reset password

router.patch('/resetpassword/:token',resetPassword)


//router Get User Data
router.route('/profile').get(protect,getUser).put(protect,updateUser)
// router to get user data








//route to delete a user
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUserById)



module.exports = router;