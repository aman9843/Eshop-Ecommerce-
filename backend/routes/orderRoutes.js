const express = require('express');
const router = express.Router();
const {addOrderItems,getOrderById, updatedOrderToPaid} = require('../controller/orderController')
const {protect} = require('../middleware/authMiddleware')


// route Post New User
router.route('/').post(protect,addOrderItems)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updatedOrderToPaid)


module.exports = router;