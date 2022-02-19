const asyncHandler = require("express-async-handler");

// @desc Get all products
// @route GET /api/products
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get All Products" });
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
  res.status(200).json({ message: "Add New Product" });
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Product ${req.params.id}` });
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Product ${req.params.id}` });
});

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
