const express = require('express');
const router = express.Router();
const {getProduct,getProductById, deleteProductById,createProduct,updateProduct,createProductReview, getTopProduct} = require('../controller/productController')
const {protect,admin} = require('../middleware/authMiddleware')

// routes for fetching products

router.route('/').get(getProduct).post(protect,admin,createProduct);



// routes for fetching products by id


router.route('/top').get(getTopProduct)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProductById).put(protect,admin,updateProduct)
router.route('/:id/reviews').post(protect,createProductReview)


module.exports = router;