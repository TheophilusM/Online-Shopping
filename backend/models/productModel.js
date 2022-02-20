const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add product name"],
    },
    description: {
      type: String,
      required: [true, "Please add product description"],
    },
    category: {
      type: String,
      required: [true, "Please add product description"],
    },
    inStock: {
      type: Boolean,
      required: [true, "Please add product description"],
    },
    price: {
      type: Number,
      required: [true, "Please add product price"],
    },
    countInStock: {
      type: Number,
      required: [true, "Please number of availablre products"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please add product name"],
    },
  },
  {
    timestamps: true /* to add createdAt and updatedAt fields automatically */,
  }
);

module.exports = mongoose.model("Product", productSchema);
