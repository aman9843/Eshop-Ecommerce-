const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// get Product
const getProduct = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    },
  }

  : {}

  const count = await Product.count({...keyword})
  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1));
  res.json({products,page,pageSize,pages:Math.ceil(count/pageSize)});
});

// get Product By ID

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// delete product by id via Admin

const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "product Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

// Add A new Product via Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user:req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description:"sample description"
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct)
});


// Update  A new Product via Admin

const updateProduct = asyncHandler(async(req,res) => {
    const {name,price,description,image,brand,category,countInStock} = req.body;

    const product = await Product.findById(req.params.id);


    if(product) {

        product.name = name
        product.price=price
        product.description=description
        product.image= image
        product.brand=brand
        product.category = category
        product.countInStock=countInStock
       

        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct)

    } else {
        res.status(404)
        throw new Error ("Product Didn't Updated ")
    }
})



// Review a Product

const createProductReview = asyncHandler(async(req,res) => {
  const {rating,comment} = req.body;

  const product = await Product.findById(req.params.id);


  if(product) {
   const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

   if(alreadyReviewed) {
    res.status(404)
    throw new Error ("Already Reviewed")
   }

    const review = {
      name:req.user.name,
      rating:Number(rating),
      comment,
      user:req.user._id,

    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating = product.reviews.reduce((acc,item) => item.rating +acc, 0) / product.reviews.length

    await product.save()
    res.status(201).json("Reviews Added")

  } else {


     
  }
})


// to get Top products on the basis of rating

const getTopProduct = asyncHandler(async(req,res) => {


  const product = await Product.find({}).sort({rating:-1}).limit(3)
  res.json(product)
  



 
})
   
module.exports = { getProduct, getProductById, deleteProductById, createProduct, updateProduct,createProductReview,getTopProduct};
