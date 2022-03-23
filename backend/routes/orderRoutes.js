const express = require('express');
const router = express.Router();
const {addOrderItems,getOrderById, updatedOrderToPaid, getMyOrders, getAllOrders, updatedOrderToDelivered} = require('../controller/orderController')
const {protect, admin} = require('../middleware/authMiddleware')


// route Post New User
router.route('/').post(protect,addOrderItems).get(protect,admin,getAllOrders)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updatedOrderToPaid)
router.route('/:id/delivered').put(protect,admin,updatedOrderToDelivered)

module.exports = router;