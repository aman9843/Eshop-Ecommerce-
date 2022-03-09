const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler')


// get Product 
const getProduct = asyncHandler(async(req,res) => {

    const products = await Product.find({})
    res.json(products)
})


// get Product By ID

const getProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
    res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})


module.exports = {getProduct,getProductById};