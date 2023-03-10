import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const getProductDetails = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove()
      res.json({
        message: " Product Deleted"
      });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

  const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      thumbnail:'images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      description: 'Sample description'
    })

    const createProduct = await product.save()
    res.status(201).json(createProduct)
  });


  const updateProduct = asyncHandler(async (req, res) => {
    const {name,price,thumbnail,brand,category,countInStock,description} = req.body
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name
      product.price = req.body.price || product.price
      product.thumbnail = req.body.thumbnail || product.thumbnail
      product.brand = req.body.brand || product.brand
      product.category = req.body.category || product.category
      product.countInStock = req.body.countInStock || product.countInStock
      product.description = req.body.description || product.description


      const updateProduct = await product.save()
      res.status(201).json(updateProduct)
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });


  const createProductReview = asyncHandler(async (req, res) => {
    const {rating,comment} = req.body
    const product = await Product.findById(req.params.id);
    if (product) {            
      const  alreadyReviewed = product.reviews.find(r=> r.user.toString() === req.user._id.toString())

      if(alreadyReviewed){
        res.status(400)
        throw new Error("Already Reviewed")
      }

      const review = {
        name : req.user.name,
        rating: Number(rating),
        comment,
        user:req.user._id
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length
      product.rating = product.reviews.reduce((acc, item)=> item.rating + acc, 0)/product.reviews.length

      await product.save()

      res.status(201).json({message:'Review added'})

    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });

export { getProductDetails, getSingleProduct,deleteProduct,createProduct, updateProduct,createProductReview};
