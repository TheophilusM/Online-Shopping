const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

// @desc Get all products
// @route GET /api/products
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: "Get All Products" });
  const products = await Product.find();
  res.status(200).json(products);
});

// @desc Add new product
// @route POST /api/products
// @access Private
const addProduct = asyncHandler(async (req, res) => {
  //   res.status(200).json({ message: "Add New Product" });
  if (!req.body.name) {
    // res.status(400).json({ message: "Please add a text field" });
    res.status(400);
    throw new Error(
      "Please add a text field"
    ); /* using express error handler */
  }
  const product = await Product.create({
    name: req.body.name,
  });
  res.status(200).json(product);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  //   res.status(200).json({ message: `Update Product ${req.params.id}` });
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found"); /* using express error handler */
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
  await product.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
