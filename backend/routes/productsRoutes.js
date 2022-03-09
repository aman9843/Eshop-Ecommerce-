const express = require('express');
const router = express.Router();
const {getProduct,getProductById} = require('../controller/productController')

// routes for fetching products

router.route('/').get(getProduct);



// routes for fetching products by id

router.route('/:id').get(getProductById)


module.exports = router;