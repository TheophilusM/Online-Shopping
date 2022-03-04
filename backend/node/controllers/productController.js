const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// @desc Get all products
// @route GET /api/products/all
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc Get all products filtered based on category
// @route GET /api/products/category
// @access Public
const getAllProductsCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.body.category });
  res.status(200).json(products);
});

// @desc Get a product
// @route GET /api/products/:id
// @access Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({ _id: req.params.id });

  if (!product) {
    res.status(401);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

// @desc Get my products
// @route GET /api/products
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.userID.id });
  res.status(200).json(products);
});

// @desc Add new product
// @route POST /api/products
// @access Private
const addProduct = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    // res.status(400).json({ message: "Please add a text field" });
    res.status(400);
    throw new Error(
      "Please add a text field"
    ); /* using express error handler */
  }
  const product = await Product.create({
    name: req.body.name,
    user: req.userID.id,
  });
  res.status(200).json(product);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found"); /* using express error handler */
  }

  const user = await User.findById(req.userID.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found"); /* using express error handler */
  }

  // match product to user logged in
  if (product.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized to perform task");
  }

  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updated);
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  //   res.status(200).json({ message: `Delete Product ${req.params.id}` });
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found"); /* using express error handler */
  }

  const user = await User.findById(req.userID.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found"); /* using express error handler */
  }

  // match product to user logged in
  if (product.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized to perform task");
  }

  await product.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsCategory,
};
