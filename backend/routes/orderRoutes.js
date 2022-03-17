const express = require('express');
const router = express.Router();
const {addOrderItems,getOrderById, updatedOrderToPaid, getMyOrders} = require('../controller/orderController')
const {protect} = require('../middleware/authMiddleware')


// route Post New User
router.route('/').post(protect,addOrderItems)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updatedOrderToPaid)

module.exports = router;